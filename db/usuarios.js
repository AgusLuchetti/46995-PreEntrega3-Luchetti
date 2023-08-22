export let dBusuarios = [
    {
      id: 1,
      user: "Otto",
      pass: "OttoAdmin",
      admin: true,
    },
  ];

 
JSON.parse(localStorage.getItem("usuarios")) || localStorage.setItem("usuarios", JSON.stringify(dBusuarios));


