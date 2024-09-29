'use strict';

const {
  setTimestampsSeeder
} = require('../lib/util');

// Datos de producción
let items = [
  {
    id         : '1723984f-fb9c-46e5-8f71-e6ba86ef0ba4',
    codigo_ine : '11002',
    nivel      : 4,
    nombre     : 'VILLA DE HUACAYA',
    latitud    : -20.743663,
    longitud   : -63.664651,
    id_padre   : '5e7ada11-8601-404b-ac71-8a2c215ef7db'
  },
  {
    id         : '924edb8d-7a3a-40d1-a266-21519bf8561b',
    codigo_ine : '11003',
    nivel      : 4,
    nombre     : 'MACHARETÍ',
    latitud    : -20.814573,
    longitud   : -63.361192,
    id_padre   : '5e7ada11-8601-404b-ac71-8a2c215ef7db'
  },
  {
    id         : 'c6dd6a61-3173-4820-bb7c-3254312e6bfc',
    codigo_ine : '20101',
    nivel      : 4,
    nombre     : 'NUESTRA SEÑORA DE LA PAZ',
    latitud    : -16.49361,
    longitud   : -68.134691,
    id_padre   : '6eca5734-9d6f-4309-ae24-aa2e4738938b'
  },
  {
    id         : '907d698c-32b0-4b85-8cbf-1b39a309c92f',
    codigo_ine : '20105',
    nivel      : 4,
    nombre     : 'EL ALTO DE LA PAZ',
    latitud    : -16.49468,
    longitud   : -68.173395,
    id_padre   : '6eca5734-9d6f-4309-ae24-aa2e4738938b'
  },
  {
    id         : '4db57e52-832d-49dc-8e69-8c31ff35657f',
    codigo_ine : '20305',
    nivel      : 4,
    nombre     : 'CHARAÑA',
    latitud    : -17.593935,
    longitud   : -69.446114,
    id_padre   : 'cfa16355-ac13-494e-8674-1e5b5fd0fdd4'
  },
  {
    id         : 'b8f9d9bd-d09b-4d34-98c5-e486f21296fa',
    codigo_ine : '21801',
    nivel      : 4,
    nombre     : 'SAN PEDRO DE CURAHUARA',
    latitud    : -17.654491,
    longitud   : -68.050047,
    id_padre   : 'fcaf916c-89cd-42c7-8983-e839ba159f1f'
  },
  {
    id         : '099a74ab-e25b-4f5e-be1e-0b80d5dae5db',
    codigo_ine : '21802',
    nivel      : 4,
    nombre     : 'PAPEL PAMPA',
    latitud    : -17.819349,
    longitud   : -67.769663,
    id_padre   : 'fcaf916c-89cd-42c7-8983-e839ba159f1f'
  },
  {
    id         : '12edd45a-df9c-40fa-897c-f25d0c985bc6',
    codigo_ine : '21803',
    nivel      : 4,
    nombre     : 'CHACARILLA',
    latitud    : -17.583826,
    longitud   : -68.215911,
    id_padre   : 'fcaf916c-89cd-42c7-8983-e839ba159f1f'
  },
  {
    id         : '8da7ba90-313c-4fee-ba32-49033f970d50',
    codigo_ine : '21901',
    nivel      : 4,
    nombre     : 'SANTIAGO DE MACHACA',
    latitud    : -17.066647,
    longitud   : -69.19328,
    id_padre   : '8e7045b6-14e1-4656-b68e-e6cec791f51f'
  },
  {
    id         : 'ffab6c64-9fca-4faa-a2bc-cf2e7225979e',
    codigo_ine : '50101',
    nivel      : 4,
    nombre     : 'POTOSÍ',
    latitud    : -19.580586,
    longitud   : -65.754229,
    id_padre   : '9cef1683-b50d-4b38-bcd1-0c8532ec4a1d'
  },
  {
    id         : '4cbf7ba0-8a45-46d5-83e4-febf2c9000c1',
    codigo_ine : '50102',
    nivel      : 4,
    nombre     : 'TINGUIPAYA',
    latitud    : -19.221975,
    longitud   : -65.820652,
    id_padre   : '9cef1683-b50d-4b38-bcd1-0c8532ec4a1d'
  },
  {
    id         : 'e89f0d31-8656-4cbb-bfe0-17db8b39b863',
    codigo_ine : '50104',
    nivel      : 4,
    nombre     : 'URMIRI (BELÉN DE ANDAMARCA)',
    latitud    : -19.385654,
    longitud   : -66.064283,
    id_padre   : '9cef1683-b50d-4b38-bcd1-0c8532ec4a1d'
  },
  {
    id         : '53cac66c-00de-496c-935a-bc8fdc7b8f32',
    codigo_ine : '50302',
    nivel      : 4,
    nombre     : 'CHAQUÍ',
    latitud    : -19.588312,
    longitud   : -65.56111,
    id_padre   : '68251915-bff5-44fa-94e2-111fc1fc6488'
  },
  {
    id         : '6058415b-93e5-47f4-830c-9588f6b072a3',
    codigo_ine : '50404',
    nivel      : 4,
    nombre     : 'OCURÍ',
    latitud    : -18.841711,
    longitud   : -65.795709,
    id_padre   : '4bbd38e3-3b58-4f93-a40f-2d63ff98c711'
  },
  {
    id         : '61f20351-6ff2-49e1-90ed-007d624a8923',
    codigo_ine : '50701',
    nivel      : 4,
    nombre     : 'SACACA (VILLA DE SACACA)',
    latitud    : -18.068274,
    longitud   : -66.383602,
    id_padre   : '821d31cf-c6d5-494f-a749-aa4141272a4a'
  },
  {
    id         : '6877c6ce-c902-4fec-b213-facc8b807890',
    codigo_ine : '50901',
    nivel      : 4,
    nombre     : 'COLCHA K (VILLA MARTÍN)',
    latitud    : -20.740225,
    longitud   : -67.660146,
    id_padre   : 'e0a3dbd0-cfad-435f-9231-7f71c9cc2550'
  },
  {
    id         : 'acf5fd45-d12a-4b97-8d39-3044022c5629',
    codigo_ine : '51001',
    nivel      : 4,
    nombre     : 'SAN PABLO DE LÍPEZ',
    latitud    : -21.686037,
    longitud   : -66.615951,
    id_padre   : '2e11e77c-7fc2-40cd-942b-e6bc6fae91f9'
  },
  {
    id         : '8ab05469-58e7-4221-9cb4-af06951a43d9',
    codigo_ine : '51003',
    nivel      : 4,
    nombre     : 'SAN ANTONIO DE ESMORUCO',
    latitud    : -21.948068,
    longitud   : -66.516829,
    id_padre   : '2e11e77c-7fc2-40cd-942b-e6bc6fae91f9'
  },
  {
    id         : '337d8a8a-f96f-410d-8e05-93b2436c1957',
    codigo_ine : '51102',
    nivel      : 4,
    nombre     : 'CAIZA',
    latitud    : -20.007279,
    longitud   : -65.654428,
    id_padre   : '61b9ab34-98fc-40c8-92bc-9a0d9a5c83a4'
  },
  {
    id         : '957d758d-0e9c-42bf-a543-acc45e428f79',
    codigo_ine : '60402',
    nivel      : 4,
    nombre     : 'YUNCHARÁ',
    latitud    : -21.821599,
    longitud   : -65.229561,
    id_padre   : '2205f39b-c5e5-436f-8ec1-fbb73743e642'
  },
  {
    id         : '390443dc-9b71-40e0-9373-b4e7834e8964',
    codigo_ine : '21204',
    nivel      : 4,
    nombre     : 'PUERTO PÉREZ',
    latitud    : -16.284858,
    longitud   : -68.60104,
    id_padre   : 'eea53bd7-a9cc-4066-871a-b6aad7dc7570'
  },
  {
    id         : 'b2df6c58-2c3d-4cf3-8964-f12383458a81',
    codigo_ine : '21301',
    nivel      : 4,
    nombre     : 'SICA SICA (VILLA AROMA)',
    latitud    : -17.333671,
    longitud   : -67.740906,
    id_padre   : 'd9e2ef30-315f-41ed-9f24-3d71e75ecdf9'
  },
  {
    id         : '6c86a4fe-9164-4491-b6d3-3bb221907ec9',
    codigo_ine : '21601',
    nivel      : 4,
    nombre     : 'GENERAL JUAN JOSÉ PÉREZ (CHARAZANI)',
    latitud    : -15.177297,
    longitud   : -68.994644,
    id_padre   : 'be6e861e-8b1b-4ce3-909b-620e3b460fbc'
  },
  {
    id         : 'e0705e5b-7f18-45e7-882b-5ad96b6ebea4',
    codigo_ine : '80304',
    nivel      : 4,
    nombre     : 'PUERTO RURRENABAQUE',
    latitud    : -14.441736,
    longitud   : -67.528438,
    id_padre   : '5d9b3f90-0783-456a-894d-a1153c4f6f1c'
  },
  {
    id         : 'a158f1fa-6ce7-4128-b35f-cdf7b3a98fb8',
    codigo_ine : '80401',
    nivel      : 4,
    nombre     : 'SANTA ANA (DE YACUMA)',
    latitud    : -13.744248,
    longitud   : -65.427348,
    id_padre   : '384ae3c6-1639-4875-a01c-4dc331a50c45'
  },
  {
    id         : 'bcdf87bb-6e86-414c-a230-7a6f1d9ed63a',
    codigo_ine : '80402',
    nivel      : 4,
    nombre     : 'EXALTACIÓN',
    latitud    : -13.320076,
    longitud   : -65.250403,
    id_padre   : '384ae3c6-1639-4875-a01c-4dc331a50c45'
  },
  {
    id         : '18c9f490-c9a6-40b8-9643-fac8829a35ca',
    codigo_ine : '80602',
    nivel      : 4,
    nombre     : 'SAN ANDRÉS',
    latitud    : -15.022869,
    longitud   : -64.666184,
    id_padre   : '99853176-d1d7-4ef2-b538-4b0c829f543b'
  },
  {
    id         : '1fdbf3af-41ab-48fe-bdd0-5716cac45d54',
    codigo_ine : '80701',
    nivel      : 4,
    nombre     : 'SAN JOAQUÍN',
    latitud    : -13.041123,
    longitud   : -64.667857,
    id_padre   : '7a0256dc-6da3-4f1f-a9ed-ea722283cd42'
  },
  {
    id         : '4eea7aff-6bc2-4ec2-9e59-504092df6246',
    codigo_ine : '30301',
    nivel      : 4,
    nombre     : 'AYOPAYA (VILLA DE INDEPENDENCIA)',
    latitud    : -17.083938,
    longitud   : -66.817676,
    id_padre   : 'b5493a40-9e24-41b9-8520-e7afe28a3e19'
  },
  {
    id         : '216eec0f-bf03-449d-bf8f-75008363914f',
    codigo_ine : '30901',
    nivel      : 4,
    nombre     : 'QUILLACOLLO',
    latitud    : -17.395483,
    longitud   : -66.279788,
    id_padre   : '4087ce2b-c421-47ee-85dc-ff6f36bc9991'
  },
  {
    id         : '9334e8f4-73f3-4257-941e-04b730dbc972',
    codigo_ine : '31001',
    nivel      : 4,
    nombre     : 'SACABA',
    latitud    : -17.40212,
    longitud   : -66.039124,
    id_padre   : '68a20b35-6651-4745-bc09-4c265cc36aed'
  },
  {
    id         : '6e30805e-9a54-4f0b-92b7-1eae6202e1f8',
    codigo_ine : '31002',
    nivel      : 4,
    nombre     : 'COLOMI',
    latitud    : -17.33783,
    longitud   : -65.867576,
    id_padre   : '68a20b35-6651-4745-bc09-4c265cc36aed'
  },
  {
    id         : '41ba43e3-a8bd-4a6a-af55-112bb657bb69',
    codigo_ine : '31501',
    nivel      : 4,
    nombre     : 'BOLÍVAR',
    latitud    : -17.970074,
    longitud   : -66.537038,
    id_padre   : '8e1a3b07-1061-45c4-a35b-808ecb3e2c56'
  },
  {
    id         : '455c61c4-e856-49f6-901c-1762e0d1e06a',
    codigo_ine : '70705',
    nivel      : 4,
    nombre     : 'GUTIÉRREZ',
    latitud    : -19.422656,
    longitud   : -63.52961,
    id_padre   : '6c06721c-ca0c-492c-9ca7-dcb0145f897d'
  },
  {
    id         : 'e61175db-cf71-432c-8e60-9820bf441c7a',
    codigo_ine : '70805',
    nivel      : 4,
    nombre     : 'PUCARÁ',
    latitud    : -18.71504,
    longitud   : -64.185992,
    id_padre   : '3d0f8d94-b973-41ee-96dd-4bf9e3194c7d'
  },
  {
    id         : 'f68e65e5-76bd-4b07-8f67-39abd565a360',
    codigo_ine : '71002',
    nivel      : 4,
    nombre     : 'GENERAL AGUSTÍN SAAVEDRA',
    latitud    : -17.226378,
    longitud   : -63.213224,
    id_padre   : 'e01df55d-68f8-4ccd-a657-28d965e98d64'
  },
  {
    id         : 'ff748c7b-04cf-4c24-a134-a60457722b26',
    codigo_ine : '71201',
    nivel      : 4,
    nombre     : 'SAN MATÍAS',
    latitud    : -16.361482,
    longitud   : -58.401066,
    id_padre   : 'd3295d7c-e3ad-4c39-823d-4f4887c54849'
  },
  {
    id         : '65c92c93-12bc-4c76-a938-3de97485a09f',
    codigo_ine : '71501',
    nivel      : 4,
    nombre     : 'ASCENCIÓN DE GUARAYOS',
    latitud    : -15.891756,
    longitud   : -63.189965,
    id_padre   : '01d1955a-5655-45ce-90ee-9febbb08e676'
  },
  {
    id         : '4db26148-a2fe-463e-9a0e-b218ca804f52',
    codigo_ine : '80202',
    nivel      : 4,
    nombre     : 'PUERTO GUAYARAMERÍN',
    latitud    : -10.816499,
    longitud   : -65.354652,
    id_padre   : 'ff8c1ae9-cbe8-4dc7-9547-21403f71635a'
  },
  {
    id         : 'e24b5416-719f-4f84-9ba7-ebbad1c4e019',
    codigo_ine : '71106',
    nivel      : 4,
    nombre     : 'CUATRO CAÑADAS',
    latitud    : -17.266746,
    longitud   : -62.557225,
    id_padre   : 'bae72dc1-cf25-4e76-967e-62c00035c371'
  },
  {
    id         : 'a381d340-e84e-4843-8fe7-0b4f5ddb9086',
    codigo_ine : '71004',
    nivel      : 4,
    nombre     : 'FERNÁNDEZ ALONSO',
    latitud    : -17.006203,
    longitud   : -63.23139,
    id_padre   : 'e01df55d-68f8-4ccd-a657-28d965e98d64'
  },
  {
    id         : 'b6d72366-db3c-44fc-9db8-01ae14d7c5f2',
    codigo_ine : '71401',
    nivel      : 4,
    nombre     : 'PUERTO SUÁREZ',
    latitud    : -18.964559,
    longitud   : -57.797625,
    id_padre   : 'aac37554-e8cd-46dd-995c-e760dcb4e211'
  },
  {
    id         : '9bcdcb42-e05d-48e7-b164-61c2eb89a136',
    codigo_ine : '71403',
    nivel      : 4,
    nombre     : 'EL CARMEN RIVERO TÓRREZ',
    latitud    : -18.828263,
    longitud   : -58.623997,
    id_padre   : 'aac37554-e8cd-46dd-995c-e760dcb4e211'
  },
  {
    id         : '62d11a38-7eb2-4e55-9a0b-29b1ccd9fa9b',
    codigo_ine : '21305',
    nivel      : 4,
    nombre     : 'PATACAMAYA',
    latitud    : -17.240943,
    longitud   : -67.92811,
    id_padre   : 'd9e2ef30-315f-41ed-9f24-3d71e75ecdf9'
  },
  {
    id         : 'dadc96be-d994-4eeb-819b-a3926524b2b0',
    codigo_ine : '21306',
    nivel      : 4,
    nombre     : 'COLQUENCHA',
    latitud    : -16.931291,
    longitud   : -68.248754,
    id_padre   : 'd9e2ef30-315f-41ed-9f24-3d71e75ecdf9'
  },
  {
    id         : '6676afa8-df9f-48cb-bd19-ae4f0ab6161f',
    codigo_ine : '21307',
    nivel      : 4,
    nombre     : 'COLLANA',
    latitud    : -16.904684,
    longitud   : -68.284232,
    id_padre   : 'd9e2ef30-315f-41ed-9f24-3d71e75ecdf9'
  },
  {
    id         : 'd308c379-6208-41fd-8628-6abdae2d388f',
    codigo_ine : '21401',
    nivel      : 4,
    nombre     : 'COROICO',
    latitud    : -16.188182,
    longitud   : -67.727536,
    id_padre   : '60609363-c275-4554-addb-6c142d786a14'
  },
  {
    id         : '45bb3c8b-d1ce-4aaf-bf86-85233ffab137',
    codigo_ine : '10801',
    nivel      : 4,
    nombre     : 'VILLA SERRANO',
    latitud    : -19.123214,
    longitud   : -64.323262,
    id_padre   : 'fcdc2264-0050-445d-b88c-361b3e472dd4'
  },
  {
    id         : '28edf8d6-944b-40ed-9891-a066496884bb',
    codigo_ine : '10902',
    nivel      : 4,
    nombre     : 'CULPINA',
    latitud    : -20.823512,
    longitud   : -64.943382,
    id_padre   : '98f8ba10-2e15-41c5-b096-4286ede988d9'
  },
  {
    id         : '5530a62d-3255-497a-a042-892849c161d4',
    codigo_ine : '20102',
    nivel      : 4,
    nombre     : 'PALCA',
    latitud    : -16.560943,
    longitud   : -67.952815,
    id_padre   : '6eca5734-9d6f-4309-ae24-aa2e4738938b'
  },
  {
    id         : '6e0f8df3-5c8c-426f-b854-33a71e1105a8',
    codigo_ine : '20103',
    nivel      : 4,
    nombre     : 'MECAPACA',
    latitud    : -16.665694,
    longitud   : -68.027661,
    id_padre   : '6eca5734-9d6f-4309-ae24-aa2e4738938b'
  },
  {
    id         : '7a0e5eee-da6e-4952-8256-7433d7cbbb8f',
    codigo_ine : '20104',
    nivel      : 4,
    nombre     : 'ACHOCALLA',
    latitud    : -16.574501,
    longitud   : -68.166733,
    id_padre   : '6eca5734-9d6f-4309-ae24-aa2e4738938b'
  },
  {
    id         : '89e2acfb-2c98-46c9-95a9-4cb3751187c1',
    codigo_ine : '20202',
    nivel      : 4,
    nombre     : 'ANCORAIMES',
    latitud    : -15.897133,
    longitud   : -68.906967,
    id_padre   : '5160c18e-4ee3-4f78-bcc4-c0d46028e752'
  },
  {
    id         : '93c4beb5-f72c-416b-8526-0335b4b3c003',
    codigo_ine : '30703',
    nivel      : 4,
    nombre     : 'SICAYA',
    latitud    : -17.800568,
    longitud   : -66.333813,
    id_padre   : '8e3a573b-6983-4e9c-ac33-14877e56c47b'
  },
  {
    id         : 'c92e152b-edee-453a-a197-dc9015c9f320',
    codigo_ine : '30801',
    nivel      : 4,
    nombre     : 'CLIZA',
    latitud    : -17.591632,
    longitud   : -65.934016,
    id_padre   : '2a118d95-3b54-4cd4-a5be-8666a6529576'
  },
  {
    id         : '64f52a50-b11c-4f4c-83cf-dc52c825e8d1',
    codigo_ine : '20301',
    nivel      : 4,
    nombre     : 'CORO CORO',
    latitud    : -17.178161,
    longitud   : -68.453093,
    id_padre   : 'cfa16355-ac13-494e-8674-1e5b5fd0fdd4'
  },
  {
    id         : 'efee5bc4-48cc-43d6-a8d9-c5f7f2215cb3',
    codigo_ine : '20302',
    nivel      : 4,
    nombre     : 'CAQUIAVIRI',
    latitud    : -17.023274,
    longitud   : -68.607005,
    id_padre   : 'cfa16355-ac13-494e-8674-1e5b5fd0fdd4'
  },
  {
    id         : '9b5d85f9-cb83-4c1f-b549-05b9611cfcf2',
    codigo_ine : '20303',
    nivel      : 4,
    nombre     : 'CALACOTO',
    latitud    : -17.283191,
    longitud   : -68.63637,
    id_padre   : 'cfa16355-ac13-494e-8674-1e5b5fd0fdd4'
  },
  {
    id         : '3c272871-ba34-4d85-a67d-01067b1c6db3',
    codigo_ine : '20304',
    nivel      : 4,
    nombre     : 'COMANCHE',
    latitud    : -16.95676,
    longitud   : -68.427649,
    id_padre   : 'cfa16355-ac13-494e-8674-1e5b5fd0fdd4'
  },
  {
    id         : '10117f5b-f60b-4384-a08d-1f63e0ca7104',
    codigo_ine : '30803',
    nivel      : 4,
    nombre     : 'TOLATA',
    latitud    : -17.533909,
    longitud   : -65.962603,
    id_padre   : '2a118d95-3b54-4cd4-a5be-8666a6529576'
  },
  {
    id         : '1d883aff-2fcf-4be9-b80d-3811c65fb82f',
    codigo_ine : '31201',
    nivel      : 4,
    nombre     : 'TOTORA',
    latitud    : -17.736504,
    longitud   : -65.191165,
    id_padre   : '031903c3-5b81-49e6-ba1b-2a2c24d91f68'
  },
  {
    id         : 'a630df4c-6d9a-43c3-a7f4-45e31ef86fb2',
    codigo_ine : '31203',
    nivel      : 4,
    nombre     : 'POCONA',
    latitud    : -17.67521,
    longitud   : -65.41995,
    id_padre   : '031903c3-5b81-49e6-ba1b-2a2c24d91f68'
  },
  {
    id         : 'd2098ee1-3320-4fdd-9cd4-8ff0926610e5',
    codigo_ine : '31205',
    nivel      : 4,
    nombre     : 'PUERTO VILLARROEL',
    latitud    : -16.838792,
    longitud   : -64.79333,
    id_padre   : '031903c3-5b81-49e6-ba1b-2a2c24d91f68'
  },
  {
    id         : 'fb6c71d3-44f8-44d8-b867-4294edba57cf',
    codigo_ine : '31301',
    nivel      : 4,
    nombre     : 'MIZQUE',
    latitud    : -17.943033,
    longitud   : -65.342837,
    id_padre   : '98c13072-92dc-4783-a93c-3852c5cb0603'
  },
  {
    id         : '64c9c22d-e14d-4649-a8d5-68778273a15c',
    codigo_ine : '31302',
    nivel      : 4,
    nombre     : 'VILA VILA',
    latitud    : -17.981654,
    longitud   : -65.631775,
    id_padre   : '98c13072-92dc-4783-a93c-3852c5cb0603'
  },
  {
    id         : 'a117dc7b-3a58-4ef5-b3ad-5cccb5f87ee9',
    codigo_ine : '20602',
    nivel      : 4,
    nombre     : 'GUANAY',
    latitud    : -15.495947,
    longitud   : -67.882632,
    id_padre   : '3f46a3a3-fcd7-42b3-86e5-3fe25db2125e'
  },
  {
    id         : '97955f3b-4f86-41b6-8928-1978e0a852ca',
    codigo_ine : '31202',
    nivel      : 4,
    nombre     : 'POJO',
    latitud    : -17.757582,
    longitud   : -64.865647,
    id_padre   : '031903c3-5b81-49e6-ba1b-2a2c24d91f68'
  },
  {
    id         : 'b9a70415-e4fa-4a18-88de-2e426de8972d',
    codigo_ine : '20603',
    nivel      : 4,
    nombre     : 'TACACOMA',
    latitud    : -15.589397,
    longitud   : -68.64524,
    id_padre   : '3f46a3a3-fcd7-42b3-86e5-3fe25db2125e'
  },
  {
    id         : 'e178af1d-3ea2-4b2f-8cee-4dc280099d28',
    codigo_ine : '20802',
    nivel      : 4,
    nombre     : 'GUAQUI',
    latitud    : -16.598438,
    longitud   : -68.836605,
    id_padre   : 'c2fa6024-1917-4970-baac-6d55ebfa0755'
  },
  {
    id         : '78ad574a-b423-41c5-bc68-495a097f43f6',
    codigo_ine : '20804',
    nivel      : 4,
    nombre     : 'DESAGUADERO',
    latitud    : -16.566493,
    longitud   : -69.035322,
    id_padre   : 'c2fa6024-1917-4970-baac-6d55ebfa0755'
  },
  {
    id         : '5f4520c2-8966-421c-a9a0-f2589ffc55c6',
    codigo_ine : '20701',
    nivel      : 4,
    nombre     : 'APOLO',
    latitud    : -14.717411,
    longitud   : -68.418039,
    id_padre   : 'e78ffcb9-fd74-404a-ac88-877e4692be01'
  },
  {
    id         : '0733483e-307c-41fc-8795-47c8a7483057',
    codigo_ine : '40503',
    nivel      : 4,
    nombre     : 'CRUZ DE MACHACAMARCA',
    latitud    : -18.771482,
    longitud   : -68.311774,
    id_padre   : 'f162ef8d-a00e-4195-9fb9-0baaedc694c4'
  },
  {
    id         : '1018a41f-057e-4909-ac17-7a7004d6045f',
    codigo_ine : '30101',
    nivel      : 4,
    nombre     : 'COCHABAMBA',
    latitud    : -17.38146,
    longitud   : -66.158775,
    id_padre   : 'd242be5d-9784-4ea2-b4e2-1aaa4176c93c'
  },
  {
    id         : '007e929c-cebb-44d2-acd5-1200a191cd9d',
    codigo_ine : '30201',
    nivel      : 4,
    nombre     : 'AIQUILE',
    latitud    : -18.201711,
    longitud   : -65.180078,
    id_padre   : 'cb15d46e-131a-4b83-9a38-9da6973aac5c'
  },
  {
    id         : 'd7b0fcb1-deaa-4e64-ad03-9aa265d09999',
    codigo_ine : '30202',
    nivel      : 4,
    nombre     : 'PASORAPA',
    latitud    : -18.32161,
    longitud   : -64.674901,
    id_padre   : 'cb15d46e-131a-4b83-9a38-9da6973aac5c'
  },
  {
    id         : '12b14af5-628b-419a-b73b-b61fc4ea4624',
    codigo_ine : '30203',
    nivel      : 4,
    nombre     : 'OMEREQUE',
    latitud    : -18.108285,
    longitud   : -64.908382,
    id_padre   : 'cb15d46e-131a-4b83-9a38-9da6973aac5c'
  },
  {
    id         : 'b40e403c-787e-4fcf-b5c4-03e8fedea4e4',
    codigo_ine : '51203',
    nivel      : 4,
    nombre     : 'PORCO',
    latitud    : -19.798197,
    longitud   : -65.988762,
    id_padre   : '70037016-0254-42c6-9103-77a16a18ba3d'
  },
  {
    id         : '2e1c45c1-8d9d-4e06-82e3-763a851409c7',
    codigo_ine : '70802',
    nivel      : 4,
    nombre     : 'TRIGAL',
    latitud    : -18.305167,
    longitud   : -64.149495,
    id_padre   : '3d0f8d94-b973-41ee-96dd-4bf9e3194c7d'
  },
  {
    id         : '4d4a68c2-1acf-4edf-8800-d8014a65c744',
    codigo_ine : '70803',
    nivel      : 4,
    nombre     : 'MORO MORO',
    latitud    : -18.366176,
    longitud   : -64.323512,
    id_padre   : '3d0f8d94-b973-41ee-96dd-4bf9e3194c7d'
  },
  {
    id         : '5cc15501-9c50-458f-a0b7-c250c6003cee',
    codigo_ine : '50103',
    nivel      : 4,
    nombre     : 'YOCALLA',
    latitud    : -19.391342,
    longitud   : -65.9055,
    id_padre   : '9cef1683-b50d-4b38-bcd1-0c8532ec4a1d'
  },
  {
    id         : '4d53939e-de4a-4898-a0c0-ad53fc0f1feb',
    codigo_ine : '70103',
    nivel      : 4,
    nombre     : 'PORONGO (AYACUCHO)',
    latitud    : -17.852028,
    longitud   : -63.308601,
    id_padre   : '347d0766-5543-428c-89f6-c70c834b87e4'
  },
  {
    id         : 'db824ac6-79de-458f-8b9a-742bc82ba9d1',
    codigo_ine : '70104',
    nivel      : 4,
    nombre     : 'LA GUARDIA',
    latitud    : -17.893316,
    longitud   : -63.329445,
    id_padre   : '347d0766-5543-428c-89f6-c70c834b87e4'
  },
  {
    id         : 'b25e672c-61f7-4100-8c59-ed0977be5bc9',
    codigo_ine : '90103',
    nivel      : 4,
    nombre     : 'BOLPEBRA (MUKDEN)',
    latitud    : -10.944688,
    longitud   : -69.567313,
    id_padre   : '397f2876-778c-49e3-aed3-ad2157cdff69'
  },
  {
    id         : '25e4c875-7b5e-411c-a309-e7fe12e9aa97',
    codigo_ine : '51302',
    nivel      : 4,
    nombre     : 'ACACIO',
    latitud    : -18.024063,
    longitud   : -66.057414,
    id_padre   : '4df71568-49bd-45b9-bb19-13b66db2f18e'
  },
  {
    id         : 'c73409a6-0df7-4819-9f4e-1c2918b8d29e',
    codigo_ine : '51501',
    nivel      : 4,
    nombre     : 'VILLAZÓN',
    latitud    : -22.090181,
    longitud   : -65.596531,
    id_padre   : '34f65b7c-82fb-457f-8aab-0dddc3784cde'
  },
  {
    id         : '98c88363-dc6e-4e5e-8609-c16ee39f100c',
    codigo_ine : '51601',
    nivel      : 4,
    nombre     : 'SAN AGUSTÍN',
    latitud    : -21.154865,
    longitud   : -67.678318,
    id_padre   : '9d0dcb6d-fdec-4ec8-9bc5-e84101240d76'
  },
  {
    id         : '0772c82d-e28d-4781-8412-8d972cc1f1cd',
    codigo_ine : '60302',
    nivel      : 4,
    nombre     : 'CARAPARÍ',
    latitud    : -21.827824,
    longitud   : -63.742386,
    id_padre   : '2203fbbc-5ba4-4a76-ab33-7706e039bc4b'
  },
  {
    id         : 'e14c0f65-2cac-4d3f-8c7b-fc1e41732d82',
    codigo_ine : '60401',
    nivel      : 4,
    nombre     : 'URIONDO (CONCEPCIÓN)',
    latitud    : -21.697224,
    longitud   : -64.6632,
    id_padre   : '2205f39b-c5e5-436f-8ec1-fbb73743e642'
  },
  {
    id         : '41ca63b0-9853-4344-84d8-41ca98d98a49',
    codigo_ine : '10901',
    nivel      : 4,
    nombre     : 'CAMATAQUI (VILLA ABECIA)',
    latitud    : -20.973968,
    longitud   : -65.231008,
    id_padre   : '98f8ba10-2e15-41c5-b096-4286ede988d9'
  },
  {
    id         : 'e932fec1-8aef-4c0e-bcd8-0fd576fb65a3',
    codigo_ine : '10903',
    nivel      : 4,
    nombre     : 'LAS CARRERAS (LAS CARRETAS)',
    latitud    : -21.211126,
    longitud   : -65.207187,
    id_padre   : '98f8ba10-2e15-41c5-b096-4286ede988d9'
  },
  {
    id         : 'bf9d1fd1-34e8-4d1d-9ead-9ee7e4d0c81c',
    codigo_ine : '11001',
    nivel      : 4,
    nombre     : 'VILLA VACA GUZMÁN (MUYUPAMPA)',
    latitud    : -19.893233,
    longitud   : -63.74867,
    id_padre   : '5e7ada11-8601-404b-ac71-8a2c215ef7db'
  },
  {
    id         : '7ad282db-fa0d-4917-bf92-fd6ff0360fb4',
    codigo_ine : '21203',
    nivel      : 4,
    nombre     : 'BATALLAS',
    latitud    : -16.299579,
    longitud   : -68.531635,
    id_padre   : 'eea53bd7-a9cc-4066-871a-b6aad7dc7570'
  },
  {
    id         : '6ffef57f-e381-4299-b836-db1573675138',
    codigo_ine : '20405',
    nivel      : 4,
    nombre     : 'ESCOMA',
    latitud    : -15.661791,
    longitud   : -69.131203,
    id_padre   : 'b6a6c466-54b8-46c8-8990-75eab76ab1c8'
  },
  {
    id         : 'f96c8b0e-dd23-42d3-88bf-0bb32d7bfeab',
    codigo_ine : '20803',
    nivel      : 4,
    nombre     : 'TIAHUANACU',
    latitud    : -16.552943,
    longitud   : -68.681141,
    id_padre   : 'c2fa6024-1917-4970-baac-6d55ebfa0755'
  },
  {
    id         : '663f84d8-d971-4baf-b42c-9963c9d81822',
    codigo_ine : '20807',
    nivel      : 4,
    nombre     : 'TARACO',
    latitud    : -16.456743,
    longitud   : -68.859022,
    id_padre   : 'c2fa6024-1917-4970-baac-6d55ebfa0755'
  },
  {
    id         : '10ebfe10-9f9a-4202-b916-6477bec9b318',
    codigo_ine : '51101',
    nivel      : 4,
    nombre     : 'PUNA (VILLA TALAVERA)',
    latitud    : -19.795409,
    longitud   : -65.506436,
    id_padre   : '61b9ab34-98fc-40c8-92bc-9a0d9a5c83a4'
  },
  {
    id         : '11906db2-09bb-4374-b472-8921ae59ac22',
    codigo_ine : '30802',
    nivel      : 4,
    nombre     : 'TOKO',
    latitud    : -17.625429,
    longitud   : -65.929062,
    id_padre   : '2a118d95-3b54-4cd4-a5be-8666a6529576'
  },
  {
    id         : '40c7f640-a555-43b0-8106-0acd85b50728',
    codigo_ine : '40101',
    nivel      : 4,
    nombre     : 'ORURO',
    latitud    : -17.967759,
    longitud   : -67.112073,
    id_padre   : '200f23dd-80ed-45bb-9bfe-c012cb6a92b1'
  },
  {
    id         : 'a0ce6933-5d76-44be-be73-6417b8901590',
    codigo_ine : '70601',
    nivel      : 4,
    nombre     : 'PORTACHUELO',
    latitud    : -17.353106,
    longitud   : -63.394316,
    id_padre   : '254bf5b9-4d8b-4a03-ac00-daf44922b9ec'
  },
  {
    id         : '34d2f58a-1b93-4c0f-a82a-5ff28b4ea545',
    codigo_ine : '20306',
    nivel      : 4,
    nombre     : 'WALDO BALLIVIÁN',
    latitud    : -17.082819,
    longitud   : -68.186256,
    id_padre   : 'cfa16355-ac13-494e-8674-1e5b5fd0fdd4'
  },
  {
    id         : 'a2749f03-ea25-4cfb-8611-81103095e915',
    codigo_ine : '60601',
    nivel      : 4,
    nombre     : 'ENTRE RÍOS (LA MORETA)',
    latitud    : -21.526585,
    longitud   : -64.171421,
    id_padre   : '5954e011-b436-4a78-9674-9bfda70aa70a'
  },
  {
    id         : 'bb377a3e-0c1f-4544-8ec4-7897c8cc3f4c',
    codigo_ine : '70301',
    nivel      : 4,
    nombre     : 'SAN IGNACIO (SAN IGNACIO DE VELASCO)',
    latitud    : -16.375375,
    longitud   : -60.961939,
    id_padre   : '3077a855-3dc0-444e-ba26-d1742ba1f18e'
  },
  {
    id         : '3c3eb280-cb01-4671-8032-ec9e9f6a6dcb',
    codigo_ine : '70302',
    nivel      : 4,
    nombre     : 'SAN MIGUEL (SAN MIGUEL DE VELASCO)',
    latitud    : -16.697679,
    longitud   : -60.967069,
    id_padre   : '3077a855-3dc0-444e-ba26-d1742ba1f18e'
  },
  {
    id         : '07ad1ebd-e374-4419-ab3d-cb6eba223198',
    codigo_ine : '70403',
    nivel      : 4,
    nombre     : 'YAPACANÍ',
    latitud    : -17.401446,
    longitud   : -63.883595,
    id_padre   : 'd4934d59-dbc2-4dc2-af31-63359a4c5198'
  },
  {
    id         : 'b4632384-4cd8-4709-8e71-4d569130e561',
    codigo_ine : '70501',
    nivel      : 4,
    nombre     : 'SAN JOSÉ DE CHIQUITOS',
    latitud    : -17.845451,
    longitud   : -60.741215,
    id_padre   : '92d4202a-7de1-4fc1-ac30-a455622cd6ee'
  },
  {
    id         : 'f0fe733d-0108-4315-813d-77757a1c0a96',
    codigo_ine : '70502',
    nivel      : 4,
    nombre     : 'PAILÓN',
    latitud    : -17.660111,
    longitud   : -62.717298,
    id_padre   : '92d4202a-7de1-4fc1-ac30-a455622cd6ee'
  },
  {
    id         : '1163708a-6b71-480c-aa1f-474e68e5e490',
    codigo_ine : '70503',
    nivel      : 4,
    nombre     : 'ROBORÉ',
    latitud    : -18.332348,
    longitud   : -59.756885,
    id_padre   : '92d4202a-7de1-4fc1-ac30-a455622cd6ee'
  },
  {
    id         : '7f2ff7aa-312d-41db-90eb-3c4f376a2bf7',
    codigo_ine : '20307',
    nivel      : 4,
    nombre     : 'NAZACARA DE PACAJES',
    latitud    : -16.937333,
    longitud   : -68.764397,
    id_padre   : 'cfa16355-ac13-494e-8674-1e5b5fd0fdd4'
  },
  {
    id         : '475a0cc1-80ea-4161-a43b-2e143753bd36',
    codigo_ine : '21302',
    nivel      : 4,
    nombre     : 'UMALA',
    latitud    : -17.373317,
    longitud   : -68.021433,
    id_padre   : 'd9e2ef30-315f-41ed-9f24-3d71e75ecdf9'
  },
  {
    id         : 'e52dde12-5d62-438d-924d-1b9466b5fe70',
    codigo_ine : '90201',
    nivel      : 4,
    nombre     : 'PUERTO RICO',
    latitud    : -11.104636,
    longitud   : -67.5562,
    id_padre   : 'c4dd8feb-72d9-4c5b-a8cc-f3f5f3473367'
  },
  {
    id         : '598950fe-f38c-4742-a157-3c4fb647b2b9',
    codigo_ine : '90203',
    nivel      : 4,
    nombre     : 'FILADELFIA',
    latitud    : -11.347234,
    longitud   : -68.762557,
    id_padre   : 'c4dd8feb-72d9-4c5b-a8cc-f3f5f3473367'
  },
  {
    id         : 'ba6f932f-37d3-41d7-9dec-202b62495b0f',
    codigo_ine : '21703',
    nivel      : 4,
    nombre     : 'TITO YUPANQUI',
    latitud    : -16.188883,
    longitud   : -68.954706,
    id_padre   : 'a08ce2ab-2762-4a9b-88cc-e0cac15a2fe9'
  },
  {
    id         : '8e0b2516-8f5b-4fd5-9930-f0757063c761',
    codigo_ine : '80702',
    nivel      : 4,
    nombre     : 'SAN RAMÓN',
    latitud    : -13.265578,
    longitud   : -64.616823,
    id_padre   : '7a0256dc-6da3-4f1f-a9ed-ea722283cd42'
  },
  {
    id         : '8736d4b0-6ddc-4281-b016-fe01078d5531',
    codigo_ine : '90202',
    nivel      : 4,
    nombre     : 'SAN PEDRO',
    latitud    : -10.825059,
    longitud   : -66.184521,
    id_padre   : 'c4dd8feb-72d9-4c5b-a8cc-f3f5f3473367'
  },
  {
    id         : 'de4daceb-10fb-4862-bdf8-b2ae4d5cb08a',
    codigo_ine : '20308',
    nivel      : 4,
    nombre     : 'SANTIAGO DE CALLAPA',
    latitud    : -17.479589,
    longitud   : -68.355644,
    id_padre   : 'cfa16355-ac13-494e-8674-1e5b5fd0fdd4'
  },
  {
    id         : '88854a40-ec0c-4c4c-8853-84d6bf43d666',
    codigo_ine : '20402',
    nivel      : 4,
    nombre     : 'MOCOMOCO',
    latitud    : -15.455732,
    longitud   : -68.996394,
    id_padre   : 'b6a6c466-54b8-46c8-8990-75eab76ab1c8'
  },
  {
    id         : '954a84ba-9f38-4203-bbff-937c28bbc843',
    codigo_ine : '20403',
    nivel      : 4,
    nombre     : 'PUERTO CARABUCO',
    latitud    : -15.758209,
    longitud   : -69.063875,
    id_padre   : 'b6a6c466-54b8-46c8-8990-75eab76ab1c8'
  },
  {
    id         : '229b6dd0-1b3b-4071-ba78-7d1d7993cf2d',
    codigo_ine : '20501',
    nivel      : 4,
    nombre     : 'CHUMA',
    latitud    : -15.479623,
    longitud   : -68.898519,
    id_padre   : '08859570-28c8-49d8-be8a-35f8002db052'
  },
  {
    id         : '80f428b3-9f6c-4bb2-aa8c-de3f77a6e62c',
    codigo_ine : '20502',
    nivel      : 4,
    nombre     : 'AYATA',
    latitud    : -15.459249,
    longitud   : -68.834701,
    id_padre   : '08859570-28c8-49d8-be8a-35f8002db052'
  },
  {
    id         : '4ba97fec-37e2-46e8-a272-674fe20833a5',
    codigo_ine : '30401',
    nivel      : 4,
    nombre     : 'TARATA',
    latitud    : -17.613014,
    longitud   : -66.02419,
    id_padre   : 'c2471612-df5c-42a9-a20e-f90fb2e4e9b9'
  },
  {
    id         : 'abda4b82-bec8-4cef-9742-39def7a7ebb7',
    codigo_ine : '30402',
    nivel      : 4,
    nombre     : 'ANZALDO',
    latitud    : -17.783426,
    longitud   : -65.9357,
    id_padre   : 'c2471612-df5c-42a9-a20e-f90fb2e4e9b9'
  },
  {
    id         : '0a6b7b6c-34fb-4e47-a771-96cbea76a60d',
    codigo_ine : '30403',
    nivel      : 4,
    nombre     : 'ARBIETO',
    latitud    : -17.581742,
    longitud   : -66.015304,
    id_padre   : 'c2471612-df5c-42a9-a20e-f90fb2e4e9b9'
  },
  {
    id         : '3a016a59-27b4-472c-b005-20689931c607',
    codigo_ine : '21303',
    nivel      : 4,
    nombre     : 'AYO AYO',
    latitud    : -17.091387,
    longitud   : -68.003628,
    id_padre   : 'd9e2ef30-315f-41ed-9f24-3d71e75ecdf9'
  },
  {
    id         : 'e88d0dd5-c0fb-4023-b527-91d8a174bd61',
    codigo_ine : '20401',
    nivel      : 4,
    nombre     : 'PUERTO ACOSTA',
    latitud    : -15.532981,
    longitud   : -69.252206,
    id_padre   : 'b6a6c466-54b8-46c8-8990-75eab76ab1c8'
  },
  {
    id         : '860565c5-3902-4831-aa48-c916221cb011',
    codigo_ine : '90302',
    nivel      : 4,
    nombre     : 'SAN LORENZO',
    latitud    : -11.888293,
    longitud   : -66.97922,
    id_padre   : '770591ac-e92a-43d1-bebe-64ca72be1c2b'
  },
  {
    id         : '602f6303-4c9f-4976-8878-cb29d4a14db3',
    codigo_ine : '30702',
    nivel      : 4,
    nombre     : 'SANTIVAÑEZ',
    latitud    : -17.550365,
    longitud   : -66.248011,
    id_padre   : '8e3a573b-6983-4e9c-ac33-14877e56c47b'
  },
  {
    id         : 'f65d8975-35cd-41bc-b904-4edae2078f31',
    codigo_ine : '30902',
    nivel      : 4,
    nombre     : 'SIPE SIPE',
    latitud    : -17.454195,
    longitud   : -66.354226,
    id_padre   : '4087ce2b-c421-47ee-85dc-ff6f36bc9991'
  },
  {
    id         : '7e3a6b60-6636-4795-ae23-d7333b139761',
    codigo_ine : '30903',
    nivel      : 4,
    nombre     : 'TIQUIPAYA',
    latitud    : -17.338126,
    longitud   : -66.219582,
    id_padre   : '4087ce2b-c421-47ee-85dc-ff6f36bc9991'
  },
  {
    id         : 'fcc139d4-752c-4265-981c-c63db7c0c4ab',
    codigo_ine : '30904',
    nivel      : 4,
    nombre     : 'VINTO',
    latitud    : -17.382402,
    longitud   : -66.31645,
    id_padre   : '4087ce2b-c421-47ee-85dc-ff6f36bc9991'
  },
  {
    id         : 'c37d8cf3-688b-4acf-95b7-b9c832825496',
    codigo_ine : '10101',
    nivel      : 4,
    nombre     : 'SUCRE',
    latitud    : -19.04652,
    longitud   : -65.260168,
    id_padre   : '11abc41d-0fce-40ee-9567-8825b26e32d9'
  },
  {
    id         : 'f240684a-19f0-4af9-bd58-0b47fffca313',
    codigo_ine : '10102',
    nivel      : 4,
    nombre     : 'YOTALA',
    latitud    : -19.162085,
    longitud   : -65.26438,
    id_padre   : '11abc41d-0fce-40ee-9567-8825b26e32d9'
  },
  {
    id         : '15483c38-e61d-4aa1-bb40-3e72250edf6e',
    codigo_ine : '10103',
    nivel      : 4,
    nombre     : 'POROMA',
    latitud    : -18.537912,
    longitud   : -65.425041,
    id_padre   : '11abc41d-0fce-40ee-9567-8825b26e32d9'
  },
  {
    id         : '62f97975-fd5c-47b0-971d-0ab58aad7710',
    codigo_ine : '10201',
    nivel      : 4,
    nombre     : 'VILLA AZURDUY',
    latitud    : -20.105652,
    longitud   : -64.413586,
    id_padre   : '623f2544-dccf-4eb6-992d-4f0c2d53b98a'
  },
  {
    id         : 'f67ad5e4-86cc-4168-97fb-5d1dba69c243',
    codigo_ine : '10302',
    nivel      : 4,
    nombre     : 'PRESTO',
    latitud    : -18.930182,
    longitud   : -64.93697,
    id_padre   : '86bcb3b7-d9e4-4fdf-8044-bb502a241346'
  },
  {
    id         : 'a200fb81-988c-48c9-80e2-9f9060b50d51',
    codigo_ine : '10303',
    nivel      : 4,
    nombre     : 'VILLA MOJOCOYA',
    latitud    : -18.763364,
    longitud   : -64.6179,
    id_padre   : '86bcb3b7-d9e4-4fdf-8044-bb502a241346'
  },
  {
    id         : 'b29798a2-b295-4b90-9ab8-eb314447f314',
    codigo_ine : '10401',
    nivel      : 4,
    nombre     : 'PADILLA',
    latitud    : -19.307311,
    longitud   : -64.301973,
    id_padre   : '7a545f11-1b5f-4be8-8f06-f8c291035f14'
  },
  {
    id         : 'f8f4f585-f55d-46eb-8938-ff4d9f0013ec',
    codigo_ine : '10404',
    nivel      : 4,
    nombre     : 'VILLA ALCALÁ',
    latitud    : -19.366278,
    longitud   : -64.389301,
    id_padre   : '7a545f11-1b5f-4be8-8f06-f8c291035f14'
  },
  {
    id         : '90e4e660-e6e7-43e9-a6df-1fbc36cd9ba1',
    codigo_ine : '10402',
    nivel      : 4,
    nombre     : 'TOMINA',
    latitud    : -19.185425,
    longitud   : -64.460602,
    id_padre   : '7a545f11-1b5f-4be8-8f06-f8c291035f14'
  },
  {
    id         : 'd5629154-29de-4ea2-9913-4142ec731bfb',
    codigo_ine : '10403',
    nivel      : 4,
    nombre     : 'SOPACHUY',
    latitud    : -19.487019,
    longitud   : -64.474731,
    id_padre   : '7a545f11-1b5f-4be8-8f06-f8c291035f14'
  },
  {
    id         : 'a032844c-4651-4c13-806a-1174276b32a0',
    codigo_ine : '10405',
    nivel      : 4,
    nombre     : 'EL VILLAR',
    latitud    : -19.628835,
    longitud   : -64.309609,
    id_padre   : '7a545f11-1b5f-4be8-8f06-f8c291035f14'
  },
  {
    id         : 'f54bd6cc-29c6-4412-961d-c14c323a1210',
    codigo_ine : '10501',
    nivel      : 4,
    nombre     : 'MONTEAGUDO',
    latitud    : -19.799893,
    longitud   : -63.954767,
    id_padre   : 'b7b6f266-0177-4868-8beb-b3667699fec3'
  },
  {
    id         : '27749774-6c06-44a4-8f33-18b7dc1c6a3e',
    codigo_ine : '10502',
    nivel      : 4,
    nombre     : 'SAN PABLO DE HUACARETA',
    latitud    : -20.366776,
    longitud   : -64.002739,
    id_padre   : 'b7b6f266-0177-4868-8beb-b3667699fec3'
  },
  {
    id         : '5b2078e8-1f06-4154-888b-ead6ad007550',
    codigo_ine : '10601',
    nivel      : 4,
    nombre     : 'TARABUCO',
    latitud    : -19.181146,
    longitud   : -64.915421,
    id_padre   : '711d5879-e646-4f87-a6b3-0b211278afc8'
  },
  {
    id         : '73ddf19f-5b5b-449c-89d5-4a36c102cdaf',
    codigo_ine : '10602',
    nivel      : 4,
    nombre     : 'YAMPAREZ',
    latitud    : -19.189121,
    longitud   : -65.118104,
    id_padre   : '711d5879-e646-4f87-a6b3-0b211278afc8'
  },
  {
    id         : 'd65b2164-2332-461f-b5e3-fb68b54cfab5',
    codigo_ine : '10701',
    nivel      : 4,
    nombre     : 'CAMARGO',
    latitud    : -20.640628,
    longitud   : -65.210044,
    id_padre   : '480826e6-cea8-4cbf-8731-a4ecb496518a'
  },
  {
    id         : '480785e6-0c4b-487e-910c-742847d3c0f7',
    codigo_ine : '10702',
    nivel      : 4,
    nombre     : 'SAN LUCAS',
    latitud    : -20.10198,
    longitud   : -65.133564,
    id_padre   : '480826e6-cea8-4cbf-8731-a4ecb496518a'
  },
  {
    id         : '34c402e3-e0b4-49d5-8aae-c0405ecb0a47',
    codigo_ine : '21304',
    nivel      : 4,
    nombre     : 'CALAMARCA',
    latitud    : -16.909779,
    longitud   : -68.119037,
    id_padre   : 'd9e2ef30-315f-41ed-9f24-3d71e75ecdf9'
  },
  {
    id         : 'e04dbd90-0c50-4563-8041-3a95fba177a2',
    codigo_ine : '30905',
    nivel      : 4,
    nombre     : 'COLCAPIRHUA',
    latitud    : -17.389566,
    longitud   : -66.241267,
    id_padre   : '4087ce2b-c421-47ee-85dc-ff6f36bc9991'
  },
  {
    id         : '81cb618e-039b-494f-8577-0376933eed71',
    codigo_ine : '31003',
    nivel      : 4,
    nombre     : 'VILLA TUNARI',
    latitud    : -16.973048,
    longitud   : -65.419601,
    id_padre   : '68a20b35-6651-4745-bc09-4c265cc36aed'
  },
  {
    id         : '64c17806-152d-40d5-8309-aaef31393a5b',
    codigo_ine : '31101',
    nivel      : 4,
    nombre     : 'TAPACARÍ',
    latitud    : -17.521161,
    longitud   : -66.616445,
    id_padre   : '25dfa27c-f0a6-4760-95f3-baf03bc4c4e7'
  },
  {
    id         : '27bcf76f-be78-4018-b41e-74bd55855665',
    codigo_ine : '31204',
    nivel      : 4,
    nombre     : 'CHIMORÉ',
    latitud    : -16.994429,
    longitud   : -65.150916,
    id_padre   : '031903c3-5b81-49e6-ba1b-2a2c24d91f68'
  },
  {
    id         : '8332d568-d0bc-47c5-a167-79d07dd559cd',
    codigo_ine : '31403',
    nivel      : 4,
    nombre     : 'SAN BENITO (VILLA JOSÉ QUINTÍN MENDOZA)',
    latitud    : -17.522699,
    longitud   : -65.894408,
    id_padre   : 'bb68aa6d-2fb1-409e-8e21-3b0333b208ec'
  },
  {
    id         : '6a660d5f-b3f8-4133-be67-b88bf19f07c9',
    codigo_ine : '21004',
    nivel      : 4,
    nombre     : 'COLQUIRI',
    latitud    : -17.387683,
    longitud   : -67.128681,
    id_padre   : '0e43e4c3-427a-4a76-a27e-fcd19298f4ed'
  },
  {
    id         : 'e7f3db00-3e08-44f1-b584-0682498d13f0',
    codigo_ine : '21006',
    nivel      : 4,
    nombre     : 'LICOMA PAMPA',
    latitud    : -16.805689,
    longitud   : -67.202089,
    id_padre   : '0e43e4c3-427a-4a76-a27e-fcd19298f4ed'
  },
  {
    id         : '6b2b9d0e-eae6-4805-806b-208f31260844',
    codigo_ine : '21101',
    nivel      : 4,
    nombre     : 'CHULUMANI (VILLA DE LA LIBERTAD)',
    latitud    : -16.409358,
    longitud   : -67.525732,
    id_padre   : 'f8f9d559-9581-43df-84f9-99add763440a'
  },
  {
    id         : '532632b0-17ae-48a4-987c-446c26655656',
    codigo_ine : '21102',
    nivel      : 4,
    nombre     : 'IRUPANA (VILLA DE LANZA)',
    latitud    : -16.465799,
    longitud   : -67.454647,
    id_padre   : 'f8f9d559-9581-43df-84f9-99add763440a'
  },
  {
    id         : '6548b0aa-cab9-43ba-acb3-381fb8ff5922',
    codigo_ine : '20905',
    nivel      : 4,
    nombre     : 'CAIROMA',
    latitud    : -16.903466,
    longitud   : -67.539988,
    id_padre   : '62ab5b09-4fa7-4c6f-98d4-0b819e020f33'
  },
  {
    id         : '9b37f80c-fc15-4c53-8fa0-7de4b325b63b',
    codigo_ine : '21001',
    nivel      : 4,
    nombre     : 'INQUISIVI',
    latitud    : -16.907745,
    longitud   : -67.138331,
    id_padre   : '0e43e4c3-427a-4a76-a27e-fcd19298f4ed'
  },
  {
    id         : '76f56d07-f120-45cb-b170-c729e1db583f',
    codigo_ine : '21002',
    nivel      : 4,
    nombre     : 'QUIME',
    latitud    : -16.98141,
    longitud   : -67.217917,
    id_padre   : '0e43e4c3-427a-4a76-a27e-fcd19298f4ed'
  },
  {
    id         : '638cd151-41b9-43ce-a1c2-c80f2dde6391',
    codigo_ine : '21003',
    nivel      : 4,
    nombre     : 'CAJUATA',
    latitud    : -16.699016,
    longitud   : -67.172648,
    id_padre   : '0e43e4c3-427a-4a76-a27e-fcd19298f4ed'
  },
  {
    id         : '8b44231c-d8c0-451b-a305-056437f06285',
    codigo_ine : '21005',
    nivel      : 4,
    nombre     : 'ICHOCA',
    latitud    : -17.139833,
    longitud   : -67.187477,
    id_padre   : '0e43e4c3-427a-4a76-a27e-fcd19298f4ed'
  },
  {
    id         : '689b9584-6173-4a94-bb0b-a6c9003c2409',
    codigo_ine : '21103',
    nivel      : 4,
    nombre     : 'YANACACHI',
    latitud    : -16.390542,
    longitud   : -67.735261,
    id_padre   : 'f8f9d559-9581-43df-84f9-99add763440a'
  },
  {
    id         : '589fcdf7-0260-4204-a007-0425d7fff111',
    codigo_ine : '21104',
    nivel      : 4,
    nombre     : 'PALOS BLANCOS',
    latitud    : -15.5848,
    longitud   : -67.247984,
    id_padre   : 'f8f9d559-9581-43df-84f9-99add763440a'
  },
  {
    id         : '79ad21a7-7b01-4fb5-96a5-82c816ccc4ff',
    codigo_ine : '21105',
    nivel      : 4,
    nombre     : 'LA ASUNTA',
    latitud    : -16.124336,
    longitud   : -67.194624,
    id_padre   : 'f8f9d559-9581-43df-84f9-99add763440a'
  },
  {
    id         : 'b6c55185-4b80-479f-90ca-5242a0710540',
    codigo_ine : '21201',
    nivel      : 4,
    nombre     : 'PUCARANI',
    latitud    : -16.399271,
    longitud   : -68.477478,
    id_padre   : 'eea53bd7-a9cc-4066-871a-b6aad7dc7570'
  },
  {
    id         : '0d003c05-3578-4b0f-b32b-e5616cfdac63',
    codigo_ine : '31405',
    nivel      : 4,
    nombre     : 'CUCHUMUELA (VILLA GUALBERTO VILLARROEL)',
    latitud    : -17.665837,
    longitud   : -65.795717,
    id_padre   : 'bb68aa6d-2fb1-409e-8e21-3b0333b208ec'
  },
  {
    id         : '11f31e98-4bab-495e-bd6e-5ff8c5f4cf94',
    codigo_ine : '40302',
    nivel      : 4,
    nombre     : 'CHOQUE COTA',
    latitud    : -18.098375,
    longitud   : -67.895526,
    id_padre   : 'd5c371f8-55b1-41b6-ab22-146d1dfeedd3'
  },
  {
    id         : 'a63c4421-67b9-4c04-b5b8-142a6fb2dc2e',
    codigo_ine : '40504',
    nivel      : 4,
    nombre     : 'YUNGUYO DE LITORAL',
    latitud    : -18.853423,
    longitud   : -68.320751,
    id_padre   : 'f162ef8d-a00e-4195-9fb9-0baaedc694c4'
  },
  {
    id         : 'efd7ab47-b082-48d8-967f-fe11a338e4c5',
    codigo_ine : '40601',
    nivel      : 4,
    nombre     : 'POOPÓ (VILLA POOPÓ)',
    latitud    : -18.380395,
    longitud   : -66.968524,
    id_padre   : '81eaf74c-cfc5-4c40-9044-683f6437b7e4'
  },
  {
    id         : '3b00191c-5363-4c9a-9ee4-ae281b7d6c1a',
    codigo_ine : '40603',
    nivel      : 4,
    nombre     : 'ANTEQUERA (BOLÍVAR)',
    latitud    : -18.471123,
    longitud   : -66.825837,
    id_padre   : '81eaf74c-cfc5-4c40-9044-683f6437b7e4'
  },
  {
    id         : '8c408565-a040-44f7-aa9e-57e298c9f71a',
    codigo_ine : '40801',
    nivel      : 4,
    nombre     : 'SALINAS DE GARCÍ MENDOZA',
    latitud    : -19.638428,
    longitud   : -67.676341,
    id_padre   : '31d5cf25-e87d-4854-a187-c8ec4296410f'
  },
  {
    id         : '56f96880-bc10-4752-9d18-a34a82161c39',
    codigo_ine : '41201',
    nivel      : 4,
    nombre     : 'ANDAMARCA (SANTIAGO DE ANDAMARCA)',
    latitud    : -18.778789,
    longitud   : -67.508325,
    id_padre   : 'd5f02f66-868f-4191-b9bc-5106c18df58d'
  },
  {
    id         : '6be51969-143f-4f23-ae8d-34106cc04a19',
    codigo_ine : '41202',
    nivel      : 4,
    nombre     : 'BELÉN DE ANDAMARCA',
    latitud    : -18.817236,
    longitud   : -67.64146,
    id_padre   : 'd5f02f66-868f-4191-b9bc-5106c18df58d'
  },
  {
    id         : '1ab16eeb-1cf3-4971-aeb5-c821429ca3cc',
    codigo_ine : '41601',
    nivel      : 4,
    nombre     : 'HUAYLLAMARCA (SANTIAGO DE HUAYLLAMARCA)',
    latitud    : -17.840994,
    longitud   : -67.945841,
    id_padre   : '2c9229d7-2e31-4c3a-afc3-1a4f42acf652'
  },
  {
    id         : 'aa249594-8245-48ed-8305-8de8270a5dd5',
    codigo_ine : '90301',
    nivel      : 4,
    nombre     : 'PUERTO GONZALO MORENO',
    latitud    : -11.086631,
    longitud   : -66.167044,
    id_padre   : '770591ac-e92a-43d1-bebe-64ca72be1c2b'
  },
  {
    id         : '34e73859-bae8-41e2-8ae3-aa690882752b',
    codigo_ine : '90402',
    nivel      : 4,
    nombre     : 'INGAVI (HUMAITA)',
    latitud    : -10.81628,
    longitud   : -66.449197,
    id_padre   : '24a49e8b-25ca-4dee-b63f-3578079bc874'
  },
  {
    id         : '5e7cdd50-6094-4f9c-883c-1b0afff9bd26',
    codigo_ine : '10202',
    nivel      : 4,
    nombre     : 'TARVITA (VILLA ORÍAS)',
    latitud    : -19.926035,
    longitud   : -64.483608,
    id_padre   : '623f2544-dccf-4eb6-992d-4f0c2d53b98a'
  },
  {
    id         : '4b0f577f-4346-4f92-9422-96775e2a6bae',
    codigo_ine : '10301',
    nivel      : 4,
    nombre     : 'VILLA ZUDAÑEZ (TACOPAYA)',
    latitud    : -19.119782,
    longitud   : -64.698896,
    id_padre   : '86bcb3b7-d9e4-4fdf-8044-bb502a241346'
  },
  {
    id         : 'c4fa62f7-3a3f-44ab-8ba4-ee9f5bdb1576',
    codigo_ine : '10304',
    nivel      : 4,
    nombre     : 'ICLA (RICARDO MUJIA)',
    latitud    : -19.36343,
    longitud   : -64.793112,
    id_padre   : '86bcb3b7-d9e4-4fdf-8044-bb502a241346'
  },
  {
    id         : '75b7885d-8b70-4710-92e1-de9349ea21bb',
    codigo_ine : '21202',
    nivel      : 4,
    nombre     : 'LAJA',
    latitud    : -16.536534,
    longitud   : -68.385518,
    id_padre   : 'eea53bd7-a9cc-4066-871a-b6aad7dc7570'
  },
  {
    id         : '5581d7eb-6496-4551-b221-0564a65ad33f',
    codigo_ine : '21602',
    nivel      : 4,
    nombre     : 'CURVA',
    latitud    : -15.131128,
    longitud   : -68.999245,
    id_padre   : 'be6e861e-8b1b-4ce3-909b-620e3b460fbc'
  },
  {
    id         : 'e75c9a54-b7a8-4d3d-a95b-a045c9324d16',
    codigo_ine : '21701',
    nivel      : 4,
    nombre     : 'COPACABANA',
    latitud    : -16.165466,
    longitud   : -69.086934,
    id_padre   : 'a08ce2ab-2762-4a9b-88cc-e0cac15a2fe9'
  },
  {
    id         : '3220a8a3-f879-4b4d-b6c9-82f20aa8e350',
    codigo_ine : '21702',
    nivel      : 4,
    nombre     : 'SAN PEDRO DE TIQUINA',
    latitud    : -16.221504,
    longitud   : -68.85394,
    id_padre   : 'a08ce2ab-2762-4a9b-88cc-e0cac15a2fe9'
  },
  {
    id         : '05676be0-e17a-49c1-8149-2364c89ffe8f',
    codigo_ine : '20503',
    nivel      : 4,
    nombre     : 'AUCAPATA',
    latitud    : -15.479418,
    longitud   : -68.718922,
    id_padre   : '08859570-28c8-49d8-be8a-35f8002db052'
  },
  {
    id         : '89c62212-461d-45d2-8fc7-9336abdac3d6',
    codigo_ine : '20601',
    nivel      : 4,
    nombre     : 'SORATA',
    latitud    : -15.773249,
    longitud   : -68.649388,
    id_padre   : '3f46a3a3-fcd7-42b3-86e5-3fe25db2125e'
  },
  {
    id         : '1c42ae7b-c6f1-40dd-95dc-d759294a5dc4',
    codigo_ine : '20201',
    nivel      : 4,
    nombre     : 'ACHACACHI',
    latitud    : -16.043287,
    longitud   : -68.685282,
    id_padre   : '5160c18e-4ee3-4f78-bcc4-c0d46028e752'
  },
  {
    id         : '08f15c89-4b49-4965-9e83-56d4c608cf4f',
    codigo_ine : '20605',
    nivel      : 4,
    nombre     : 'COMBAYA',
    latitud    : -15.805272,
    longitud   : -68.754761,
    id_padre   : '3f46a3a3-fcd7-42b3-86e5-3fe25db2125e'
  },
  {
    id         : '0589a5e7-3fa3-4242-9a2d-39cc6d0b4a01',
    codigo_ine : '31303',
    nivel      : 4,
    nombre     : 'ALALAY',
    latitud    : -17.701445,
    longitud   : -65.699216,
    id_padre   : '98c13072-92dc-4783-a93c-3852c5cb0603'
  },
  {
    id         : 'f08cc5de-a6a3-4128-bb7e-1a3ef7227fdc',
    codigo_ine : '31401',
    nivel      : 4,
    nombre     : 'PUNATA',
    latitud    : -17.546136,
    longitud   : -65.838482,
    id_padre   : 'bb68aa6d-2fb1-409e-8e21-3b0333b208ec'
  },
  {
    id         : '80278d82-694b-486a-a35e-1a140f6e7799',
    codigo_ine : '31402',
    nivel      : 4,
    nombre     : 'VILLA RIVERO',
    latitud    : -17.616305,
    longitud   : -65.812841,
    id_padre   : 'bb68aa6d-2fb1-409e-8e21-3b0333b208ec'
  },
  {
    id         : 'e3f3741f-4978-4a32-833c-50d157ae5ef9',
    codigo_ine : '41101',
    nivel      : 4,
    nombre     : 'EUCALIPTUS',
    latitud    : -17.596838,
    longitud   : -67.508494,
    id_padre   : '309009be-c25d-40ac-9f19-c5aff493d168'
  },
  {
    id         : '07fb6a74-308f-4b30-84f9-c2414565947c',
    codigo_ine : '41301',
    nivel      : 4,
    nombre     : 'SAN PEDRO DE TOTORA',
    latitud    : -17.793673,
    longitud   : -68.146077,
    id_padre   : '508afcac-3641-48e9-b6ea-bb88aea70560'
  },
  {
    id         : '22da161e-98ea-4219-8813-81a4acb7b065',
    codigo_ine : '41401',
    nivel      : 4,
    nombre     : 'SANTIAGO DE HUARI',
    latitud    : -19.012181,
    longitud   : -66.777012,
    id_padre   : '1d262d8e-07b5-4f80-9315-e83d889ad579'
  },
  {
    id         : 'a08c727a-5aa1-4eba-8b79-f22740ce4efe',
    codigo_ine : '31404',
    nivel      : 4,
    nombre     : 'TACACHI',
    latitud    : -17.641932,
    longitud   : -65.801245,
    id_padre   : 'bb68aa6d-2fb1-409e-8e21-3b0333b208ec'
  },
  {
    id         : 'e6409a4d-a481-4846-b56d-0aaa817685cc',
    codigo_ine : '40102',
    nivel      : 4,
    nombre     : 'CARACOLLO',
    latitud    : -17.643245,
    longitud   : -67.21271,
    id_padre   : '200f23dd-80ed-45bb-9bfe-c012cb6a92b1'
  },
  {
    id         : 'cf2d1d42-8387-4774-aca3-ae62a9dceec0',
    codigo_ine : '40103',
    nivel      : 4,
    nombre     : 'EL CHORO',
    latitud    : -18.357339,
    longitud   : -67.115623,
    id_padre   : '200f23dd-80ed-45bb-9bfe-c012cb6a92b1'
  },
  {
    id         : '6cb94781-f647-4460-a9f3-5cfb05f4d93e',
    codigo_ine : '40201',
    nivel      : 4,
    nombre     : 'CHALLAPATA',
    latitud    : -18.90082,
    longitud   : -66.774693,
    id_padre   : '468793ce-d29c-40a4-a2e6-c9ad8eb03354'
  },
  {
    id         : '2ccc1e7f-c943-4396-8dec-46027de7a0ed',
    codigo_ine : '40202',
    nivel      : 4,
    nombre     : 'SANTUARIO DE QUILLACAS',
    latitud    : -19.23317,
    longitud   : -66.942413,
    id_padre   : '468793ce-d29c-40a4-a2e6-c9ad8eb03354'
  },
  {
    id         : '9f785910-6d08-4ac0-87ec-015a2ff93efe',
    codigo_ine : '40301',
    nivel      : 4,
    nombre     : 'CORQUE',
    latitud    : -18.351017,
    longitud   : -67.681877,
    id_padre   : 'd5c371f8-55b1-41b6-ab22-146d1dfeedd3'
  },
  {
    id         : '01ab2c73-0b94-4bfb-9ed7-78f3db2ed421',
    codigo_ine : '40401',
    nivel      : 4,
    nombre     : 'CURAHUARA DE CARANGAS',
    latitud    : -17.842347,
    longitud   : -68.410052,
    id_padre   : 'aa6cef52-02f7-47e5-8f38-761c71539e2b'
  },
  {
    id         : '71ed16e4-1440-4263-a8e2-67eff805b2ed',
    codigo_ine : '40402',
    nivel      : 4,
    nombre     : 'TURCO',
    latitud    : -18.180721,
    longitud   : -68.193562,
    id_padre   : 'aa6cef52-02f7-47e5-8f38-761c71539e2b'
  },
  {
    id         : '058b83bc-d996-4acd-815d-8e5797834b7d',
    codigo_ine : '80703',
    nivel      : 4,
    nombre     : 'PUERTO SILES',
    latitud    : -12.79933,
    longitud   : -65.002256,
    id_padre   : '7a0256dc-6da3-4f1f-a9ed-ea722283cd42'
  },
  {
    id         : 'abc56929-fc36-40c6-bcfb-da08d330162e',
    codigo_ine : '80801',
    nivel      : 4,
    nombre     : 'MAGDALENA',
    latitud    : -13.262423,
    longitud   : -64.054508,
    id_padre   : 'dce343e6-cb3e-477f-aab7-5cbec7e7eea7'
  },
  {
    id         : 'a401f215-23f0-463c-80cb-189c88dd591c',
    codigo_ine : '80802',
    nivel      : 4,
    nombre     : 'BAURES',
    latitud    : -13.655432,
    longitud   : -63.695852,
    id_padre   : 'dce343e6-cb3e-477f-aab7-5cbec7e7eea7'
  },
  {
    id         : '3b039428-7eac-4505-bacc-ff97719ebe56',
    codigo_ine : '80803',
    nivel      : 4,
    nombre     : 'HUACARAJE',
    latitud    : -13.592809,
    longitud   : -63.8802,
    id_padre   : 'dce343e6-cb3e-477f-aab7-5cbec7e7eea7'
  },
  {
    id         : '5919894d-323b-403a-a399-4d734ef163dc',
    codigo_ine : '90101',
    nivel      : 4,
    nombre     : 'COBIJA',
    latitud    : -11.024813,
    longitud   : -68.761127,
    id_padre   : '397f2876-778c-49e3-aed3-ad2157cdff69'
  },
  {
    id         : 'abb4fb36-d69d-4c73-bd9c-4c48a4a1a251',
    codigo_ine : '90102',
    nivel      : 4,
    nombre     : 'PORVENIR',
    latitud    : -11.237475,
    longitud   : -68.687711,
    id_padre   : '397f2876-778c-49e3-aed3-ad2157cdff69'
  },
  {
    id         : '795d3388-6f30-42a7-8b58-dbc07cac4d78',
    codigo_ine : '30303',
    nivel      : 4,
    nombre     : 'COCAPATA',
    latitud    : -16.838027,
    longitud   : -66.630068,
    id_padre   : 'b5493a40-9e24-41b9-8520-e7afe28a3e19'
  },
  {
    id         : '14efc933-9cb9-4d93-bdbe-eec73cd8a61f',
    codigo_ine : '31601',
    nivel      : 4,
    nombre     : 'TIRAQUE',
    latitud    : -17.427384,
    longitud   : -65.72363,
    id_padre   : '21a31a4c-e768-4db3-b122-695c68cc42ad'
  },
  {
    id         : '7e767d5c-3dbc-4a72-8489-e4b2169a44aa',
    codigo_ine : '31602',
    nivel      : 4,
    nombre     : 'SHINAHOTA',
    latitud    : -16.993587,
    longitud   : -65.245342,
    id_padre   : '21a31a4c-e768-4db3-b122-695c68cc42ad'
  },
  {
    id         : 'e1ee5c3c-f175-48f7-b18b-c0b36ef0a5f2',
    codigo_ine : '50201',
    nivel      : 4,
    nombre     : 'UNCÍA',
    latitud    : -18.466473,
    longitud   : -66.568392,
    id_padre   : '7855e124-dc19-499b-8229-4cbac38e9a4f'
  },
  {
    id         : '93beca34-c58c-4074-aad7-56dd2b72b4da',
    codigo_ine : '30302',
    nivel      : 4,
    nombre     : 'MOROCHATA',
    latitud    : -17.23462,
    longitud   : -66.531899,
    id_padre   : 'b5493a40-9e24-41b9-8520-e7afe28a3e19'
  },
  {
    id         : 'be218112-0216-4fcc-a8e1-ac0b447efb76',
    codigo_ine : '20604',
    nivel      : 4,
    nombre     : 'QUIABAYA',
    latitud    : -15.632848,
    longitud   : -68.703182,
    id_padre   : '3f46a3a3-fcd7-42b3-86e5-3fe25db2125e'
  },
  {
    id         : '7d89379d-50a8-4e27-b701-dc4c81c11096',
    codigo_ine : '20901',
    nivel      : 4,
    nombre     : 'LURIBAY',
    latitud    : -17.062512,
    longitud   : -67.661242,
    id_padre   : '62ab5b09-4fa7-4c6f-98d4-0b819e020f33'
  },
  {
    id         : '259b0d44-4533-48f3-a69b-777271fb47ca',
    codigo_ine : '20902',
    nivel      : 4,
    nombre     : 'SAPAHAQUI',
    latitud    : -16.888535,
    longitud   : -67.949628,
    id_padre   : '62ab5b09-4fa7-4c6f-98d4-0b819e020f33'
  },
  {
    id         : 'cbf21e05-2a66-4fe5-8d28-b3bebb4c9d38',
    codigo_ine : '20903',
    nivel      : 4,
    nombre     : 'YACO',
    latitud    : -17.157969,
    longitud   : -67.410693,
    id_padre   : '62ab5b09-4fa7-4c6f-98d4-0b819e020f33'
  },
  {
    id         : '74aa138c-c6ab-406f-827f-e6f94033b4be',
    codigo_ine : '20904',
    nivel      : 4,
    nombre     : 'MALLA',
    latitud    : -17.040112,
    longitud   : -67.450583,
    id_padre   : '62ab5b09-4fa7-4c6f-98d4-0b819e020f33'
  },
  {
    id         : '84e3a956-f3a8-41ca-b1ea-5c2fc3e786df',
    codigo_ine : '21402',
    nivel      : 4,
    nombre     : 'CORIPATA',
    latitud    : -16.314489,
    longitud   : -67.606881,
    id_padre   : '60609363-c275-4554-addb-6c142d786a14'
  },
  {
    id         : '756cbf63-9f7b-4954-8530-d3741c4996bc',
    codigo_ine : '21501',
    nivel      : 4,
    nombre     : 'IXIAMAS',
    latitud    : -13.7678,
    longitud   : -68.125136,
    id_padre   : '7e0b1961-97f3-4e1c-ad0d-fc8e784c7e15'
  },
  {
    id         : 'a8f08988-9a56-4707-96eb-c00d6c6abfee',
    codigo_ine : '21502',
    nivel      : 4,
    nombre     : 'SAN BUENAVENTURA',
    latitud    : -14.43816,
    longitud   : -67.536588,
    id_padre   : '7e0b1961-97f3-4e1c-ad0d-fc8e784c7e15'
  },
  {
    id         : '6b1137c2-dbfd-459c-afa1-0b3e0c840285',
    codigo_ine : '20801',
    nivel      : 4,
    nombre     : 'VIACHA',
    latitud    : -16.653689,
    longitud   : -68.301563,
    id_padre   : 'c2fa6024-1917-4970-baac-6d55ebfa0755'
  },
  {
    id         : 'c9215d3e-8212-4714-b39c-d10424aa1260',
    codigo_ine : '20606',
    nivel      : 4,
    nombre     : 'TIPUANI',
    latitud    : -15.565077,
    longitud   : -68.020798,
    id_padre   : '3f46a3a3-fcd7-42b3-86e5-3fe25db2125e'
  },
  {
    id         : '67f2ea02-a736-4058-a29a-026ce935d9cf',
    codigo_ine : '20702',
    nivel      : 4,
    nombre     : 'PELECHUCO',
    latitud    : -14.820213,
    longitud   : -69.070214,
    id_padre   : 'e78ffcb9-fd74-404a-ac88-877e4692be01'
  },
  {
    id         : '9f66ada1-7872-4648-b223-51f69273e49e',
    codigo_ine : '20607',
    nivel      : 4,
    nombre     : 'MAPIRI',
    latitud    : -15.310308,
    longitud   : -68.226819,
    id_padre   : '3f46a3a3-fcd7-42b3-86e5-3fe25db2125e'
  },
  {
    id         : '9a5a80d8-a5aa-46e5-abf2-ec3153b0f9ba',
    codigo_ine : '21902',
    nivel      : 4,
    nombre     : 'CATACORA',
    latitud    : -17.161012,
    longitud   : -69.48326,
    id_padre   : '8e7045b6-14e1-4656-b68e-e6cec791f51f'
  },
  {
    id         : '801d0f26-d458-4480-9994-df2694cb081f',
    codigo_ine : '40505',
    nivel      : 4,
    nombre     : 'ESMERALDA',
    latitud    : -18.843587,
    longitud   : -68.281274,
    id_padre   : 'f162ef8d-a00e-4195-9fb9-0baaedc694c4'
  },
  {
    id         : '70ba5193-5413-461f-a4f5-f2233d257284',
    codigo_ine : '40602',
    nivel      : 4,
    nombre     : 'PAZA',
    latitud    : -18.599319,
    longitud   : -66.921485,
    id_padre   : '81eaf74c-cfc5-4c40-9044-683f6437b7e4'
  },
  {
    id         : '5b47e551-a87d-470b-83ea-aea667bc8c86',
    codigo_ine : '40701',
    nivel      : 4,
    nombre     : 'VILLA HUANUNI',
    latitud    : -18.287805,
    longitud   : -66.83995,
    id_padre   : 'f56e0f84-7b0f-4875-a12b-860741b17c37'
  },
  {
    id         : 'ed13e4af-43dd-4b55-ab9f-bdc2c5467682',
    codigo_ine : '40702',
    nivel      : 4,
    nombre     : 'MACHACAMARCA',
    latitud    : -18.172474,
    longitud   : -67.021137,
    id_padre   : 'f56e0f84-7b0f-4875-a12b-860741b17c37'
  },
  {
    id         : '984fabbe-7946-420e-940c-f3b07272ccc2',
    codigo_ine : '40802',
    nivel      : 4,
    nombre     : 'PAMPA AULLAGAS',
    latitud    : -19.197092,
    longitud   : -67.062075,
    id_padre   : '31d5cf25-e87d-4854-a187-c8ec4296410f'
  },
  {
    id         : '94c52e77-2c6c-434a-bd7a-6cb3a39ddaa4',
    codigo_ine : '40901',
    nivel      : 4,
    nombre     : 'SABAYA',
    latitud    : -19.015706,
    longitud   : -68.372673,
    id_padre   : '03820917-e853-43af-b7c3-5b660e9f0c2a'
  },
  {
    id         : '210a132a-0848-4eb1-9026-b3ada9679acf',
    codigo_ine : '40902',
    nivel      : 4,
    nombre     : 'COIPASA',
    latitud    : -19.277662,
    longitud   : -68.277712,
    id_padre   : '03820917-e853-43af-b7c3-5b660e9f0c2a'
  },
  {
    id         : '67bf0b1d-dd8b-4674-8cd4-387fdd7c638c',
    codigo_ine : '40903',
    nivel      : 4,
    nombre     : 'CHIPAYA',
    latitud    : -19.04187,
    longitud   : -68.088909,
    id_padre   : '03820917-e853-43af-b7c3-5b660e9f0c2a'
  },
  {
    id         : 'de5ef2a2-ee7f-4cf0-99eb-6463d425a241',
    codigo_ine : '41001',
    nivel      : 4,
    nombre     : 'TOLEDO',
    latitud    : -18.181802,
    longitud   : -67.406997,
    id_padre   : '3c9418b4-ea01-412d-a88c-f26bd97289ae'
  },
  {
    id         : 'fb45b272-3374-4dca-b1bb-c3f56d058ab7',
    codigo_ine : '30404',
    nivel      : 4,
    nombre     : 'SACABAMBA',
    latitud    : -17.811745,
    longitud   : -65.776497,
    id_padre   : 'c2471612-df5c-42a9-a20e-f90fb2e4e9b9'
  },
  {
    id         : '3932814e-559e-4848-8f3c-f32fb3fa1462',
    codigo_ine : '30501',
    nivel      : 4,
    nombre     : 'ARANI',
    latitud    : -17.572769,
    longitud   : -65.770403,
    id_padre   : 'bcf8fb1f-abdf-40a5-bf50-5f11f164b7a3'
  },
  {
    id         : '54014eab-dff4-4e03-9e13-3e58263fa4bd',
    codigo_ine : '30502',
    nivel      : 4,
    nombre     : 'VACAS',
    latitud    : -17.575329,
    longitud   : -65.580254,
    id_padre   : 'bcf8fb1f-abdf-40a5-bf50-5f11f164b7a3'
  },
  {
    id         : 'a105de7e-5c5e-4952-bfc6-71a210972db9',
    codigo_ine : '30601',
    nivel      : 4,
    nombre     : 'ARQUE',
    latitud    : -17.821321,
    longitud   : -66.401753,
    id_padre   : '306e4f22-fc64-45d9-b5d4-6e23758bc529'
  },
  {
    id         : 'c0d3e7e4-c0aa-413f-a04a-fd8658c9a2e9',
    codigo_ine : '30602',
    nivel      : 4,
    nombre     : 'TACOPAYA',
    latitud    : -17.837403,
    longitud   : -66.53466,
    id_padre   : '306e4f22-fc64-45d9-b5d4-6e23758bc529'
  },
  {
    id         : '44da5459-7e90-4b73-8303-346b42a4e517',
    codigo_ine : '30701',
    nivel      : 4,
    nombre     : 'CAPINOTA',
    latitud    : -17.716009,
    longitud   : -66.26304,
    id_padre   : '8e3a573b-6983-4e9c-ac33-14877e56c47b'
  },
  {
    id         : 'b2c00391-6865-4acd-9858-53721b294148',
    codigo_ine : '40501',
    nivel      : 4,
    nombre     : 'HUACHACALLA',
    latitud    : -18.793457,
    longitud   : -68.262261,
    id_padre   : 'f162ef8d-a00e-4195-9fb9-0baaedc694c4'
  },
  {
    id         : '7e27ea61-785f-4723-8f5e-27a00d6ef5bb',
    codigo_ine : '40502',
    nivel      : 4,
    nombre     : 'ESCARA',
    latitud    : -18.859576,
    longitud   : -68.170463,
    id_padre   : 'f162ef8d-a00e-4195-9fb9-0baaedc694c4'
  },
  {
    id         : 'e3175218-b28d-4bcc-a761-751183b32552',
    codigo_ine : '80102',
    nivel      : 4,
    nombre     : 'SAN JAVIER',
    latitud    : -14.599989,
    longitud   : -64.880946,
    id_padre   : '42e69e30-4e07-4023-aacb-f54b878a73a5'
  },
  {
    id         : '722c5725-364b-4c5e-a968-88b8c8b2c3a1',
    codigo_ine : '80201',
    nivel      : 4,
    nombre     : 'RIBERALTA',
    latitud    : -11.001756,
    longitud   : -66.0715,
    id_padre   : 'ff8c1ae9-cbe8-4dc7-9547-21403f71635a'
  },
  {
    id         : 'c92111c9-7725-4973-b927-cde5c0401ff9',
    codigo_ine : '80301',
    nivel      : 4,
    nombre     : 'REYES',
    latitud    : -14.296329,
    longitud   : -67.336181,
    id_padre   : '5d9b3f90-0783-456a-894d-a1153c4f6f1c'
  },
  {
    id         : '21b37c4a-30de-4057-90d2-789306ce02b7',
    codigo_ine : '41501',
    nivel      : 4,
    nombre     : 'LA RIVERA',
    latitud    : -19.004913,
    longitud   : -68.63998,
    id_padre   : 'af0f3ac5-6bf3-419b-8c54-7295be216475'
  },
  {
    id         : 'ebb61e3f-4b67-43fe-a189-ef6061820a62',
    codigo_ine : '51301',
    nivel      : 4,
    nombre     : 'ARAMPAMPA',
    latitud    : -17.874903,
    longitud   : -66.079601,
    id_padre   : '4df71568-49bd-45b9-bb19-13b66db2f18e'
  },
  {
    id         : '03c921de-ca93-4183-bf90-1061a18ed5f2',
    codigo_ine : '51401',
    nivel      : 4,
    nombre     : 'LLICA',
    latitud    : -19.851909,
    longitud   : -68.248138,
    id_padre   : '0b245716-8c87-4509-8658-193d9a46434f'
  },
  {
    id         : '42433627-1bab-4462-ab17-3361b57acf78',
    codigo_ine : '51402',
    nivel      : 4,
    nombre     : 'TAHUA',
    latitud    : -19.889769,
    longitud   : -67.692964,
    id_padre   : '0b245716-8c87-4509-8658-193d9a46434f'
  },
  {
    id         : 'facd1043-9ab5-43d1-b9fa-1f75a4774a0e',
    codigo_ine : '60101',
    nivel      : 4,
    nombre     : 'TARIJA',
    latitud    : -21.531616,
    longitud   : -64.732905,
    id_padre   : 'f1dc5cc4-e65c-41f1-8dd7-2c094b7c401c'
  },
  {
    id         : '64fb97c6-2fd8-49a5-a635-13182652c560',
    codigo_ine : '60201',
    nivel      : 4,
    nombre     : 'PADCAYA',
    latitud    : -21.882231,
    longitud   : -64.709142,
    id_padre   : '186cc123-c391-4bf2-ba2a-556f290f4cc5'
  },
  {
    id         : '9f84f09a-10d8-4bd4-9de4-38ca7491aa7e',
    codigo_ine : '60202',
    nivel      : 4,
    nombre     : 'BERMEJO',
    latitud    : -22.733069,
    longitud   : -64.342461,
    id_padre   : '186cc123-c391-4bf2-ba2a-556f290f4cc5'
  },
  {
    id         : '39adab8c-2158-4967-b197-b0e8b2f23913',
    codigo_ine : '60301',
    nivel      : 4,
    nombre     : 'YACUIBA',
    latitud    : -22.012815,
    longitud   : -63.677477,
    id_padre   : '2203fbbc-5ba4-4a76-ab33-7706e039bc4b'
  },
  {
    id         : 'd2c5a628-9159-491e-9191-8d03afbf88cd',
    codigo_ine : '60303',
    nivel      : 4,
    nombre     : 'VILLAMONTES',
    latitud    : -21.260201,
    longitud   : -63.474853,
    id_padre   : '2203fbbc-5ba4-4a76-ab33-7706e039bc4b'
  },
  {
    id         : '33b363e0-4185-445a-b4e0-86a477c0ee7e',
    codigo_ine : '60501',
    nivel      : 4,
    nombre     : 'VILLA SAN LORENZO',
    latitud    : -21.415305,
    longitud   : -64.748857,
    id_padre   : '40c3e498-f925-4b60-926c-cd93552b5152'
  },
  {
    id         : '755911cc-e34a-4732-8bfc-986187bf8401',
    codigo_ine : '60502',
    nivel      : 4,
    nombre     : 'TOMAYAPO (EL PUENTE)',
    latitud    : -21.231388,
    longitud   : -65.206055,
    id_padre   : '40c3e498-f925-4b60-926c-cd93552b5152'
  },
  {
    id         : 'd3a938bd-216c-44d0-9e5c-fc4523404e8a',
    codigo_ine : '70101',
    nivel      : 4,
    nombre     : 'SANTA CRUZ DE LA SIERRA',
    latitud    : -17.784283,
    longitud   : -63.178917,
    id_padre   : '347d0766-5543-428c-89f6-c70c834b87e4'
  },
  {
    id         : '6aa3eed8-9cc7-4896-8812-1e21bb0ef669',
    codigo_ine : '80101',
    nivel      : 4,
    nombre     : 'TRINIDAD',
    latitud    : -14.835786,
    longitud   : -64.901849,
    id_padre   : '42e69e30-4e07-4023-aacb-f54b878a73a5'
  },
  {
    id         : 'fda384bb-2047-4d67-97f2-b00cc917a88e',
    codigo_ine : '41502',
    nivel      : 4,
    nombre     : 'TODOS SANTOS',
    latitud    : -19.014884,
    longitud   : -68.720562,
    id_padre   : 'af0f3ac5-6bf3-419b-8c54-7295be216475'
  },
  {
    id         : '2ed866e0-e9f8-43b3-970e-d871c5b80c16',
    codigo_ine : '70804',
    nivel      : 4,
    nombre     : 'POSTRER VALLE',
    latitud    : -18.492669,
    longitud   : -63.841323,
    id_padre   : '3d0f8d94-b973-41ee-96dd-4bf9e3194c7d'
  },
  {
    id         : '390f2a82-7f37-4974-974f-ae5c6f17b57a',
    codigo_ine : '70901',
    nivel      : 4,
    nombre     : 'SAMAIPATA',
    latitud    : -18.179048,
    longitud   : -63.87709,
    id_padre   : 'a4612ae5-5e1b-4db5-9597-2bf82cec0bea'
  },
  {
    id         : 'b89a0142-3a3d-4c57-8e51-3dfc2120e649',
    codigo_ine : '70902',
    nivel      : 4,
    nombre     : 'PAMPA GRANDE',
    latitud    : -18.091075,
    longitud   : -64.111168,
    id_padre   : 'a4612ae5-5e1b-4db5-9597-2bf82cec0bea'
  },
  {
    id         : '7092c2ea-633d-4b1c-9a52-ad532f07fb4f',
    codigo_ine : '70903',
    nivel      : 4,
    nombre     : 'MAIRANA',
    latitud    : -18.12141,
    longitud   : -63.958735,
    id_padre   : 'a4612ae5-5e1b-4db5-9597-2bf82cec0bea'
  },
  {
    id         : '8bd5e057-f101-45bd-8cfe-3506b5e4a8fc',
    codigo_ine : '70904',
    nivel      : 4,
    nombre     : 'QUIRUSILLAS',
    latitud    : -18.334814,
    longitud   : -63.947652,
    id_padre   : 'a4612ae5-5e1b-4db5-9597-2bf82cec0bea'
  },
  {
    id         : '06714973-202c-40e6-a12e-d2f72a133b49',
    codigo_ine : '71001',
    nivel      : 4,
    nombre     : 'MONTERO',
    latitud    : -17.341231,
    longitud   : -63.256758,
    id_padre   : 'e01df55d-68f8-4ccd-a657-28d965e98d64'
  },
  {
    id         : '93741789-132f-4afb-bfea-0ce2be8adb5b',
    codigo_ine : '71301',
    nivel      : 4,
    nombre     : 'COMARAPA',
    latitud    : -17.915489,
    longitud   : -64.526923,
    id_padre   : '4a4e34b6-6114-417b-ab49-c33bca864120'
  },
  {
    id         : '1ab4c2a0-e598-4b84-9e2f-ae581c58bf06',
    codigo_ine : '71302',
    nivel      : 4,
    nombre     : 'SAIPINA',
    latitud    : -18.093935,
    longitud   : -64.583878,
    id_padre   : '4a4e34b6-6114-417b-ab49-c33bca864120'
  },
  {
    id         : '254e524e-25e0-47e4-aaca-98785e16aa5b',
    codigo_ine : '71402',
    nivel      : 4,
    nombre     : 'PUERTO QUIJARRO',
    latitud    : -19.005687,
    longitud   : -57.716281,
    id_padre   : 'aac37554-e8cd-46dd-995c-e760dcb4e211'
  },
  {
    id         : '2203bdd5-34f7-404a-9edc-f6ee5b1318bf',
    codigo_ine : '71503',
    nivel      : 4,
    nombre     : 'EL PUENTE',
    latitud    : -16.328627,
    longitud   : -62.910875,
    id_padre   : '01d1955a-5655-45ce-90ee-9febbb08e676'
  },
  {
    id         : '7ffae250-7057-470a-b472-a91f3c74d798',
    codigo_ine : '80302',
    nivel      : 4,
    nombre     : 'SAN BORJA',
    latitud    : -14.858182,
    longitud   : -66.747108,
    id_padre   : '5d9b3f90-0783-456a-894d-a1153c4f6f1c'
  },
  {
    id         : '2367668b-a50a-43cf-b784-84b7338a24fe',
    codigo_ine : '80303',
    nivel      : 4,
    nombre     : 'SANTA ROSA',
    latitud    : -14.079259,
    longitud   : -66.791835,
    id_padre   : '5d9b3f90-0783-456a-894d-a1153c4f6f1c'
  },
  {
    id         : 'f76b760d-2657-4732-a948-4fc7a5b4f3fd',
    codigo_ine : '80501',
    nivel      : 4,
    nombre     : 'SAN IGNACIO',
    latitud    : -14.996354,
    longitud   : -65.637568,
    id_padre   : 'b16c5591-053b-4965-9824-2343f916f55e'
  },
  {
    id         : '1be4cb89-08e8-4c83-948f-c11eb71bc2e1',
    codigo_ine : '71102',
    nivel      : 4,
    nombre     : 'SAN JAVIER',
    latitud    : -16.274156,
    longitud   : -62.504378,
    id_padre   : 'bae72dc1-cf25-4e76-967e-62c00035c371'
  },
  {
    id         : 'c710f175-d066-490b-bcd8-0ff7cd69e377',
    codigo_ine : '71105',
    nivel      : 4,
    nombre     : 'SAN ANTONIO DE LOMERIO',
    latitud    : -16.768524,
    longitud   : -61.809708,
    id_padre   : 'bae72dc1-cf25-4e76-967e-62c00035c371'
  },
  {
    id         : '16523a55-98cb-43ba-9663-ec8045c22a69',
    codigo_ine : '41503',
    nivel      : 4,
    nombre     : 'CARANGAS',
    latitud    : -18.939205,
    longitud   : -68.624299,
    id_padre   : 'af0f3ac5-6bf3-419b-8c54-7295be216475'
  },
  {
    id         : 'b191177f-122d-4812-8179-2402d3508c04',
    codigo_ine : '50202',
    nivel      : 4,
    nombre     : 'CHAYANTA',
    latitud    : -18.461201,
    longitud   : -66.442174,
    id_padre   : '7855e124-dc19-499b-8229-4cbac38e9a4f'
  },
  {
    id         : 'ff6979ad-fc79-47d3-baed-38ae6760db32',
    codigo_ine : '50203',
    nivel      : 4,
    nombre     : 'LLALLAGUA',
    latitud    : -18.423079,
    longitud   : -66.583476,
    id_padre   : '7855e124-dc19-499b-8229-4cbac38e9a4f'
  },
  {
    id         : '4883d776-4b5d-4b73-af18-750e32793e4a',
    codigo_ine : '50301',
    nivel      : 4,
    nombre     : 'BETANZOS',
    latitud    : -19.55289,
    longitud   : -65.452863,
    id_padre   : '68251915-bff5-44fa-94e2-111fc1fc6488'
  },
  {
    id         : 'ed68055f-90f6-4c98-822b-c84999474027',
    codigo_ine : '50303',
    nivel      : 4,
    nombre     : 'TACOBAMBA',
    latitud    : -19.207012,
    longitud   : -65.556472,
    id_padre   : '68251915-bff5-44fa-94e2-111fc1fc6488'
  },
  {
    id         : '86564e3c-3fe8-49f3-ba0f-b3c744ecc44b',
    codigo_ine : '50401',
    nivel      : 4,
    nombre     : 'COLQUECHACA',
    latitud    : -18.697067,
    longitud   : -66.002171,
    id_padre   : '4bbd38e3-3b58-4f93-a40f-2d63ff98c711'
  },
  {
    id         : 'b914fa29-5c99-4640-b9b5-20fa40f5fa9c',
    codigo_ine : '50402',
    nivel      : 4,
    nombre     : 'RAVELO',
    latitud    : -18.80656,
    longitud   : -65.511604,
    id_padre   : '4bbd38e3-3b58-4f93-a40f-2d63ff98c711'
  },
  {
    id         : '99d771c5-2960-4e60-b250-88071c101712',
    codigo_ine : '50403',
    nivel      : 4,
    nombre     : 'POCOATA',
    latitud    : -18.699707,
    longitud   : -66.1617,
    id_padre   : '4bbd38e3-3b58-4f93-a40f-2d63ff98c711'
  },
  {
    id         : '8c8212fa-d7b5-4047-bc8a-577e06fefc2d',
    codigo_ine : '50501',
    nivel      : 4,
    nombre     : 'SAN PEDRO DE BUENA VISTA',
    latitud    : -18.270112,
    longitud   : -65.980138,
    id_padre   : 'dd21b715-d93e-4ac2-9b64-c28358c11ecd'
  },
  {
    id         : 'd58105c9-ad7b-4f28-9317-6b595baae710',
    codigo_ine : '50502',
    nivel      : 4,
    nombre     : 'TORO TORO',
    latitud    : -18.133563,
    longitud   : -65.761326,
    id_padre   : 'dd21b715-d93e-4ac2-9b64-c28358c11ecd'
  },
  {
    id         : '4c6de0ab-2528-4c7c-b241-be3254a62698',
    codigo_ine : '50601',
    nivel      : 4,
    nombre     : 'COTAGAITA',
    latitud    : -20.815551,
    longitud   : -65.658489,
    id_padre   : 'aad0f568-56e0-40bf-929c-0ebcbc4484be'
  },
  {
    id         : '1a015e18-1dee-484d-b0c0-d21637168ebe',
    codigo_ine : '50602',
    nivel      : 4,
    nombre     : 'VITICHI',
    latitud    : -20.207605,
    longitud   : -65.492896,
    id_padre   : 'aad0f568-56e0-40bf-929c-0ebcbc4484be'
  },
  {
    id         : '94a30641-fa23-4fe8-98b7-2587bf2c02c5',
    codigo_ine : '50702',
    nivel      : 4,
    nombre     : 'CARIPUYO',
    latitud    : -18.232225,
    longitud   : -66.472904,
    id_padre   : '821d31cf-c6d5-494f-a749-aa4141272a4a'
  },
  {
    id         : '063cc7d7-785b-49a4-a815-2e8f94ea1227',
    codigo_ine : '50801',
    nivel      : 4,
    nombre     : 'TUPIZA',
    latitud    : -21.441337,
    longitud   : -65.720022,
    id_padre   : '764091c2-0fda-41da-b26b-63331e42c11b'
  },
  {
    id         : 'cdff9395-4e8e-471a-b1e0-fae9b3e4658b',
    codigo_ine : '50802',
    nivel      : 4,
    nombre     : 'ATOCHA',
    latitud    : -20.932225,
    longitud   : -66.219397,
    id_padre   : '764091c2-0fda-41da-b26b-63331e42c11b'
  },
  {
    id         : 'abd9b2b2-a634-424b-98c0-f305dec0ce54',
    codigo_ine : '50902',
    nivel      : 4,
    nombre     : 'SAN PEDRO DE QUEMES',
    latitud    : -20.746503,
    longitud   : -68.048771,
    id_padre   : 'e0a3dbd0-cfad-435f-9231-7f71c9cc2550'
  },
  {
    id         : '4229a7fc-f0b3-48d6-acbf-81d313772498',
    codigo_ine : '51002',
    nivel      : 4,
    nombre     : 'MOJINETE',
    latitud    : -21.765252,
    longitud   : -66.241139,
    id_padre   : '2e11e77c-7fc2-40cd-942b-e6bc6fae91f9'
  },
  {
    id         : 'cecf9dc2-01ee-4c97-8a31-5fe2a5067898',
    codigo_ine : '51201',
    nivel      : 4,
    nombre     : 'UYUNI (THOLA PAMPA)',
    latitud    : -20.460392,
    longitud   : -66.823413,
    id_padre   : '70037016-0254-42c6-9103-77a16a18ba3d'
  },
  {
    id         : '79fd5327-6934-466c-a400-cd889b7c4923',
    codigo_ine : '51202',
    nivel      : 4,
    nombre     : 'TOMAVE',
    latitud    : -20.065034,
    longitud   : -66.531472,
    id_padre   : '70037016-0254-42c6-9103-77a16a18ba3d'
  },
  {
    id         : '8a1399cc-4b6b-4a41-84d6-d30d965ab30d',
    codigo_ine : '80601',
    nivel      : 4,
    nombre     : 'LORETO',
    latitud    : -15.193695,
    longitud   : -64.760255,
    id_padre   : '99853176-d1d7-4ef2-b538-4b0c829f543b'
  },
  {
    id         : '0dceef29-d9b9-4dc9-866a-a21931c809cd',
    codigo_ine : '50204',
    nivel      : 4,
    nombre     : 'CHUQUIHUTA',
    latitud    : -18.591984,
    longitud   : -66.367986,
    id_padre   : '7855e124-dc19-499b-8229-4cbac38e9a4f'
  },
  {
    id         : '54bcaa6b-8195-4827-b702-45774c05ba6b',
    codigo_ine : '40104',
    nivel      : 4,
    nombre     : 'SORACACHI',
    latitud    : -17.817317,
    longitud   : -67.02172,
    id_padre   : '200f23dd-80ed-45bb-9bfe-c012cb6a92b1'
  },
  {
    id         : '486a079d-cc87-45df-8e1e-9d67fde23dba',
    codigo_ine : '51103',
    nivel      : 4,
    nombre     : 'CKOCHAS',
    latitud    : -19.637529,
    longitud   : -65.274821,
    id_padre   : '61b9ab34-98fc-40c8-92bc-9a0d9a5c83a4'
  },
  {
    id         : '5ceeff00-ec4c-4a22-92ec-8c40af100629',
    codigo_ine : '70102',
    nivel      : 4,
    nombre     : 'COTOCA',
    latitud    : -17.754164,
    longitud   : -62.996337,
    id_padre   : '347d0766-5543-428c-89f6-c70c834b87e4'
  },
  {
    id         : 'f390e0d9-2558-4411-ac7d-6a449f426260',
    codigo_ine : '70105',
    nivel      : 4,
    nombre     : 'EL TORNO',
    latitud    : -17.992167,
    longitud   : -63.381734,
    id_padre   : '347d0766-5543-428c-89f6-c70c834b87e4'
  },
  {
    id         : 'c7486a20-90fb-4137-8e08-8a02ea6b11b7',
    codigo_ine : '70303',
    nivel      : 4,
    nombre     : 'SAN RAFAEL',
    latitud    : -16.786975,
    longitud   : -60.67453,
    id_padre   : '3077a855-3dc0-444e-ba26-d1742ba1f18e'
  },
  {
    id         : 'c77d85ae-5a77-488c-baa4-eb02beb3c531',
    codigo_ine : '70401',
    nivel      : 4,
    nombre     : 'BUENA VISTA',
    latitud    : -17.459306,
    longitud   : -63.659923,
    id_padre   : 'd4934d59-dbc2-4dc2-af31-63359a4c5198'
  },
  {
    id         : '983397c9-c292-420f-8aa5-520176c29282',
    codigo_ine : '70602',
    nivel      : 4,
    nombre     : 'SANTA ROSA DEL SARA',
    latitud    : -17.108944,
    longitud   : -63.59871,
    id_padre   : '254bf5b9-4d8b-4a03-ac00-daf44922b9ec'
  },
  {
    id         : '13b32be8-3b85-48e2-a248-a557d3fe3b6e',
    codigo_ine : '70701',
    nivel      : 4,
    nombre     : 'LAGUNILLAS',
    latitud    : -19.650384,
    longitud   : -63.674342,
    id_padre   : '6c06721c-ca0c-492c-9ca7-dcb0145f897d'
  },
  {
    id         : '76577f94-9d68-4bfa-9a65-119923f529a2',
    codigo_ine : '70702',
    nivel      : 4,
    nombre     : 'CHARAGUA',
    latitud    : -19.790933,
    longitud   : -63.198103,
    id_padre   : '6c06721c-ca0c-492c-9ca7-dcb0145f897d'
  },
  {
    id         : '42500196-6a9f-40f5-a5ba-627756843bf2',
    codigo_ine : '70703',
    nivel      : 4,
    nombre     : 'CABEZAS',
    latitud    : -18.789459,
    longitud   : -63.300093,
    id_padre   : '6c06721c-ca0c-492c-9ca7-dcb0145f897d'
  },
  {
    id         : 'ee6fbd37-26c7-467a-8e40-34025fe12f23',
    codigo_ine : '70704',
    nivel      : 4,
    nombre     : 'CUEVO',
    latitud    : -20.454203,
    longitud   : -63.519658,
    id_padre   : '6c06721c-ca0c-492c-9ca7-dcb0145f897d'
  },
  {
    id         : 'cf123686-e29f-48e5-9aa3-23224c02671c',
    codigo_ine : '70706',
    nivel      : 4,
    nombre     : 'CAMIRI',
    latitud    : -20.040155,
    longitud   : -63.521578,
    id_padre   : '6c06721c-ca0c-492c-9ca7-dcb0145f897d'
  },
  {
    id         : 'ecde8c30-f67b-4d38-875e-b19ab6fc0cad',
    codigo_ine : '70402',
    nivel      : 4,
    nombre     : 'SAN CARLOS',
    latitud    : -17.405583,
    longitud   : -63.731563,
    id_padre   : 'd4934d59-dbc2-4dc2-af31-63359a4c5198'
  },
  {
    id         : 'f5fb2f6f-c2e4-4f47-ab64-46dccb061030',
    codigo_ine : '70201',
    nivel      : 4,
    nombre     : 'WARNES',
    latitud    : -17.50908,
    longitud   : -63.164389,
    id_padre   : 'da0fbd4a-3f2d-43f1-800f-8520b4f319f8'
  },
  {
    id         : '916dbd15-728d-4e75-a34d-733f964ad946',
    codigo_ine : '70202',
    nivel      : 4,
    nombre     : 'OKINAWA UNO',
    latitud    : -17.218295,
    longitud   : -62.891874,
    id_padre   : 'da0fbd4a-3f2d-43f1-800f-8520b4f319f8'
  },
  {
    id         : '23917bae-703b-4820-8a51-89624c561f96',
    codigo_ine : '70707',
    nivel      : 4,
    nombre     : 'BOYUIBE',
    latitud    : -20.445309,
    longitud   : -63.280654,
    id_padre   : '6c06721c-ca0c-492c-9ca7-dcb0145f897d'
  },
  {
    id         : 'a4e6e1d3-1d06-43cc-9b6a-d2fc834eb6d6',
    codigo_ine : '70801',
    nivel      : 4,
    nombre     : 'VALLEGRANDE',
    latitud    : -18.488669,
    longitud   : -64.105652,
    id_padre   : '3d0f8d94-b973-41ee-96dd-4bf9e3194c7d'
  },
  {
    id         : '9a8cfb84-b7bb-4841-8eda-3e0152f66c6f',
    codigo_ine : '90104',
    nivel      : 4,
    nombre     : 'BELLA FLOR',
    latitud    : -11.124079,
    longitud   : -67.791538,
    id_padre   : '397f2876-778c-49e3-aed3-ad2157cdff69'
  },
  {
    id         : '642c98d9-267b-40c9-9ef0-9a59ce409506',
    codigo_ine : '90303',
    nivel      : 4,
    nombre     : 'EL SENA',
    latitud    : -11.48295,
    longitud   : -67.245792,
    id_padre   : '770591ac-e92a-43d1-bebe-64ca72be1c2b'
  },
  {
    id         : '229f2ae4-4b1e-47a3-9c20-c7edec8fb8dc',
    codigo_ine : '90401',
    nivel      : 4,
    nombre     : 'SANTA ROSA DEL ABUN',
    latitud    : -10.619876,
    longitud   : -67.447612,
    id_padre   : '24a49e8b-25ca-4dee-b63f-3578079bc874'
  },
  {
    id         : 'ab1f6515-cd4c-4665-b23e-0cb7cfb28ba9',
    codigo_ine : '90501',
    nivel      : 4,
    nombre     : 'NUEVO MANOA (NUEVA ESPERANZA)',
    latitud    : -10.0592,
    longitud   : -65.338572,
    id_padre   : 'd31db96c-2275-4cbc-8ec0-7334a9b99783'
  },
  {
    id         : '78406a48-8d27-4f4e-b612-01889c44c751',
    codigo_ine : '90502',
    nivel      : 4,
    nombre     : 'VILLA NUEVA (LOMA ALTA)',
    latitud    : -10.788186,
    longitud   : -65.965149,
    id_padre   : 'd31db96c-2275-4cbc-8ec0-7334a9b99783'
  },
  {
    id         : 'eba40191-c798-472f-964a-a689a0277716',
    codigo_ine : '90503',
    nivel      : 4,
    nombre     : 'SANTOS MERCADO',
    latitud    : -10.494559,
    longitud   : -66.212238,
    id_padre   : 'd31db96c-2275-4cbc-8ec0-7334a9b99783'
  },
  {
    id         : '736bde2f-2000-4a67-9f7b-874997a601c9',
    codigo_ine : '71502',
    nivel      : 4,
    nombre     : 'URUBICHÁ',
    latitud    : -15.628366,
    longitud   : -63.083725,
    id_padre   : '01d1955a-5655-45ce-90ee-9febbb08e676'
  },
  {
    id         : '521d0c13-ce37-40ec-bb02-d158ac31ff8c',
    codigo_ine : '71104',
    nivel      : 4,
    nombre     : 'SAN JULIÁN',
    latitud    : -16.911787,
    longitud   : -62.617943,
    id_padre   : 'bae72dc1-cf25-4e76-967e-62c00035c371'
  },
  {
    id         : '7175405e-28fb-4b4c-ab6f-706f403b51db',
    codigo_ine : '71103',
    nivel      : 4,
    nombre     : 'SAN RAMÓN',
    latitud    : -16.613612,
    longitud   : -62.500075,
    id_padre   : 'bae72dc1-cf25-4e76-967e-62c00035c371'
  },
  {
    id         : '4199a64a-815b-4664-8f25-1e99d5285fa0',
    codigo_ine : '71101',
    nivel      : 4,
    nombre     : 'CONCEPCIÓN',
    latitud    : -16.134516,
    longitud   : -62.02464,
    id_padre   : 'bae72dc1-cf25-4e76-967e-62c00035c371'
  },
  {
    id         : '80a7a95e-5de9-4034-8c7e-4693dee40068',
    codigo_ine : '20404',
    nivel      : 4,
    nombre     : 'HUMANATA',
    latitud    : -15.463802,
    longitud   : -69.127097,
    id_padre   : 'b6a6c466-54b8-46c8-8990-75eab76ab1c8'
  },
  {
    id         : '7e5db2e6-c483-41ea-9405-096b26e352c3',
    codigo_ine : '20205',
    nivel      : 4,
    nombre     : 'SANTIAGO DE HUATA',
    latitud    : -16.056849,
    longitud   : -68.816623,
    id_padre   : '5160c18e-4ee3-4f78-bcc4-c0d46028e752'
  },
  {
    id         : 'b8664e91-dce2-4ddc-a2fe-429ee17dfb4c',
    codigo_ine : '10704',
    nivel      : 4,
    nombre     : 'VILLA CHARCAS',
    latitud    : -20.724697,
    longitud   : -64.886393,
    id_padre   : '480826e6-cea8-4cbf-8731-a4ecb496518a'
  },
  {
    id         : '15c709af-421e-4598-978d-eeb44f568f06',
    codigo_ine : '20805',
    nivel      : 4,
    nombre     : 'SAN ANDRÉS DE MACHACA',
    latitud    : -16.953402,
    longitud   : -68.968604,
    id_padre   : 'c2fa6024-1917-4970-baac-6d55ebfa0755'
  },
  {
    id         : 'f9eb7aee-ca23-446b-9c32-3dc35a0f7c4b',
    codigo_ine : '20806',
    nivel      : 4,
    nombre     : 'JESÚS DE MACHACA',
    latitud    : -16.744249,
    longitud   : -68.80724,
    id_padre   : 'c2fa6024-1917-4970-baac-6d55ebfa0755'
  },
  {
    id         : '2c14a4b0-9398-44aa-a7af-cf9e15bcdf47',
    codigo_ine : '70603',
    nivel      : 4,
    nombre     : 'COLPA BÉLGICA',
    latitud    : -17.567176,
    longitud   : -63.226501,
    id_padre   : '254bf5b9-4d8b-4a03-ac00-daf44922b9ec'
  },
  {
    id         : '01242a23-d7a0-4cdc-a0c6-0e88e144e7b3',
    codigo_ine : '71003',
    nivel      : 4,
    nombre     : 'MINEROS',
    latitud    : -17.118755,
    longitud   : -63.231328,
    id_padre   : 'e01df55d-68f8-4ccd-a657-28d965e98d64'
  },
  {
    id         : '563c2257-296e-483c-9f12-050256ccad3e',
    codigo_ine : '71005',
    nivel      : 4,
    nombre     : 'SAN PEDRO',
    latitud    : -16.826297,
    longitud   : -63.480974,
    id_padre   : 'e01df55d-68f8-4ccd-a657-28d965e98d64'
  },
  {
    id         : '4c98c0ea-cbbc-4835-b65a-41b5fad6468c',
    codigo_ine : '20608',
    nivel      : 4,
    nombre     : 'TEOPONTE',
    latitud    : -15.495701,
    longitud   : -67.817525,
    id_padre   : '3f46a3a3-fcd7-42b3-86e5-3fe25db2125e'
  },
  {
    id         : 'e9b80ce2-77cb-4bf5-942b-00e807f497e3',
    codigo_ine : '70404',
    nivel      : 4,
    nombre     : 'SAN JUAN',
    latitud    : -17.291375,
    longitud   : -63.849337,
    id_padre   : 'd4934d59-dbc2-4dc2-af31-63359a4c5198'
  },
  {
    id         : '8cb74af8-6d9d-4649-a2b0-0aef1abcca9a',
    codigo_ine : '31206',
    nivel      : 4,
    nombre     : 'ENTRE RÍOS (BULO BULO)',
    latitud    : -17.26,
    longitud   : -64.348378,
    id_padre   : '031903c3-5b81-49e6-ba1b-2a2c24d91f68'
  },
  {
    id         : 'dd18b2cd-e4ef-42ca-ae57-6bee9d3c9b98',
    codigo_ine : '20204',
    nivel      : 4,
    nombre     : 'HUARINA',
    latitud    : -16.190738,
    longitud   : -68.601591,
    id_padre   : '5160c18e-4ee3-4f78-bcc4-c0d46028e752'
  },
  {
    id         : '3aab2f2f-9500-4c15-a89a-7f7ff6688b58',
    codigo_ine : '10703',
    nivel      : 4,
    nombre     : 'INCAHUASI',
    latitud    : -20.7837,
    longitud   : -64.867333,
    id_padre   : '480826e6-cea8-4cbf-8731-a4ecb496518a'
  },
  {
    id         : 'cd57646a-e3ad-44bf-871b-c6cf070a052a',
    codigo_ine : '22002',
    nivel      : 4,
    nombre     : 'ALTO BENI',
    latitud    : -15.545243,
    longitud   : -67.449711,
    id_padre   : '25ddecc0-b45d-4185-86e8-88ef17441961'
  },
  {
    id         : '34e7cb13-3da5-48ab-a682-0b88e1066057',
    codigo_ine : '20203',
    nivel      : 4,
    nombre     : 'CHÚA COCANI',
    latitud    : -16.193457,
    longitud   : -68.748862,
    id_padre   : '5160c18e-4ee3-4f78-bcc4-c0d46028e752'
  },
  {
    id         : 'f120d1a4-10f8-4a09-b817-47718c6d802d',
    codigo_ine : '20206',
    nivel      : 4,
    nombre     : 'HUATAJATA',
    latitud    : -16.210442,
    longitud   : -68.696954,
    id_padre   : '5160c18e-4ee3-4f78-bcc4-c0d46028e752'
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
