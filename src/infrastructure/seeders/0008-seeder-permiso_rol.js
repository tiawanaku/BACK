'use strict';

const {
  setTimestampsSeeder
} = require('../lib/util');

// Datos de producción
let items = [
  { id: '6e019ca9-1350-4c30-b431-6a4bf5bf8f96', id_rol: '88b0104c-1bd1-42b2-bb01-9bf0502bab5a', id_permiso: '7f5b3565-b270-4c16-b957-1b1ac3aaa04d' },
  { id: '8986c250-68b6-4870-b59b-121fc03bab7c', id_rol: '88b0104c-1bd1-42b2-bb01-9bf0502bab5a', id_permiso: 'e73a95a7-7eb6-4b73-bea1-8bd551e71093' },
  { id: '2583d10d-14f1-4178-b878-74dd78dabda1', id_rol: '88b0104c-1bd1-42b2-bb01-9bf0502bab5a', id_permiso: '0fba0566-6db3-4e65-984d-e42a945a12d2' },
  { id: 'ba20dcaf-dda9-43f8-89bd-f87350bb2182', id_rol: '88b0104c-1bd1-42b2-bb01-9bf0502bab5a', id_permiso: '0c1289e5-1870-4135-8217-0e2ec2b75e81' },
  { id: '2ad20f38-080b-41d1-991e-cb408e921188', id_rol: '88b0104c-1bd1-42b2-bb01-9bf0502bab5a', id_permiso: '6e3f26a6-e681-4304-8fcb-2e0b6b269ce7' },
  { id: 'ca13de7d-5231-4872-a0f0-cade3bc7ae3d', id_rol: '88b0104c-1bd1-42b2-bb01-9bf0502bab5a', id_permiso: 'f1d548ae-7a9d-4159-aace-48a00b997299' },
  { id: 'e8349cf0-4741-409d-a0c3-4250d02731ee', id_rol: '88b0104c-1bd1-42b2-bb01-9bf0502bab5a', id_permiso: '8b83d19d-563c-43a8-b073-131d0256ee9f' },
  { id: 'c0127276-3b96-4c13-9dd0-c3130b4f1e4a', id_rol: '88b0104c-1bd1-42b2-bb01-9bf0502bab5a', id_permiso: '6dbe5edc-7075-4554-8f8f-ec33081c8fe8' },
  { id: 'fd3acf01-2f67-4c0e-8ba2-436b1dd8b274', id_rol: '88b0104c-1bd1-42b2-bb01-9bf0502bab5a', id_permiso: '86f561eb-4c3c-445d-a460-bd7646323b3d' },
  { id: 'f9e7d502-fdf8-40b7-90c8-505cbadf0a5d', id_rol: '88b0104c-1bd1-42b2-bb01-9bf0502bab5a', id_permiso: '0a0d00d4-5deb-4fd9-b8bd-02f526f1a3eb' },
  { id: '6a40205c-7b1d-4202-a26f-c64d68e15e40', id_rol: '88b0104c-1bd1-42b2-bb01-9bf0502bab5a', id_permiso: '76d904bd-ee07-4732-b5df-0d9bd9efb744' },
  { id: '2602fc8e-3f44-41b1-a96d-dc52f9056e5d', id_rol: '88b0104c-1bd1-42b2-bb01-9bf0502bab5a', id_permiso: '0afc4b37-1594-44e1-98d7-c9f47dd2672c' },
  { id: '17616037-fd3d-4ee8-8bf6-d44eb040b18a', id_rol: '88b0104c-1bd1-42b2-bb01-9bf0502bab5a', id_permiso: 'bcfed14e-2405-4e25-ac63-61e348e1c2c0' },
  { id: 'f7d5e0e7-a055-4e2a-ab29-9a93f98ea6dd', id_rol: '88b0104c-1bd1-42b2-bb01-9bf0502bab5a', id_permiso: '15ff0e86-45f5-4b84-88ff-77461bccf7bc' },
  { id: 'd6c4f26c-91d0-46ae-a669-551d44cf6ef9', id_rol: '88b0104c-1bd1-42b2-bb01-9bf0502bab5a', id_permiso: '9b764e5c-7f65-4cfc-9741-b84d47ebfeb3' },
  { id: '67957bb7-c671-4dff-aee7-8c380c49267e', id_rol: '88b0104c-1bd1-42b2-bb01-9bf0502bab5a', id_permiso: 'fb2aca8a-6257-4ef1-a435-5ed131d702f9' },
  { id: '7aadda2d-5603-4a9a-b7a5-044d2e6c92be', id_rol: '88b0104c-1bd1-42b2-bb01-9bf0502bab5a', id_permiso: '22067709-ce42-4926-89e6-8ce2dc52e193' },
  { id: 'cdb321e8-c93d-4598-9f9b-f9fc671b311d', id_rol: '88b0104c-1bd1-42b2-bb01-9bf0502bab5a', id_permiso: '5a064635-3084-42c5-ab38-d74588932b3c' },
  { id: '618077de-c0cc-4449-9c58-d5e4005132e7', id_rol: '88b0104c-1bd1-42b2-bb01-9bf0502bab5a', id_permiso: 'a6aec23e-bdbf-4cf7-a97e-fceb3a0c782d' },
  { id: '78d614ac-1d56-4623-a9b4-8e13959e52ae', id_rol: '88b0104c-1bd1-42b2-bb01-9bf0502bab5a', id_permiso: '56c2756b-63c4-4c1f-bf1d-d3b5c604eca6' },
  { id: '0fccdba4-4678-4794-89f9-a94e52eea4f2', id_rol: '88b0104c-1bd1-42b2-bb01-9bf0502bab5a', id_permiso: '3ee48c68-fb87-4a22-a4cc-47ce4b2bc6c6' },
  { id: 'cd7c992f-7c4a-4e32-9eb6-b4ae73f5c45a', id_rol: '88b0104c-1bd1-42b2-bb01-9bf0502bab5a', id_permiso: '743d712b-4904-489f-92ee-6ae6e9f6b1d7' },
  { id: '56b175d6-f937-48d8-a0d7-26e391aabbe9', id_rol: '88b0104c-1bd1-42b2-bb01-9bf0502bab5a', id_permiso: 'b0b7e8be-0a7a-4ef9-bf16-bc9f1a687867' },
  { id: '2b46866c-3b22-4491-be92-d4d053b3d79f', id_rol: '88b0104c-1bd1-42b2-bb01-9bf0502bab5a', id_permiso: '959800a3-b744-4ffe-99e6-afaf33eb3ad3' },
  { id: 'f7f2d9f1-84b0-460d-9ae6-11e7002facfc', id_rol: '88b0104c-1bd1-42b2-bb01-9bf0502bab5a', id_permiso: '4cef1f8f-0672-46eb-aaf9-1bf6bb19af4b' },
  { id: '8eb256ba-e51a-4196-8520-d7f19b87692b', id_rol: '88b0104c-1bd1-42b2-bb01-9bf0502bab5a', id_permiso: 'cd2e8e5a-11b1-4f38-ae5c-b0858e6461ec' },
  { id: '0d6911fe-c499-44bf-ad40-e573c7f890ed', id_rol: '88b0104c-1bd1-42b2-bb01-9bf0502bab5a', id_permiso: '4c6baaa4-2bb4-42ca-a487-ddf2da1b052a' },
  { id: 'c9078282-b791-4235-b079-5e84ce462042', id_rol: '88b0104c-1bd1-42b2-bb01-9bf0502bab5a', id_permiso: 'c7e71c1d-aae4-4384-9b12-c5312a1bf32d' },
  { id: '5a74cc45-9d2e-4057-bc99-d813e79930fd', id_rol: '88b0104c-1bd1-42b2-bb01-9bf0502bab5a', id_permiso: 'cb921d03-a8ed-46d1-8cfa-7f881bba0c17' },
  { id: '67cff942-3895-4296-b763-8d5f4a7cf730', id_rol: '88b0104c-1bd1-42b2-bb01-9bf0502bab5a', id_permiso: '69467c92-06e4-4cb5-8e81-a8d7fb9faab8' },
  { id: 'fb142a71-e7f7-4378-8d85-1d2a21014698', id_rol: '88b0104c-1bd1-42b2-bb01-9bf0502bab5a', id_permiso: '62fff69d-a5a7-46a9-928f-8db80fb2ff53' },

  { id: '096bd4c6-dd54-4a9f-ade2-918619898be2', id_rol: '88b0104c-1bd1-42b2-bb01-9bf0502bab5a', id_permiso: '6bf6c07f-ab1c-46be-9465-659879ce330a' },
  { id: 'd99a61fa-9ee2-4364-bd1b-79656f34f099', id_rol: '88b0104c-1bd1-42b2-bb01-9bf0502bab5a', id_permiso: 'e4c3cbc2-3944-4e11-84aa-ab54e44c4626' }

];

items = setTimestampsSeeder(items);

module.exports = {
  up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('sys_rol_permiso', items, {})
      .then(async () => {})
      .catch(error => {
        if (error.message.indexOf('already exists') > -1) return;
        console.error(error);
      });
  },
  down (queryInterface, Sequelize) {}
};
