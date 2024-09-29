'use strict';

const constants = {
  ID_PROCESO_LGI                  : '9b49b99c-01ea-47d7-bd8a-42d46d8dc530',
  ID_DELITO_LGI                   : '482e5b57-65e2-4fa0-bf2c-f91c03383657',
  ID_DELITO_FT                    : '92016e05-98dd-402b-9f15-6e6c12290069',
  ID_TIPO_PARTICIPANTE_DENUNCIADO : '4ae54d6b-8abb-4c33-9a7c-832dc12e4e02',
  BIENES_CAUTELADOS               : {
    CASAS: [
      '696420e7-c8d8-4cdd-9a54-edc5eae471f7',
      'b0ea673c-3900-4cd5-a58c-9787c7e7245e',
      '492b90be-2c25-4372-b780-e7cbf260f238',
      '4eb757f8-07de-46c0-8a47-0908e6d3c57d',
      '70ba632f-edb6-494b-bb71-32a7c8304d3e'
    ],
    VEHICULOS_TERRESTRES: [
      '71b7ea4f-d75b-418a-a02a-ac83b444196b',
      '8631d488-9331-446c-a334-4be5476cbcfe',
      '8e31f21e-44fc-4cee-a987-0500d6b1ca39'
    ],
    VEHICULOS_AEREOS    : ['c0faced0-31ad-4b29-a1ce-f9a892a41317'],
    VEHICULOS_FLUVIALES : ['ef4a7924-c508-44f1-9681-133daa769ba1'],
    OTROS_BIENES        : [
      '63ce15dd-7d13-43a0-b486-89aaef93695c',
      'f5b4a98e-fcfe-4670-ac97-95222dd00831'
    ],
    DINEROS_USD             : ['08f147d9-0b1c-4e37-a0c2-3ae61bd60861'],
    DINEROS_BS              : ['d4ae9fdd-dda1-4b02-a20f-6f4611bd2965'],
    OTROS_DINEROS           : ['72825919-cf4f-48bc-977c-2d960e254888'],
    TODOS_BIENES_CAUTELADOS : [
      '696420e7-c8d8-4cdd-9a54-edc5eae471f7',
      'b0ea673c-3900-4cd5-a58c-9787c7e7245e',
      '492b90be-2c25-4372-b780-e7cbf260f238',
      '4eb757f8-07de-46c0-8a47-0908e6d3c57d',
      '70ba632f-edb6-494b-bb71-32a7c8304d3e',
      '71b7ea4f-d75b-418a-a02a-ac83b444196b',
      '8631d488-9331-446c-a334-4be5476cbcfe',
      '8e31f21e-44fc-4cee-a987-0500d6b1ca39',
      'c0faced0-31ad-4b29-a1ce-f9a892a41317',
      'ef4a7924-c508-44f1-9681-133daa769ba1',
      '63ce15dd-7d13-43a0-b486-89aaef93695c',
      'f5b4a98e-fcfe-4670-ac97-95222dd00831',
      'd4ae9fdd-dda1-4b02-a20f-6f4611bd2965',
      '08f147d9-0b1c-4e37-a0c2-3ae61bd60861',
      '72825919-cf4f-48bc-977c-2d960e254888'
    ]
  },
  SITUACION_JURIDICA: {
    SENTENCIA: [
      'cd1fdfb6-2660-4d53-ac0a-7d5256e31f01',
      '831d4337-f15f-43d9-ab58-a169a00e74b4'
    ],
    ABSOLUTORIA  : ['cd1fdfb6-2660-4d53-ac0a-7d5256e31f01'],
    CONDENATORIA : ['831d4337-f15f-43d9-ab58-a169a00e74b4'],
    MIXTA        : ['0e161261-8407-48f1-b45b-83a7a5f144fe'],
    EJECUTORIA   : [
      '1972ae0a-ec93-4a91-8ee4-fc9770ae6ac5',
      '588afa37-c045-4f46-9d9b-47dbd1c6c17e'
    ]
  },
  BIENES_DECOMISADOS: {
    CASAS: [
      '231efa3b-64cd-487e-acd7-ac14160d6084',
      '76b2fc07-2d2c-414d-b1b0-39f0f8f005b1',
      '19d7fe6d-c6ed-4d57-93f9-0d47160f00e1',
      '5cf0b4c0-d137-4473-96ea-418936297f44',
      'd31b3630-2de0-4e33-8857-03759064bfab'
    ],
    VEHICULOS_TERRESTRES: [
      'c401a7e2-3ec9-415f-9890-8201c1053ccb',
      '699d613a-e555-4c1d-adf4-b05cfeecc338',
      '66003700-8656-415d-9c78-55edf479fec7'
    ],
    VEHICULOS_AEREOS    : ['b7a19dcf-0db9-4fea-b387-daab78fd40d8'],
    VEHICULOS_FLUVIALES : ['e4e690d6-84f2-45cc-bfa6-73ca89a47977'],
    OTROS_BIENES        : [
      'e9a82a29-dfde-4fdf-ae03-bbc488af40cf',
      'a1fb4ab8-9f75-42d6-8208-b9573508f9d2'
    ],
    DINEROS_USD              : ['08f147d9-0b1c-4e37-a0c2-3ae61bd60861'],
    DINEROS_BS               : ['d4ae9fdd-dda1-4b02-a20f-6f4611bd2965'],
    OTROS_DINEROS            : ['72825919-cf4f-48bc-977c-2d960e254888'],
    TODOS_BIENES_DECOMISADOS : [
      '231efa3b-64cd-487e-acd7-ac14160d6084',
      '76b2fc07-2d2c-414d-b1b0-39f0f8f005b1',
      '19d7fe6d-c6ed-4d57-93f9-0d47160f00e1',
      '5cf0b4c0-d137-4473-96ea-418936297f44',
      'd31b3630-2de0-4e33-8857-03759064bfab',
      'a1fb4ab8-9f75-42d6-8208-b9573508f9d2',
      'c401a7e2-3ec9-415f-9890-8201c1053ccb',
      '699d613a-e555-4c1d-adf4-b05cfeecc338',
      'e4e690d6-84f2-45cc-bfa6-73ca89a47977',
      'b7a19dcf-0db9-4fea-b387-daab78fd40d8',
      '66003700-8656-415d-9c78-55edf479fec7',
      'e9a82a29-dfde-4fdf-ae03-bbc488af40cf',
      'd4ae9fdd-dda1-4b02-a20f-6f4611bd2965',
      '08f147d9-0b1c-4e37-a0c2-3ae61bd60861',
      '72825919-cf4f-48bc-977c-2d960e254888'
    ]
  },
  BIENES_CONFISCADOS: {
    CASAS: [
      'b610849b-0796-4e4d-b788-88af03e9b84a',
      '519e0a19-c3e6-45ac-b221-67d1db3b57d2',
      '12f43a01-ae0c-4ea0-b26b-2af22ba74653',
      '2f47d08a-6991-4107-9233-ba1557c9de89',
      '99115416-50ee-49f9-bbcc-1771e4756bfc'
    ],
    VEHICULOS_TERRESTRES: [
      'c1f81319-3df6-47ad-a09c-091a1a7d0957',
      'b7c505f0-d3f2-4353-9456-c11d57cc7468',
      '51a03e97-f34a-4671-a0c2-499f8c8e06b1'
    ],
    VEHICULOS_AEREOS    : ['b2d42dfe-908e-4d40-ac72-f7c7f9fc97de'],
    VEHICULOS_FLUVIALES : ['c4fdfc59-ade2-4b0a-9420-3394147c7bea'],
    OTROS_BIENES        : [
      '0a06f9e9-fcf3-4ca0-91e8-ece897e09a5b',
      '3a2ffe78-9a7d-4f1a-a5e2-ffdb1304cd0c'
    ],
    DINEROS_USD              : ['08f147d9-0b1c-4e37-a0c2-3ae61bd60861'],
    DINEROS_BS               : ['d4ae9fdd-dda1-4b02-a20f-6f4611bd2965'],
    OTROS_DINEROS            : ['72825919-cf4f-48bc-977c-2d960e254888'],
    TODOS_BIENES_CONFISCADOS : [
      'b610849b-0796-4e4d-b788-88af03e9b84a',
      '519e0a19-c3e6-45ac-b221-67d1db3b57d2',
      '12f43a01-ae0c-4ea0-b26b-2af22ba74653',
      '2f47d08a-6991-4107-9233-ba1557c9de89',
      '99115416-50ee-49f9-bbcc-1771e4756bfc',
      '0a06f9e9-fcf3-4ca0-91e8-ece897e09a5b',
      'c1f81319-3df6-47ad-a09c-091a1a7d0957',
      'b7c505f0-d3f2-4353-9456-c11d57cc7468',
      'c4fdfc59-ade2-4b0a-9420-3394147c7bea',
      'b2d42dfe-908e-4d40-ac72-f7c7f9fc97de',
      '51a03e97-f34a-4671-a0c2-499f8c8e06b1',
      '3a2ffe78-9a7d-4f1a-a5e2-ffdb1304cd0c',
      '08f147d9-0b1c-4e37-a0c2-3ae61bd60861',
      'd4ae9fdd-dda1-4b02-a20f-6f4611bd2965',
      '72825919-cf4f-48bc-977c-2d960e254888'
    ]
  },
  BIENES_INCAUTADOS: {
    CASAS: [
      '5145cae0-0905-4a17-a198-80dcc209b8d9',
      'cbbefcc3-add6-4ebb-b9b3-344b7ebb5a46',
      '4a771e6c-8100-4787-8a86-ea0f1f6866e1',
      'b27cab1b-8daf-4324-a74d-c4749a9546bc',
      '5ec2c2b2-5b79-4f41-afef-634a3eb41f87'
    ],
    VEHICULOS_TERRESTRES: [
      '9d0086ce-f4d7-4e8a-baf3-467bfe9c3e92',
      'abe71663-2657-46e2-b644-a97c23ef7aa8',
      '20a5f0c0-2c2d-4ab0-a31b-210e76b6a36e'
    ],
    VEHICULOS_AEREOS    : ['236e3283-866a-4b3b-ba91-55e4f54cdcd7'],
    VEHICULOS_FLUVIALES : ['a2c25040-5cab-4e2d-ae23-8e54629d46f4'],
    OTROS_BIENES        : [
      '8225abc5-c669-4296-9466-92c80d3e9aa4',
      '948841fc-eab9-48db-aa50-0bf9fb8f4c7b'
    ],
    DINEROS_USD             : ['08f147d9-0b1c-4e37-a0c2-3ae61bd60861'],
    DINEROS_BS              : ['d4ae9fdd-dda1-4b02-a20f-6f4611bd2965'],
    OTROS_DINEROS           : ['72825919-cf4f-48bc-977c-2d960e254888'],
    TODOS_BIENES_INCAUTADOS : [
      '5145cae0-0905-4a17-a198-80dcc209b8d9',
      'cbbefcc3-add6-4ebb-b9b3-344b7ebb5a46',
      '4a771e6c-8100-4787-8a86-ea0f1f6866e1',
      'b27cab1b-8daf-4324-a74d-c4749a9546bc',
      '5ec2c2b2-5b79-4f41-afef-634a3eb41f87',
      '8225abc5-c669-4296-9466-92c80d3e9aa4',
      '9d0086ce-f4d7-4e8a-baf3-467bfe9c3e92',
      'abe71663-2657-46e2-b644-a97c23ef7aa8',
      'a2c25040-5cab-4e2d-ae23-8e54629d46f4',
      '236e3283-866a-4b3b-ba91-55e4f54cdcd7',
      '20a5f0c0-2c2d-4ab0-a31b-210e76b6a36e',
      '948841fc-eab9-48db-aa50-0bf9fb8f4c7b',
      '08f147d9-0b1c-4e37-a0c2-3ae61bd60861',
      'd4ae9fdd-dda1-4b02-a20f-6f4611bd2965',
      '72825919-cf4f-48bc-977c-2d960e254888'
    ]
  },
  FORMULARIOS_SEPDAVI: {
    ABOGADO: {
      form1: '0610fa61-1f63-4ddb-9ca9-cfdfb6fd6d83',
      form2: '9816e660-5639-4423-b99f-346a2d1b826d'
    },
    PSICOLOGIA: {
      form1: '',
      form2: '9816e660-5639-4423-b99f-346a2d1b826d'
    },
    TRABAJO: {
      form1: '',
      form2: '9816e660-5639-4423-b99f-346a2d1b826d'
    }
  },
  // local
  ROLES_ID: {
    VENTANILLA: 'cfa08601-6d33-4675-8f5d-534c2410ceeb',
    ABOGADO: '0d7ee459-3a1a-4c63-a89b-180d04c52a6c',
    PSICOLOGIA: '4750308f-4941-43a3-beff-80179b50d9e1',
    SOCIAL: '2b9aaaa5-7e7d-4a66-8b46-9a4950ae493b',
  },
  // test
  /* ROLES_ID: {
    ABOGADO: '73618e29-b4c8-4b43-b892-368a0da8cd9b',
    PSICOLOGIA: '61ad152f-230a-4461-bc1e-99dff6122275',
    SOCIAL: '8b2dd681-ccfc-4924-a3c9-084f52125996',
  }, */
  // test
  /* DATOS_SAJ: {
    TOKEN_SAJ: '',
    //URL_SAJ: 'https://test.saj.justicia.gob.bo/backend/api/public/'
    URL_SAJ: 'http://172.16.1.174/backend/api/public/'
  }, */
  DATOS_SAJ: {
    TOKEN_SAJ: '',
    URL_SAJ: 'https://redsaj.justicia.gob.bo/backend/api/public/'
    //URL_SAJ: 'http://172.16.1.174/backend/api/public/'
  },
  PARTICIPANTES: {
    ID_TIPO_DENUNCIADO: '00f7ba7a-6954-4fa9-95dd-7a38e2409c5d'
  },
  TIPOPROCESO: {
    IDPROCESOSLIM: '1e00fe13-1c41-4219-873b-6771bf1836e4',
    IDPROCESODEFENSORIA: '0a190c5a-c5b7-47d1-9bad-faef5f8689d2'
  },
  REPORTEEXCEL: {
    ORIENTACION: 'ORIENTACION',
    PSICOLOGIA: 'PSICOLOGIA',
    SOCIAL: 'SOCIAL',
    PATROCINIO: 'PATROCINIO'
  },
  ETAPASEGUIMIENTO: {
    ETAPA_ORIENTACION: 'ORIENTACIÓN',
    ETAPA_PSICOLOGIA: 'PSICOLOGÍA',
    ETAPA_SOCIAL: 'TRABAJO SOCIAL',
    ETAPA_PATROCINIO: 'PATROCINIO'
  }
};

module.exports = constants;
