import fs from 'fs';

export async function getSubdirectories(directory: string): Promise<string[]> {
    const directoryContents = await fs.promises.readdir(directory, {
        withFileTypes: true,
    });
    const subdirectories = directoryContents.filter((dirent) =>
        dirent.isDirectory(),
    );
    return subdirectories.map((dirent) => dirent.name);
}

export async function getFilesInDirectory(
    directory: string,
): Promise<string[]> {
    const subdirectoryContents = await fs.promises.readdir(directory, {
        withFileTypes: true,
    });
    const files = subdirectoryContents.filter((dirent) => dirent.isFile());
    return files.map((dirent) => dirent.name);
}
