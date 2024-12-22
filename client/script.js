console.log("script.js är korrekt kopplat!");

async function fetchUsers() {
  try {
    const response = await fetch("http://localhost:3000/users");

    if (!response.ok) {
      throw new Error(`HTTP-fel! status: ${response.status}`);
    }

    const users = await response.json();

    console.log("Hämtade användare:", users);

    // Skapa ul-elementet
    const userList = document.createElement("ul");
    userList.classList.add("user-list"); // Lägg till en klass för styling

    // Loopa igenom users och skapa li-element
    users.forEach((user) => {
      // Skapa li-elementet
      const listItem = document.createElement("li");
      listItem.classList.add("user-item"); // Lägg till klass för styling
      listItem.style.borderColor = user.color; // Sätt färg på kanten enligt user.color

      // Inre HTML för användardata
      listItem.innerHTML = `
        <h3 style="color:${user.color}">${user.firstName} ${user.lastName}</h3>
        <p><strong>Användarnamn:</strong> ${user.username}</p>
        <p><strong>Favoritfärg:</strong> <span style="color:${user.color}">${user.color}</span></p>
      `;

      // Lägg till li-elementet i ul-elementet
      userList.appendChild(listItem);
    });

    // Lägg till ul-elementet i <main> i DOM-trädet
    const mainElement = document.querySelector("main");
    mainElement.appendChild(userList);
  } catch (error) {
    console.error("Något gick fel:", error);
    const mainElement = document.querySelector("main");
    mainElement.innerHTML += "<p>Kunde inte hämta användardata.</p>";
  }
}

// Kör funktionen för att hämta och visa användare
fetchUsers();
