const desktop = document.getElementById('desktop');
const selectDirectoryButton = document.getElementById('select-directory');
const contextMenu = document.getElementById('contextMenu');
let fileIcon = "";

function fileExt(fileName) {
    return fileName.split('.').pop().toLowerCase();
}

        async function localFetch(filePath) {
            try {
                const response = await fetch(filePath, { method: 'HEAD' });
                return response.ok;
            } catch (error) {
                console.error(`Error fetching file: ${error.message}`);
                return false;
            }
        }

        async function svgExist(fileName) {
            const filePath = `https://kylekart.github.io/vdesk/icons/${fileName}.svg`;
            const exists = await localFetch(filePath);

            if (exists) {
                return filePath;
            } else {
                return 'https://kylekart.github.io/vdesk/icons/idk.svg';
            }
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
                } else {
                    fileIcon = svgExist(fileExt(entry.name));
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
document.onclick = hideMenu;
document.oncontextmenu = rightClick;

function hideMenu() {
    document.getElementById(
        "contextMenu").style.display = "none"
}

function rightClick(e) {
    e.preventDefault();

    if (document.getElementById(
        "contextMenu").style.display == "block")
        hideMenu();
    else {
        let menu = document
            .getElementById("contextMenu")

        menu.style.display = 'block';
        menu.style.left = e.pageX + "px";
        menu.style.top = e.pageY + "px";
    }
}
