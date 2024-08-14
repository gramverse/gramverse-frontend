export function blobToDataUrl(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => resolve(reader.result?.toString() ?? ''));
    reader.addEventListener("error", () => reject(reader.error));
    reader.addEventListener("abort", () => reject(new Error("Read aborted")));
    reader.readAsDataURL(blob);
  });
}
