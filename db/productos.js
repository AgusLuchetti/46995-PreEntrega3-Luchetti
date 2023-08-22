export const productos = [
  {
    id: 1,
    nombre: "Mate Torpedo Uruguayo Virola Aluminio De Calabaza Y Cuero",
    precio: 10750,
    imagen:"https://http2.mlstatic.com/D_NQ_NP_605033-MLA52051391605_102022-W.webp",
    categoria:"Mates"
  },
  {
    id: 2,
    nombre: "Mate De Algarrobo Copita Boca Ancha Virola De Acero Inox",
    precio: 8000,
    imagen:"https://http2.mlstatic.com/D_NQ_NP_760085-MLA70265020509_072023-W.webp",
    categoria:"Mates"
  },
  {
    id: 3,
    nombre: "Torpedo Cuero Croco De Alpaca Cincelado Calabaza",
    precio: 27500,
    imagen:"https://http2.mlstatic.com/D_NQ_NP_801663-MLA54867716870_042023-W.webp",
    categoria:"Mates"
  },
  {
    id: 4,
    nombre: "Bombilla Acero Corta",
    precio: 3500,
    imagen:"https://http2.mlstatic.com/D_NQ_NP_827570-MLA54670859976_032023-W.webp",
    categoria:"Bombillas"
  },
  {
    id: 5,
    nombre: "Bombilla Semi Recta Curva De Acero Inoxidable Tipo Pico Rey",
    precio: 3500,
    imagen:"https://http2.mlstatic.com/D_NQ_NP_975727-MLA69874924086_062023-O.webp",
    categoria:"Bombillas"
  },
  {
    id: 6,
    nombre: "Bombilla Pico De Loro Acero Inoxidable Filtro Pala Cuchara",
    precio: 4000,
    imagen:"https://http2.mlstatic.com/D_NQ_NP_961372-MLA69313615304_052023-W.webp",
    categoria:"Bombillas"
  },
  {
    id: 7,
    nombre: "Termo Black Clasico De 1l Acero Inoxidable Con Pico Cebador",
    precio: 21000,
    imagen:"https://http2.mlstatic.com/D_NQ_NP_689717-MLA53549883760_012023-O.webp",
    categoria:"Termos"
  },
  {
    id: 8,
    nombre: "Termo Stanley Original Mate System Classic 1.2 Litros",
    precio: 19000,
    imagen:"https://http2.mlstatic.com/D_NQ_NP_694191-MLA54863385579_042023-O.webp",
    categoria:"Termos"
  },
  {
    id: 9,
    nombre: "Canasta Uruguaya Matera Portatermo Cuero Premium Legítimo",
    precio: 18500,
    imagen:"https://http2.mlstatic.com/D_NQ_NP_660592-MLA52769079087_122022-W.webp",
    categoria:"Materas"
  },
  {
    id: 10,
    nombre: "Mochila Morral Matesur Cuero De Búfalo Matera",
    precio: 30500,
    imagen:"https://http2.mlstatic.com/D_NQ_NP_659388-MLA51934081061_102022-W.webp",
    categoria:"Materas"
  },
  {
    id: 11,
    nombre: "Mochila Morral Matesur Cuero De Búfalo Matera",
    precio: 30500,
    imagen:"https://http2.mlstatic.com/D_NQ_NP_659388-MLA51934081061_102022-W.webp",
    categoria:"Materas"
  },
  {
    id: 12,
    nombre: "Mochila Morral Matesur Cuero De Búfalo Matera",
    precio: 30500,
    imagen:"https://http2.mlstatic.com/D_NQ_NP_659388-MLA51934081061_102022-W.webp",
    categoria:"Materas"
  },
  {
    id: 13,
    nombre: "Mochila Morral Matesur Cuero De Búfalo Matera",
    precio: 30500,
    imagen:"https://http2.mlstatic.com/D_NQ_NP_659388-MLA51934081061_102022-W.webp",
    categoria:"Materas"
  }
];
  
JSON.parse(localStorage.getItem("productos")) || localStorage.setItem("productos", JSON.stringify(productos));

