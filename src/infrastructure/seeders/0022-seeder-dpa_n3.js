'use strict';

const {
  setTimestampsSeeder
} = require('../lib/util');

// Datos de producción
let items = [
  {
    id         : '7a0256dc-6da3-4f1f-a9ed-ea722283cd42',
    codigo_ine : null,
    nivel      : 3,
    nombre     : 'MAMORÉ',
    latitud    : null,
    longitud   : null,
    id_padre   : 'a1632771-1294-4931-97df-19136e495d34'
  },
  {
    id         : 'fcdc2264-0050-445d-b88c-361b3e472dd4',
    codigo_ine : null,
    nivel      : 3,
    nombre     : 'BELISARIO BOETO',
    latitud    : null,
    longitud   : null,
    id_padre   : '75988c46-f652-4a80-8583-05431ac1105a'
  },
  {
    id         : '186cc123-c391-4bf2-ba2a-556f290f4cc5',
    codigo_ine : null,
    nivel      : 3,
    nombre     : 'ARCE',
    latitud    : null,
    longitud   : null,
    id_padre   : '9213e0fa-1f15-4c84-880f-923e8aa9341d'
  },
  {
    id         : '200f23dd-80ed-45bb-9bfe-c012cb6a92b1',
    codigo_ine : null,
    nivel      : 3,
    nombre     : 'CERCADO',
    latitud    : null,
    longitud   : null,
    id_padre   : '305be394-cdb4-4c15-ae52-eeb0d88c4854'
  },
  {
    id         : '468793ce-d29c-40a4-a2e6-c9ad8eb03354',
    codigo_ine : null,
    nivel      : 3,
    nombre     : 'ABAROA',
    latitud    : null,
    longitud   : null,
    id_padre   : '305be394-cdb4-4c15-ae52-eeb0d88c4854'
  },
  {
    id         : '40c3e498-f925-4b60-926c-cd93552b5152',
    codigo_ine : null,
    nivel      : 3,
    nombre     : 'MÉNDEZ',
    latitud    : null,
    longitud   : null,
    id_padre   : '9213e0fa-1f15-4c84-880f-923e8aa9341d'
  },
  {
    id         : 'be6e861e-8b1b-4ce3-909b-620e3b460fbc',
    codigo_ine : null,
    nivel      : 3,
    nombre     : 'BAUTISTA SAAVEDRA',
    latitud    : null,
    longitud   : null,
    id_padre   : '2a8dbc1b-05b6-4482-8a8f-8064c5e80c01'
  },
  {
    id         : '34f65b7c-82fb-457f-8aab-0dddc3784cde',
    codigo_ine : null,
    nivel      : 3,
    nombre     : 'MODESTO OMISTE',
    latitud    : null,
    longitud   : null,
    id_padre   : 'd6bed80d-df3e-4b54-bede-fe9125149314'
  },
  {
    id         : '7a545f11-1b5f-4be8-8f06-f8c291035f14',
    codigo_ine : null,
    nivel      : 3,
    nombre     : 'TOMINA',
    latitud    : null,
    longitud   : null,
    id_padre   : '75988c46-f652-4a80-8583-05431ac1105a'
  },
  {
    id         : '8e7045b6-14e1-4656-b68e-e6cec791f51f',
    codigo_ine : null,
    nivel      : 3,
    nombre     : 'GENERAL JOSE MANUEL',
    latitud    : null,
    longitud   : null,
    id_padre   : '2a8dbc1b-05b6-4482-8a8f-8064c5e80c01'
  },
  {
    id         : '61b9ab34-98fc-40c8-92bc-9a0d9a5c83a4',
    codigo_ine : null,
    nivel      : 3,
    nombre     : 'JOSÉ MARÍA LINARES',
    latitud    : null,
    longitud   : null,
    id_padre   : 'd6bed80d-df3e-4b54-bede-fe9125149314'
  },
  {
    id         : 'bae72dc1-cf25-4e76-967e-62c00035c371',
    codigo_ine : null,
    nivel      : 3,
    nombre     : 'ÑUFLO DE CHÁVEZ',
    latitud    : null,
    longitud   : null,
    id_padre   : 'd0f1a9df-8dff-4225-93c3-90aaf345d42d'
  },
  {
    id         : '2c9229d7-2e31-4c3a-afc3-1a4f42acf652',
    codigo_ine : null,
    nivel      : 3,
    nombre     : 'NOR CARANGAS',
    latitud    : null,
    longitud   : null,
    id_padre   : '305be394-cdb4-4c15-ae52-eeb0d88c4854'
  },
  {
    id         : '5160c18e-4ee3-4f78-bcc4-c0d46028e752',
    codigo_ine : null,
    nivel      : 3,
    nombre     : 'OMASUYOS',
    latitud    : null,
    longitud   : null,
    id_padre   : '2a8dbc1b-05b6-4482-8a8f-8064c5e80c01'
  },
  {
    id         : 'd5c371f8-55b1-41b6-ab22-146d1dfeedd3',
    codigo_ine : null,
    nivel      : 3,
    nombre     : 'CARANGAS',
    latitud    : null,
    longitud   : null,
    id_padre   : '305be394-cdb4-4c15-ae52-eeb0d88c4854'
  },
  {
    id         : '384ae3c6-1639-4875-a01c-4dc331a50c45',
    codigo_ine : null,
    nivel      : 3,
    nombre     : 'YACUMA',
    latitud    : null,
    longitud   : null,
    id_padre   : 'a1632771-1294-4931-97df-19136e495d34'
  },
  {
    id         : '770591ac-e92a-43d1-bebe-64ca72be1c2b',
    codigo_ine : null,
    nivel      : 3,
    nombre     : 'MADRE DE DIOS',
    latitud    : null,
    longitud   : null,
    id_padre   : '069e1acc-fbd3-4f60-9ec7-2ad58b308126'
  },
  {
    id         : '98c13072-92dc-4783-a93c-3852c5cb0603',
    codigo_ine : null,
    nivel      : 3,
    nombre     : 'MIZQUE',
    latitud    : null,
    longitud   : null,
    id_padre   : 'de60d23c-3609-44ee-9ac0-9e2c75601704'
  },
  {
    id         : '01d1955a-5655-45ce-90ee-9febbb08e676',
    codigo_ine : null,
    nivel      : 3,
    nombre     : 'GUARAYOS',
    latitud    : null,
    longitud   : null,
    id_padre   : 'd0f1a9df-8dff-4225-93c3-90aaf345d42d'
  },
  {
    id         : 'bb68aa6d-2fb1-409e-8e21-3b0333b208ec',
    codigo_ine : null,
    nivel      : 3,
    nombre     : 'PUNATA',
    latitud    : null,
    longitud   : null,
    id_padre   : 'de60d23c-3609-44ee-9ac0-9e2c75601704'
  },
  {
    id         : 'e01df55d-68f8-4ccd-a657-28d965e98d64',
    codigo_ine : null,
    nivel      : 3,
    nombre     : 'OBISPO SANTISTEBAN',
    latitud    : null,
    longitud   : null,
    id_padre   : 'd0f1a9df-8dff-4225-93c3-90aaf345d42d'
  },
  {
    id         : '0e43e4c3-427a-4a76-a27e-fcd19298f4ed',
    codigo_ine : null,
    nivel      : 3,
    nombre     : 'INQUISIVI',
    latitud    : null,
    longitud   : null,
    id_padre   : '2a8dbc1b-05b6-4482-8a8f-8064c5e80c01'
  },
  {
    id         : 'f162ef8d-a00e-4195-9fb9-0baaedc694c4',
    codigo_ine : null,
    nivel      : 3,
    nombre     : 'LITORAL',
    latitud    : null,
    longitud   : null,
    id_padre   : '305be394-cdb4-4c15-ae52-eeb0d88c4854'
  },
  {
    id         : '25dfa27c-f0a6-4760-95f3-baf03bc4c4e7',
    codigo_ine : null,
    nivel      : 3,
    nombre     : 'TAPACARÍ',
    latitud    : null,
    longitud   : null,
    id_padre   : 'de60d23c-3609-44ee-9ac0-9e2c75601704'
  },
  {
    id         : '508afcac-3641-48e9-b6ea-bb88aea70560',
    codigo_ine : null,
    nivel      : 3,
    nombre     : 'SAN PEDRO DE TOTORA',
    latitud    : null,
    longitud   : null,
    id_padre   : '305be394-cdb4-4c15-ae52-eeb0d88c4854'
  },
  {
    id         : '3d0f8d94-b973-41ee-96dd-4bf9e3194c7d',
    codigo_ine : null,
    nivel      : 3,
    nombre     : 'VALLE GRANDE',
    latitud    : null,
    longitud   : null,
    id_padre   : 'd0f1a9df-8dff-4225-93c3-90aaf345d42d'
  },
  {
    id         : '62ab5b09-4fa7-4c6f-98d4-0b819e020f33',
    codigo_ine : null,
    nivel      : 3,
    nombre     : 'LOAYZA',
    latitud    : null,
    longitud   : null,
    id_padre   : '2a8dbc1b-05b6-4482-8a8f-8064c5e80c01'
  },
  {
    id         : 'ff8c1ae9-cbe8-4dc7-9547-21403f71635a',
    codigo_ine : null,
    nivel      : 3,
    nombre     : 'VACA DIÉZ',
    latitud    : null,
    longitud   : null,
    id_padre   : 'a1632771-1294-4931-97df-19136e495d34'
  },
  {
    id         : 'cfa16355-ac13-494e-8674-1e5b5fd0fdd4',
    codigo_ine : null,
    nivel      : 3,
    nombre     : 'PACAJES',
    latitud    : null,
    longitud   : null,
    id_padre   : '2a8dbc1b-05b6-4482-8a8f-8064c5e80c01'
  },
  {
    id         : '8e1a3b07-1061-45c4-a35b-808ecb3e2c56',
    codigo_ine : null,
    nivel      : 3,
    nombre     : 'BOLÍVAR',
    latitud    : null,
    longitud   : null,
    id_padre   : 'de60d23c-3609-44ee-9ac0-9e2c75601704'
  },
  {
    id         : '2205f39b-c5e5-436f-8ec1-fbb73743e642',
    codigo_ine : null,
    nivel      : 3,
    nombre     : 'AVILÉS',
    latitud    : null,
    longitud   : null,
    id_padre   : '9213e0fa-1f15-4c84-880f-923e8aa9341d'
  },
  {
    id         : 'eea53bd7-a9cc-4066-871a-b6aad7dc7570',
    codigo_ine : null,
    nivel      : 3,
    nombre     : 'LOS ANDES',
    latitud    : null,
    longitud   : null,
    id_padre   : '2a8dbc1b-05b6-4482-8a8f-8064c5e80c01'
  },
  {
    id         : 'd5f02f66-868f-4191-b9bc-5106c18df58d',
    codigo_ine : null,
    nivel      : 3,
    nombre     : 'SUR CARANGAS',
    latitud    : null,
    longitud   : null,
    id_padre   : '305be394-cdb4-4c15-ae52-eeb0d88c4854'
  },
  {
    id         : '11abc41d-0fce-40ee-9567-8825b26e32d9',
    codigo_ine : null,
    nivel      : 3,
    nombre     : 'OROPEZA',
    latitud    : null,
    longitud   : null,
    id_padre   : '75988c46-f652-4a80-8583-05431ac1105a'
  },
  {
    id         : '60609363-c275-4554-addb-6c142d786a14',
    codigo_ine : null,
    nivel      : 3,
    nombre     : 'NOR YUNGAS',
    latitud    : null,
    longitud   : null,
    id_padre   : '2a8dbc1b-05b6-4482-8a8f-8064c5e80c01'
  },
  {
    id         : '24a49e8b-25ca-4dee-b63f-3578079bc874',
    codigo_ine : null,
    nivel      : 3,
    nombre     : 'ABUNÁ',
    latitud    : null,
    longitud   : null,
    id_padre   : '069e1acc-fbd3-4f60-9ec7-2ad58b308126'
  },
  {
    id         : 'da0fbd4a-3f2d-43f1-800f-8520b4f319f8',
    codigo_ine : null,
    nivel      : 3,
    nombre     : 'WARNES',
    latitud    : null,
    longitud   : null,
    id_padre   : 'd0f1a9df-8dff-4225-93c3-90aaf345d42d'
  },
  {
    id         : '25ddecc0-b45d-4185-86e8-88ef17441961',
    codigo_ine : null,
    nivel      : 3,
    nombre     : 'CARANAVI',
    latitud    : null,
    longitud   : null,
    id_padre   : '2a8dbc1b-05b6-4482-8a8f-8064c5e80c01'
  },
  {
    id         : 'f56e0f84-7b0f-4875-a12b-860741b17c37',
    codigo_ine : null,
    nivel      : 3,
    nombre     : 'PANTALEÓN DALENCE',
    latitud    : null,
    longitud   : null,
    id_padre   : '305be394-cdb4-4c15-ae52-eeb0d88c4854'
  },
  {
    id         : 'e78ffcb9-fd74-404a-ac88-877e4692be01',
    codigo_ine : null,
    nivel      : 3,
    nombre     : 'FRANZ TAMAYO',
    latitud    : null,
    longitud   : null,
    id_padre   : '2a8dbc1b-05b6-4482-8a8f-8064c5e80c01'
  },
  {
    id         : '6c06721c-ca0c-492c-9ca7-dcb0145f897d',
    codigo_ine : null,
    nivel      : 3,
    nombre     : 'CORDILLERA',
    latitud    : null,
    longitud   : null,
    id_padre   : 'd0f1a9df-8dff-4225-93c3-90aaf345d42d'
  },
  {
    id         : 'e0a3dbd0-cfad-435f-9231-7f71c9cc2550',
    codigo_ine : null,
    nivel      : 3,
    nombre     : 'NOR LÍPEZ',
    latitud    : null,
    longitud   : null,
    id_padre   : 'd6bed80d-df3e-4b54-bede-fe9125149314'
  },
  {
    id         : '21a31a4c-e768-4db3-b122-695c68cc42ad',
    codigo_ine : null,
    nivel      : 3,
    nombre     : 'TIRAQUE',
    latitud    : null,
    longitud   : null,
    id_padre   : 'de60d23c-3609-44ee-9ac0-9e2c75601704'
  },
  {
    id         : '7e0b1961-97f3-4e1c-ad0d-fc8e784c7e15',
    codigo_ine : null,
    nivel      : 3,
    nombre     : 'ABEL ITURRALDE',
    latitud    : null,
    longitud   : null,
    id_padre   : '2a8dbc1b-05b6-4482-8a8f-8064c5e80c01'
  },
  {
    id         : 'd31db96c-2275-4cbc-8ec0-7334a9b99783',
    codigo_ine : null,
    nivel      : 3,
    nombre     : 'FEDERICO ROMÁN',
    latitud    : null,
    longitud   : null,
    id_padre   : '069e1acc-fbd3-4f60-9ec7-2ad58b308126'
  },
  {
    id         : '86bcb3b7-d9e4-4fdf-8044-bb502a241346',
    codigo_ine : null,
    nivel      : 3,
    nombre     : 'ZUDÁÑEZ',
    latitud    : null,
    longitud   : null,
    id_padre   : '75988c46-f652-4a80-8583-05431ac1105a'
  },
  {
    id         : '03820917-e853-43af-b7c3-5b660e9f0c2a',
    codigo_ine : null,
    nivel      : 3,
    nombre     : 'SABAYA',
    latitud    : null,
    longitud   : null,
    id_padre   : '305be394-cdb4-4c15-ae52-eeb0d88c4854'
  },
  {
    id         : 'd3295d7c-e3ad-4c39-823d-4f4887c54849',
    codigo_ine : null,
    nivel      : 3,
    nombre     : 'ÁNGEL SANDOVAL',
    latitud    : null,
    longitud   : null,
    id_padre   : 'd0f1a9df-8dff-4225-93c3-90aaf345d42d'
  },
  {
    id         : 'dd21b715-d93e-4ac2-9b64-c28358c11ecd',
    codigo_ine : null,
    nivel      : 3,
    nombre     : 'CHARCAS',
    latitud    : null,
    longitud   : null,
    id_padre   : 'd6bed80d-df3e-4b54-bede-fe9125149314'
  },
  {
    id         : '3077a855-3dc0-444e-ba26-d1742ba1f18e',
    codigo_ine : null,
    nivel      : 3,
    nombre     : 'VELASCO',
    latitud    : null,
    longitud   : null,
    id_padre   : 'd0f1a9df-8dff-4225-93c3-90aaf345d42d'
  },
  {
    id         : 'd9e2ef30-315f-41ed-9f24-3d71e75ecdf9',
    codigo_ine : null,
    nivel      : 3,
    nombre     : 'AROMA',
    latitud    : null,
    longitud   : null,
    id_padre   : '2a8dbc1b-05b6-4482-8a8f-8064c5e80c01'
  },
  {
    id         : 'dce343e6-cb3e-477f-aab7-5cbec7e7eea7',
    codigo_ine : null,
    nivel      : 3,
    nombre     : 'ITÉNEZ',
    latitud    : null,
    longitud   : null,
    id_padre   : 'a1632771-1294-4931-97df-19136e495d34'
  },
  {
    id         : '3f46a3a3-fcd7-42b3-86e5-3fe25db2125e',
    codigo_ine : null,
    nivel      : 3,
    nombre     : 'LARECAJA',
    latitud    : null,
    longitud   : null,
    id_padre   : '2a8dbc1b-05b6-4482-8a8f-8064c5e80c01'
  },
  {
    id         : '4bbd38e3-3b58-4f93-a40f-2d63ff98c711',
    codigo_ine : null,
    nivel      : 3,
    nombre     : 'CHAYANTA',
    latitud    : null,
    longitud   : null,
    id_padre   : 'd6bed80d-df3e-4b54-bede-fe9125149314'
  },
  {
    id         : '92d4202a-7de1-4fc1-ac30-a455622cd6ee',
    codigo_ine : null,
    nivel      : 3,
    nombre     : 'CHIQUITOS',
    latitud    : null,
    longitud   : null,
    id_padre   : 'd0f1a9df-8dff-4225-93c3-90aaf345d42d'
  },
  {
    id         : '81eaf74c-cfc5-4c40-9044-683f6437b7e4',
    codigo_ine : null,
    nivel      : 3,
    nombre     : 'POOPÓ',
    latitud    : null,
    longitud   : null,
    id_padre   : '305be394-cdb4-4c15-ae52-eeb0d88c4854'
  },
  {
    id         : 'cb15d46e-131a-4b83-9a38-9da6973aac5c',
    codigo_ine : null,
    nivel      : 3,
    nombre     : 'CAMPERO',
    latitud    : null,
    longitud   : null,
    id_padre   : 'de60d23c-3609-44ee-9ac0-9e2c75601704'
  },
  {
    id         : '397f2876-778c-49e3-aed3-ad2157cdff69',
    codigo_ine : null,
    nivel      : 3,
    nombre     : 'NICOLÁS SUÁREZ',
    latitud    : null,
    longitud   : null,
    id_padre   : '069e1acc-fbd3-4f60-9ec7-2ad58b308126'
  },
  {
    id         : '08859570-28c8-49d8-be8a-35f8002db052',
    codigo_ine : null,
    nivel      : 3,
    nombre     : 'MUÑECAS',
    latitud    : null,
    longitud   : null,
    id_padre   : '2a8dbc1b-05b6-4482-8a8f-8064c5e80c01'
  },
  {
    id         : '3c9418b4-ea01-412d-a88c-f26bd97289ae',
    codigo_ine : null,
    nivel      : 3,
    nombre     : 'SAUCARÍ',
    latitud    : null,
    longitud   : null,
    id_padre   : '305be394-cdb4-4c15-ae52-eeb0d88c4854'
  },
  {
    id         : 'c4dd8feb-72d9-4c5b-a8cc-f3f5f3473367',
    codigo_ine : null,
    nivel      : 3,
    nombre     : 'MANURIPI',
    latitud    : null,
    longitud   : null,
    id_padre   : '069e1acc-fbd3-4f60-9ec7-2ad58b308126'
  },
  {
    id         : '309009be-c25d-40ac-9f19-c5aff493d168',
    codigo_ine : null,
    nivel      : 3,
    nombre     : 'TOMAS BARRÓN',
    latitud    : null,
    longitud   : null,
    id_padre   : '305be394-cdb4-4c15-ae52-eeb0d88c4854'
  },
  {
    id         : '68251915-bff5-44fa-94e2-111fc1fc6488',
    codigo_ine : null,
    nivel      : 3,
    nombre     : 'CORNELIO SAAVEDRA',
    latitud    : null,
    longitud   : null,
    id_padre   : 'd6bed80d-df3e-4b54-bede-fe9125149314'
  },
  {
    id         : '68a20b35-6651-4745-bc09-4c265cc36aed',
    codigo_ine : null,
    nivel      : 3,
    nombre     : 'CHAPARE',
    latitud    : null,
    longitud   : null,
    id_padre   : 'de60d23c-3609-44ee-9ac0-9e2c75601704'
  },
  {
    id         : 'd242be5d-9784-4ea2-b4e2-1aaa4176c93c',
    codigo_ine : null,
    nivel      : 3,
    nombre     : 'CERCADO',
    latitud    : null,
    longitud   : null,
    id_padre   : 'de60d23c-3609-44ee-9ac0-9e2c75601704'
  },
  {
    id         : '0b245716-8c87-4509-8658-193d9a46434f',
    codigo_ine : null,
    nivel      : 3,
    nombre     : 'DANIEL CAMPOS',
    latitud    : null,
    longitud   : null,
    id_padre   : 'd6bed80d-df3e-4b54-bede-fe9125149314'
  },
  {
    id         : '1d262d8e-07b5-4f80-9315-e83d889ad579',
    codigo_ine : null,
    nivel      : 3,
    nombre     : 'SEBASTIAN PAGADOR',
    latitud    : null,
    longitud   : null,
    id_padre   : '305be394-cdb4-4c15-ae52-eeb0d88c4854'
  },
  {
    id         : 'af0f3ac5-6bf3-419b-8c54-7295be216475',
    codigo_ine : null,
    nivel      : 3,
    nombre     : 'MEJILLONES',
    latitud    : null,
    longitud   : null,
    id_padre   : '305be394-cdb4-4c15-ae52-eeb0d88c4854'
  },
  {
    id         : '99853176-d1d7-4ef2-b538-4b0c829f543b',
    codigo_ine : null,
    nivel      : 3,
    nombre     : 'MARBÁN',
    latitud    : null,
    longitud   : null,
    id_padre   : 'a1632771-1294-4931-97df-19136e495d34'
  },
  {
    id         : 'a4612ae5-5e1b-4db5-9597-2bf82cec0bea',
    codigo_ine : null,
    nivel      : 3,
    nombre     : 'FLORIDA',
    latitud    : null,
    longitud   : null,
    id_padre   : 'd0f1a9df-8dff-4225-93c3-90aaf345d42d'
  },
  {
    id         : 'b6a6c466-54b8-46c8-8990-75eab76ab1c8',
    codigo_ine : null,
    nivel      : 3,
    nombre     : 'CAMACHO',
    latitud    : null,
    longitud   : null,
    id_padre   : '2a8dbc1b-05b6-4482-8a8f-8064c5e80c01'
  },
  {
    id         : '4a4e34b6-6114-417b-ab49-c33bca864120',
    codigo_ine : null,
    nivel      : 3,
    nombre     : 'MANUEL M. CABALLERO',
    latitud    : null,
    longitud   : null,
    id_padre   : 'd0f1a9df-8dff-4225-93c3-90aaf345d42d'
  },
  {
    id         : '4df71568-49bd-45b9-bb19-13b66db2f18e',
    codigo_ine : null,
    nivel      : 3,
    nombre     : 'GENERAL BERNARDINO B',
    latitud    : null,
    longitud   : null,
    id_padre   : 'd6bed80d-df3e-4b54-bede-fe9125149314'
  },
  {
    id         : 'b7b6f266-0177-4868-8beb-b3667699fec3',
    codigo_ine : null,
    nivel      : 3,
    nombre     : 'HERNANDO SILES',
    latitud    : null,
    longitud   : null,
    id_padre   : '75988c46-f652-4a80-8583-05431ac1105a'
  },
  {
    id         : '306e4f22-fc64-45d9-b5d4-6e23758bc529',
    codigo_ine : null,
    nivel      : 3,
    nombre     : 'ARQUE',
    latitud    : null,
    longitud   : null,
    id_padre   : 'de60d23c-3609-44ee-9ac0-9e2c75601704'
  },
  {
    id         : '6eca5734-9d6f-4309-ae24-aa2e4738938b',
    codigo_ine : null,
    nivel      : 3,
    nombre     : 'MURILLO',
    latitud    : null,
    longitud   : null,
    id_padre   : '2a8dbc1b-05b6-4482-8a8f-8064c5e80c01'
  },
  {
    id         : '8e3a573b-6983-4e9c-ac33-14877e56c47b',
    codigo_ine : null,
    nivel      : 3,
    nombre     : 'CAPINOTA',
    latitud    : null,
    longitud   : null,
    id_padre   : 'de60d23c-3609-44ee-9ac0-9e2c75601704'
  },
  {
    id         : '764091c2-0fda-41da-b26b-63331e42c11b',
    codigo_ine : null,
    nivel      : 3,
    nombre     : 'SUR CHICHAS',
    latitud    : null,
    longitud   : null,
    id_padre   : 'd6bed80d-df3e-4b54-bede-fe9125149314'
  },
  {
    id         : 'c2471612-df5c-42a9-a20e-f90fb2e4e9b9',
    codigo_ine : null,
    nivel      : 3,
    nombre     : 'ESTEBAN ARCE',
    latitud    : null,
    longitud   : null,
    id_padre   : 'de60d23c-3609-44ee-9ac0-9e2c75601704'
  },
  {
    id         : '347d0766-5543-428c-89f6-c70c834b87e4',
    codigo_ine : null,
    nivel      : 3,
    nombre     : 'ANDRÉS IBÁÑEZ',
    latitud    : null,
    longitud   : null,
    id_padre   : 'd0f1a9df-8dff-4225-93c3-90aaf345d42d'
  },
  {
    id         : 'b5493a40-9e24-41b9-8520-e7afe28a3e19',
    codigo_ine : null,
    nivel      : 3,
    nombre     : 'AYOPAYA',
    latitud    : null,
    longitud   : null,
    id_padre   : 'de60d23c-3609-44ee-9ac0-9e2c75601704'
  },
  {
    id         : '2203fbbc-5ba4-4a76-ab33-7706e039bc4b',
    codigo_ine : null,
    nivel      : 3,
    nombre     : 'GRAN CHACO',
    latitud    : null,
    longitud   : null,
    id_padre   : '9213e0fa-1f15-4c84-880f-923e8aa9341d'
  },
  {
    id         : '4087ce2b-c421-47ee-85dc-ff6f36bc9991',
    codigo_ine : null,
    nivel      : 3,
    nombre     : 'QUILLACOLLO',
    latitud    : null,
    longitud   : null,
    id_padre   : 'de60d23c-3609-44ee-9ac0-9e2c75601704'
  },
  {
    id         : 'c2fa6024-1917-4970-baac-6d55ebfa0755',
    codigo_ine : null,
    nivel      : 3,
    nombre     : 'INGAVÍ',
    latitud    : null,
    longitud   : null,
    id_padre   : '2a8dbc1b-05b6-4482-8a8f-8064c5e80c01'
  },
  {
    id         : 'f1dc5cc4-e65c-41f1-8dd7-2c094b7c401c',
    codigo_ine : null,
    nivel      : 3,
    nombre     : 'CERCADO',
    latitud    : null,
    longitud   : null,
    id_padre   : '9213e0fa-1f15-4c84-880f-923e8aa9341d'
  },
  {
    id         : '5e7ada11-8601-404b-ac71-8a2c215ef7db',
    codigo_ine : null,
    nivel      : 3,
    nombre     : 'LUIS CALVO',
    latitud    : null,
    longitud   : null,
    id_padre   : '75988c46-f652-4a80-8583-05431ac1105a'
  },
  {
    id         : 'bcf8fb1f-abdf-40a5-bf50-5f11f164b7a3',
    codigo_ine : null,
    nivel      : 3,
    nombre     : 'ARANI',
    latitud    : null,
    longitud   : null,
    id_padre   : 'de60d23c-3609-44ee-9ac0-9e2c75601704'
  },
  {
    id         : '254bf5b9-4d8b-4a03-ac00-daf44922b9ec',
    codigo_ine : null,
    nivel      : 3,
    nombre     : 'SARA',
    latitud    : null,
    longitud   : null,
    id_padre   : 'd0f1a9df-8dff-4225-93c3-90aaf345d42d'
  },
  {
    id         : 'a08ce2ab-2762-4a9b-88cc-e0cac15a2fe9',
    codigo_ine : null,
    nivel      : 3,
    nombre     : 'MANCO KAPAC',
    latitud    : null,
    longitud   : null,
    id_padre   : '2a8dbc1b-05b6-4482-8a8f-8064c5e80c01'
  },
  {
    id         : '9d0dcb6d-fdec-4ec8-9bc5-e84101240d76',
    codigo_ine : null,
    nivel      : 3,
    nombre     : 'ENRIQUE BALDIVIESO',
    latitud    : null,
    longitud   : null,
    id_padre   : 'd6bed80d-df3e-4b54-bede-fe9125149314'
  },
  {
    id         : '31d5cf25-e87d-4854-a187-c8ec4296410f',
    codigo_ine : null,
    nivel      : 3,
    nombre     : 'LADISLAO CABRERA',
    latitud    : null,
    longitud   : null,
    id_padre   : '305be394-cdb4-4c15-ae52-eeb0d88c4854'
  },
  {
    id         : 'aac37554-e8cd-46dd-995c-e760dcb4e211',
    codigo_ine : null,
    nivel      : 3,
    nombre     : 'GERMÁN BUSCH',
    latitud    : null,
    longitud   : null,
    id_padre   : 'd0f1a9df-8dff-4225-93c3-90aaf345d42d'
  },
  {
    id         : '42e69e30-4e07-4023-aacb-f54b878a73a5',
    codigo_ine : null,
    nivel      : 3,
    nombre     : 'CERCADO',
    latitud    : null,
    longitud   : null,
    id_padre   : 'a1632771-1294-4931-97df-19136e495d34'
  },
  {
    id         : '9cef1683-b50d-4b38-bcd1-0c8532ec4a1d',
    codigo_ine : null,
    nivel      : 3,
    nombre     : 'TOMÁS FRÍAS',
    latitud    : null,
    longitud   : null,
    id_padre   : 'd6bed80d-df3e-4b54-bede-fe9125149314'
  },
  {
    id         : '98f8ba10-2e15-41c5-b096-4286ede988d9',
    codigo_ine : null,
    nivel      : 3,
    nombre     : 'SUR CINTI',
    latitud    : null,
    longitud   : null,
    id_padre   : '75988c46-f652-4a80-8583-05431ac1105a'
  },
  {
    id         : 'f8f9d559-9581-43df-84f9-99add763440a',
    codigo_ine : null,
    nivel      : 3,
    nombre     : 'SUR YUNGAS',
    latitud    : null,
    longitud   : null,
    id_padre   : '2a8dbc1b-05b6-4482-8a8f-8064c5e80c01'
  },
  {
    id         : '7855e124-dc19-499b-8229-4cbac38e9a4f',
    codigo_ine : null,
    nivel      : 3,
    nombre     : 'RAFAEL BUSTILLO',
    latitud    : null,
    longitud   : null,
    id_padre   : 'd6bed80d-df3e-4b54-bede-fe9125149314'
  },
  {
    id         : 'aa6cef52-02f7-47e5-8f38-761c71539e2b',
    codigo_ine : null,
    nivel      : 3,
    nombre     : 'SAJAMA',
    latitud    : null,
    longitud   : null,
    id_padre   : '305be394-cdb4-4c15-ae52-eeb0d88c4854'
  },
  {
    id         : 'aad0f568-56e0-40bf-929c-0ebcbc4484be',
    codigo_ine : null,
    nivel      : 3,
    nombre     : 'NOR CHICHAS',
    latitud    : null,
    longitud   : null,
    id_padre   : 'd6bed80d-df3e-4b54-bede-fe9125149314'
  },
  {
    id         : '5954e011-b436-4a78-9674-9bfda70aa70a',
    codigo_ine : null,
    nivel      : 3,
    nombre     : 'BURNET O CONNOR',
    latitud    : null,
    longitud   : null,
    id_padre   : '9213e0fa-1f15-4c84-880f-923e8aa9341d'
  },
  {
    id         : 'd4934d59-dbc2-4dc2-af31-63359a4c5198',
    codigo_ine : null,
    nivel      : 3,
    nombre     : 'ICHILO',
    latitud    : null,
    longitud   : null,
    id_padre   : 'd0f1a9df-8dff-4225-93c3-90aaf345d42d'
  },
  {
    id         : '2a118d95-3b54-4cd4-a5be-8666a6529576',
    codigo_ine : null,
    nivel      : 3,
    nombre     : 'GERMÁN JORDÁN',
    latitud    : null,
    longitud   : null,
    id_padre   : 'de60d23c-3609-44ee-9ac0-9e2c75601704'
  },
  {
    id         : '70037016-0254-42c6-9103-77a16a18ba3d',
    codigo_ine : null,
    nivel      : 3,
    nombre     : 'ANTONIO QUIJARRO',
    latitud    : null,
    longitud   : null,
    id_padre   : 'd6bed80d-df3e-4b54-bede-fe9125149314'
  },
  {
    id         : 'b16c5591-053b-4965-9824-2343f916f55e',
    codigo_ine : null,
    nivel      : 3,
    nombre     : 'MOXOS',
    latitud    : null,
    longitud   : null,
    id_padre   : 'a1632771-1294-4931-97df-19136e495d34'
  },
  {
    id         : '5d9b3f90-0783-456a-894d-a1153c4f6f1c',
    codigo_ine : null,
    nivel      : 3,
    nombre     : 'GENERAL JOSE BALLIVIÁN SEGUROLA',
    latitud    : null,
    longitud   : null,
    id_padre   : 'a1632771-1294-4931-97df-19136e495d34'
  },
  {
    id         : '711d5879-e646-4f87-a6b3-0b211278afc8',
    codigo_ine : null,
    nivel      : 3,
    nombre     : 'YAMPARAEZ',
    latitud    : null,
    longitud   : null,
    id_padre   : '75988c46-f652-4a80-8583-05431ac1105a'
  },
  {
    id         : '2e11e77c-7fc2-40cd-942b-e6bc6fae91f9',
    codigo_ine : null,
    nivel      : 3,
    nombre     : 'SUR LÍPEZ',
    latitud    : null,
    longitud   : null,
    id_padre   : 'd6bed80d-df3e-4b54-bede-fe9125149314'
  },
  {
    id         : 'fcaf916c-89cd-42c7-8983-e839ba159f1f',
    codigo_ine : null,
    nivel      : 3,
    nombre     : 'GUALBERTO VILLARROEL',
    latitud    : null,
    longitud   : null,
    id_padre   : '2a8dbc1b-05b6-4482-8a8f-8064c5e80c01'
  },
  {
    id         : '623f2544-dccf-4eb6-992d-4f0c2d53b98a',
    codigo_ine : null,
    nivel      : 3,
    nombre     : 'AZURDUY',
    latitud    : null,
    longitud   : null,
    id_padre   : '75988c46-f652-4a80-8583-05431ac1105a'
  },
  {
    id         : '821d31cf-c6d5-494f-a749-aa4141272a4a',
    codigo_ine : null,
    nivel      : 3,
    nombre     : 'ALONSO DE IBÁÑEZ',
    latitud    : null,
    longitud   : null,
    id_padre   : 'd6bed80d-df3e-4b54-bede-fe9125149314'
  },
  {
    id         : '031903c3-5b81-49e6-ba1b-2a2c24d91f68',
    codigo_ine : null,
    nivel      : 3,
    nombre     : 'CARRASCO',
    latitud    : null,
    longitud   : null,
    id_padre   : 'de60d23c-3609-44ee-9ac0-9e2c75601704'
  },
  {
    id         : '480826e6-cea8-4cbf-8731-a4ecb496518a',
    codigo_ine : null,
    nivel      : 3,
    nombre     : 'NOR CINTI',
    latitud    : null,
    longitud   : null,
    id_padre   : '75988c46-f652-4a80-8583-05431ac1105a'
  }
];
items = setTimestampsSeeder(items);

module.exports = {
  up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('sys_dpa', items, {})
      .then(async () => {})
      .catch(error => {
        if (error.message.indexOf('already exists') > -1) return;
        console.error(error);
      });
  },
  down (queryInterface, Sequelize) {}
};
