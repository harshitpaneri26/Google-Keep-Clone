const btn = document.querySelector("#note_btn");

// Save data to Local Storage.

const SavetoLocalStorage = () => {
    const textarea = document.querySelectorAll("#text_area");

    const data = [];

    textarea.forEach((note) => {
        return data.push(note.value);
    });

    localStorage.setItem("data", JSON.stringify(data));
};

// addnote function.
const addnote = (text = "") => {
    const note = document.createElement("div");

    // ------- Add Node -------
    note.classList.add("note");

    // ----- insert data ------
    const data = `
     <div class="operation">
        <i class="fa-solid icon-cog fa-file-pen fa-lg"></i>
        <i class="fa-solid icon-cog fa-trash fa-lg"></i>
    </div>

    <div class="main">
    <textarea class="${
      text ? "" : "hidden"
    }"  id="main_area" disabled  cols="30" rows="10"></textarea>
    </div>

    <div class="text_write">
    <textarea class="${
      text ? "hidden" : ""
    }"  id="text_area"  cols="30" rows="10"></textarea>
    </div>`;

    note.insertAdjacentHTML("afterbegin", data);

    document.body.appendChild(note);

    // take Reference's

    const editNote = note.querySelector(".fa-file-pen");
    const deleteNote = note.querySelector(".fa-trash ");
    const Main = note.querySelector("#main_area");
    const textArea = note.querySelector("#text_area");

    // delete node

    deleteNote.addEventListener("click", () => {
        const current_value = confirm("Really want to delete the note ?");

        if (current_value) {
            note.remove();
            SavetoLocalStorage();
        }
    });

    textArea.value = text;

    Main.innerHTML = text;

    // toggle using Edit button
    editNote.addEventListener("click", () => {
        textArea.classList.toggle("hidden");
        Main.classList.toggle("hidden");

        Main.value = textArea.value;
    });

    textArea.addEventListener("change", (event) => {
        const value = event.target.value;

        SavetoLocalStorage();
    });
};

// get data from Local Storage.

const dataBack = JSON.parse(localStorage.getItem("data"));

if (dataBack) {
    dataBack.forEach((note) => {
        addnote(note);
    });
}

// Add Note
btn.addEventListener("click", () => {
    addnote();
});