#!/usr/bin/env node

import { readdir, readFile, writeFile } from "node:fs/promises";
import { createReadStream, createWriteStream, existsSync } from "node:fs";
import path from "node:path";
import readline from "node:readline/promises";
import { stdin as processInput, stdout as processOutput, exit, env } from "node:process";
import { spawnSync } from "node:child_process";

const SEMVER_REGEX =
  /^\d+\.\d+\.\d+(?:-[0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*)?(?:\+[0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*)?$/;

async function getPackageManifestPaths(packagesDir) {
  const entries = await readdir(packagesDir, { withFileTypes: true });
  return entries
    .filter((entry) => entry.isDirectory())
    .map((entry) => path.join(packagesDir, entry.name, "package.json"));
}

async function readManifest(filePath) {
  const content = await readFile(filePath, "utf8");
  const json = JSON.parse(content);
  return { content, json };
}

async function main() {
  if (env.CI === "true") {
    exit(0);
  }

  let input = processInput;
  let output = processOutput;
  let ttyInputStream;
  let ttyOutputStream;

  if (!processInput.isTTY) {
    if (existsSync("/dev/tty")) {
      ttyInputStream = createReadStream("/dev/tty");
      ttyOutputStream = createWriteStream("/dev/tty");
      input = ttyInputStream;
      output = ttyOutputStream;
    } else {
      processOutput.write("[pre-push] Interaktif terminal bulunamadi.\n");
      processOutput.write("[pre-push] Bump sorusu gosterilemedigi icin push durduruldu.\n");
      processOutput.write("[pre-push] Lutfen terminalden tekrar `git push` calistir.\n");
      exit(1);
    }
  }

  const packagesDir = path.resolve("packages");
  let packagePaths;

  try {
    packagePaths = await getPackageManifestPaths(packagesDir);
  } catch {
    output.write("[pre-push] packages/ klasoru bulunamadi, bump adimi atlandi.\n");
    exit(0);
  }

  const manifests = [];
  for (const manifestPath of packagePaths) {
    try {
      const manifest = await readManifest(manifestPath);
      manifests.push({ path: manifestPath, ...manifest });
    } catch {
      output.write(`[pre-push] ${manifestPath} okunamadi, bu dosya atlandi.\n`);
    }
  }

  if (manifests.length === 0) {
    exit(0);
  }

  const rl = readline.createInterface({ input, output });

  try {
    const answer = await rl.question(
      "Push oncesi paket versiyonlarini bump etmek ister misin? (y/N): ",
    );

    if (!/^y(es)?$/i.test(answer.trim())) {
      exit(0);
    }

    let nextVersion = "";
    while (true) {
      nextVersion = (await rl.question("Yeni versiyon (orn: 0.0.8): ")).trim();
      if (SEMVER_REGEX.test(nextVersion)) {
        break;
      }
      output.write("Gecersiz semver formati. Ornek: 1.2.3 veya 1.2.3-beta.1\n");
    }

    const changedFiles = [];

    for (const manifest of manifests) {
      if (manifest.json.version === nextVersion) {
        continue;
      }

      manifest.json.version = nextVersion;
      await writeFile(manifest.path, `${JSON.stringify(manifest.json, null, 2)}\n`, "utf8");
      changedFiles.push(manifest.path);
    }

    if (changedFiles.length === 0) {
      output.write("Tum paketler zaten bu versiyonda. Push devam ediyor.\n");
      exit(0);
    }

    const gitAdd = spawnSync("git", ["add", ...changedFiles], { stdio: "ignore" });

    if (gitAdd.status !== 0) {
      output.write("Paket versiyonlari guncellendi fakat git add basarisiz oldu.\n");
      output.write("Degisiklikleri commit edip tekrar push et.\n");
      exit(1);
    }

    output.write(`\n${changedFiles.length} paketin versiyonu ${nextVersion} olarak guncellendi.\n`);
    output.write("Degisiklikler stage edildi. Lutfen commit atip tekrar push et.\n");
    exit(1);
  } finally {
    rl.close();
    ttyInputStream?.destroy();
    ttyOutputStream?.end();
  }
}

main().catch((error) => {
  output.write(`[pre-push] Beklenmeyen hata: ${error instanceof Error ? error.message : String(error)}\n`);
  exit(1);
});
