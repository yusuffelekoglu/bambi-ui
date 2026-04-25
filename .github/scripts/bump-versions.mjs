#!/usr/bin/env node

import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import readline from "node:readline/promises";
import { exit, stdin as input, stdout as output } from "node:process";

const SEMVER_FULL_REGEX =
  /^\d+\.\d+\.\d+(?:-[0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*)?(?:\+[0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*)?$/;

async function getPackageManifests() {
  const packagesRoot = path.resolve("packages");
  const entries = await readdir(packagesRoot, { withFileTypes: true });

  const packageManifests = entries
    .filter((entry) => entry.isDirectory())
    .map((entry) => path.join(packagesRoot, entry.name, "package.json"));

  // Docs app version is also kept in sync with package versions.
  packageManifests.push(path.resolve("apps/docs/package.json"));

  return packageManifests;
}

async function main() {
  if (!input.isTTY || !output.isTTY) {
    console.error("[bump-versions] Interaktif terminal bulunamadi.");
    exit(1);
  }

  const rl = readline.createInterface({ input, output });
  let targetVersion = "";

  try {
    while (true) {
      targetVersion = (await rl.question("Yeni versiyon (orn: 0.1.0): ")).trim();

      if (SEMVER_FULL_REGEX.test(targetVersion)) {
        break;
      }

      console.error("[bump-versions] Gecersiz semver. Ornek: 1.2.3 veya 1.2.3-beta.1");
    }
  } finally {
    rl.close();
  }

  const manifests = await getPackageManifests();
  let changedCount = 0;

  for (const manifestPath of manifests) {
    const raw = await readFile(manifestPath, "utf8");
    const json = JSON.parse(raw);

    if (typeof json.version !== "string") {
      console.error(`[bump-versions] version alani yok veya gecersiz: ${manifestPath}`);
      exit(1);
    }

    if (json.version === targetVersion) {
      continue;
    }

    json.version = targetVersion;
    await writeFile(manifestPath, `${JSON.stringify(json, null, 2)}\n`, "utf8");

    changedCount += 1;
    console.log(`[bump-versions] ${manifestPath}: ${targetVersion}`);
  }

  if (changedCount === 0) {
    console.log("[bump-versions] Tum paketler zaten bu versiyonda.");
    return;
  }

  console.log(`[bump-versions] Toplam ${changedCount} proje guncellendi.`);
}

main().catch((error) => {
  console.error(`[bump-versions] Beklenmeyen hata: ${error instanceof Error ? error.message : String(error)}`);
  exit(1);
});
