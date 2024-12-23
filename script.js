const desktop = document.getElementById('desktop');
const selectDirectoryButton = document.getElementById('select-directory');
const contextMenu = document.getElementById('contextMenu');
let fileIcon = "";

function fileExt(fileName) {
    return fileName.split('.').pop().toLowerCase();
}

selectDirectoryButton.addEventListener('click', async () => {
    try {
        const directoryHandle = await window.showDirectoryPicker();
        desktop.innerHTML = '';
        for await (const entry of directoryHandle.values()) {
            if (entry.kind === 'file') {
                const file = await entry.getFile();
                const blobURL = URL.createObjectURL(file);

                if (fileExt(entry.name) === "png" || fileExt(entry.name) === "gif" || fileExt(entry.name) === "jpg") {
                fileIcon = blobURL;
                }
                else if (fileExt(entry.name) === "zip") {
                    fileIcon = "./icons/" + fileExt(entry.name) + ".svg";
                }
                else if (fileExt(entry.name) === "txt") {
                    fileIcon = "./icons/" + fileExt(entry.name) + ".svg";
                }
                else if (fileExt(entry.name) === "apk") {
                    fileIcon = "./icons/" + fileExt(entry.name) + ".svg";
                }
                else if (fileExt(entry.name) === "js") {
                    fileIcon = "./icons/" + fileExt(entry.name) + ".svg";
                }
                else if (fileExt(entry.name) === "pdf") {
                    fileIcon = "./icons/" + fileExt(entry.name) + ".svg";
                }
                else if (fileExt(entry.name) === "mp3") {
                    fileIcon = "./icons/" + fileExt(entry.name) + ".svg";
                }
                else if (fileExt(entry.name) === "mp4") {
                    fileIcon = "./icons/" + fileExt(entry.name) + ".svg";
                }
                else if (fileExt(entry.name) === "csv") {
                    fileIcon = "./icons/" + fileExt(entry.name) + ".svg";
                } else {
                    fileIcon = "./icons/idk.svg";
                }
                const icon = document.createElement('div');
                icon.className = 'icon';
                icon.innerHTML = `
                    <img src="${fileIcon}" alt="file">
                    <span>${entry.name}</span>
                `;
                icon.addEventListener('dblclick', () => {
                    window.open(blobURL, '_blank');
                });
                desktop.appendChild(icon);
            } else if (entry.kind === 'directory') {
                const icon = document.createElement('div');
                icon.className = 'icon';
                icon.innerHTML = `
                    <img src="icons/dir.svg" alt="folder">
                    <span>${entry.name}</span>
                `;
                icon.addEventListener('dblclick', async () => {
                    alert('Folder navigation not implemented yet!');
                });
                desktop.appendChild(icon);
            }
        }
    } catch (error) {
        console.error('Error selecting directory:', error);
    }
});