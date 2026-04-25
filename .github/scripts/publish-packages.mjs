import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";

const mode = process.argv[2];

if (mode !== "build" && mode !== "publish") {
  throw new Error(
    "Usage: node .github/scripts/publish-packages.mjs <build|publish>",
  );
}

function getPackageDirectories() {
  const packagesRoot = path.join(process.cwd(), "packages");

  return fs
    .readdirSync(packagesRoot, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => path.join("packages", entry.name))
    .filter((directory) => fs.existsSync(path.join(directory, "package.json")));
}

function sortPackages() {
  const packageDirectories = getPackageDirectories();
  const packages = new Map();
  const directoryByName = new Map();

  for (const directory of packageDirectories) {
    const packageJson = JSON.parse(
      fs.readFileSync(path.join(directory, "package.json"), "utf8"),
    );

    if (packageJson.private) {
      continue;
    }

    packages.set(directory, packageJson);
    directoryByName.set(packageJson.name, directory);
  }

  const dependentsByDirectory = new Map();
  const inDegreeByDirectory = new Map();

  for (const [directory, packageJson] of packages.entries()) {
    const internalDependencyNames = Object.keys({
      ...(packageJson.dependencies ?? {}),
      ...(packageJson.peerDependencies ?? {}),
    }).filter((dependencyName) => directoryByName.has(dependencyName));

    inDegreeByDirectory.set(directory, internalDependencyNames.length);

    for (const dependencyName of internalDependencyNames) {
      const dependencyDirectory = directoryByName.get(dependencyName);

      if (!dependencyDirectory) {
        continue;
      }

      if (!dependentsByDirectory.has(dependencyDirectory)) {
        dependentsByDirectory.set(dependencyDirectory, []);
      }

      dependentsByDirectory.get(dependencyDirectory).push(directory);
    }
  }

  const ready = [...inDegreeByDirectory.entries()]
    .filter(([, degree]) => degree === 0)
    .map(([directory]) => directory)
    .sort();

  const ordered = [];

  while (ready.length > 0) {
    const directory = ready.shift();

    if (!directory) {
      continue;
    }

    ordered.push(directory);

    for (const dependentDirectory of dependentsByDirectory.get(directory) ??
      []) {
      const nextDegree = (inDegreeByDirectory.get(dependentDirectory) ?? 0) - 1;
      inDegreeByDirectory.set(dependentDirectory, nextDegree);

      if (nextDegree === 0) {
        ready.push(dependentDirectory);
        ready.sort();
      }
    }
  }

  if (ordered.length !== packages.size) {
    throw new Error("Unable to determine a package order without cycles.");
  }

  return ordered;
}

function run(command, options = {}) {
  execSync(command, {
    stdio: "inherit",
    env: process.env,
    ...options,
  });
}

function escapeArg(value) {
  return JSON.stringify(String(value));
}

const orderedPackages = sortPackages();

for (const packageDirectory of orderedPackages) {
  const packageJson = JSON.parse(
    fs.readFileSync(path.join(packageDirectory, "package.json"), "utf8"),
  );

  if (mode === "build") {
    console.log(`Building ${packageJson.name}@${packageJson.version}`);
    run("pnpm build", { cwd: packageDirectory });
    continue;
  }

  console.log(`Publishing ${packageJson.name}@${packageJson.version}`);

  try {
    run(
      `npm view ${JSON.stringify(`${packageJson.name}@${packageJson.version}`)} version`,
      {
        stdio: "ignore",
      },
    );
    console.log(
      `Skipping ${packageJson.name}@${packageJson.version}; it is already published.`,
    );
    continue;
  } catch {
    // Package is not published yet.
  }

  const otp = process.env.NPM_OTP;
  const otpArg = otp ? ` --otp ${escapeArg(otp)}` : "";

  try {
    run(`pnpm publish --access public --no-git-checks --tag latest${otpArg}`, {
      cwd: packageDirectory,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);

    if (message.includes("EOTP")) {
      throw new Error(
        [
          "npm publish failed with EOTP.",
          "Use an npm Automation token in NPM_TOKEN for CI publishing (recommended).",
          "Alternatively, provide a short-lived code via NPM_OTP and rerun.",
        ].join(" "),
      );
    }

    throw error;
  }
}
