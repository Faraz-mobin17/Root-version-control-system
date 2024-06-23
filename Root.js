import path from "path";
import fs from "fs/promises";
import crypto from "crypto";

class Root {
  constructor(repoPath = ".") {
    this.repoPath = path.join(repoPath, ".root");
    this.objectPath = path.join(this.repoPath, "objects"); // .root/objects
    this.refsPath = path.join(this.repoPath, "refs"); // .root/refs
    this.headPath = path.join(this.repoPath, "HEAD"); // .root/HEAD
    this.indexPath = path.join(this.repoPath, "index"); // .root/index (staging area)
    this.init();
  }

  async init() {
    await fs.promises.mkdir(this.repoPath, { recursive: true });
    await fs.promises.mkdir(this.objectPath, { recursive: true });
    await fs.promises.mkdir(this.refsPath, { recursive: true });
    try {
      await fs.promises.writeFile(this.headPath, "ref: refs/heads/main\n", {
        flag: "wx", // wx: open for writing, error if file exists
      });

      await fs.promises.writeFile(this.indexPath, JSON.stringify([]), {
        flag: "wx",
      });
    } catch (error) {
      console.log("Already initalized the .root folder", error);
    }
  }

  hashObject(content) {
    // hash the content
    // save the content in the objectPath
    // return the hash
    return crypto.createHash("sha1").update(content, "utf-8").digest("hex");
  }

  async add(fileToBeAdded) {
    const fileData = await fs.promises.readFile(fileToBeAdded, "utf-8"); // reding the file
    const fileHash = this.hashObject(fileData); // creating the hash of the file
    console.log(fileHash);
  }
}
