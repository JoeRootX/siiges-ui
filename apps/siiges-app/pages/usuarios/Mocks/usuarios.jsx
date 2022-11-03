import React from 'react';
import { ActionButtons } from '@siiges-ui/shared';

const columns = [
  { field: 'usuario', headerName: 'Usuario', width: 200 },
  { field: 'correo', headerName: 'Correo', width: 250 },
  { field: 'rol', headerName: 'Rol', width: 180 },
  {
    field: 'createdAt',
    headerName: 'Fecha',
    type: 'date',
    width: 180,
  },
  { field: 'estatus', headerName: 'Estatus', width: 150 },
  {
    field: 'actions',
    headerName: 'Acciones',
    width: 150,
    renderCell: (params) => (
      <ActionButtons
        id={params.id}
        consultar="/usuarios/editarUsuario"
        editar={`/usuarios/editarUsuario/${params.id}`}
      />
    ),
    sortable: false,
    filterable: false,
  },
];

const rows = [
  {
    id: 1,
    user: 'Jon Snow',
    email: 'juannieves@gmail.com',
    rol: 'jefe',
    date: '15/05/2005',
    status: 'Muerto',
    actions: 'iconos',
  },
  {
    id: 2,
    user: 'Cersei Lannister',
    email: 'cerseilannister@gmail.com',
    rol: 'usuario',
    date: '15/05/2005',
    status: 'Muerto',
    actions: 'iconos',
  },
  {
    id: 3,
    user: 'Jaime Lannister',
    email: 'jaimelannister@gmail.com',
    rol: 'usuario',
    date: '15/05/2005',
    status: 'Muerto',
    actions: 'iconos',
  },
  {
    id: 4,
    user: 'Arya Stark',
    email: 'aryastark@gmail.com',
    rol: 'usuario',
    date: '15/05/2005',
    status: 'Muerto',
    actions: 'iconos',
  },
  {
    id: 5,
    user: 'Daenerys Targaryen',
    email: 'daenerystargaryen@gmail.com',
    rol: 'usuario',
    date: '15/05/2005',
    status: 'Muerto',
    actions: 'iconos',
  },
  {
    id: 6,
    user: 'Melisandre',
    email: 'melisandre@gmail.com',
    rol: 'usuario',
    date: '15/05/2005',
    status: 'Muerto',
    actions: 'iconos',
  },
  {
    id: 7,
    user: 'Ferrara Clifford',
    email: 'ferraraclifford@gmail.com',
    rol: 'usuario',
    date: '15/05/2005',
    status: 'Muerto',
    actions: 'iconos',
  },
  {
    id: 8,
    user: 'Rossini Frances',
    email: 'rossinifrances@gmail.com',
    rol: 'usuario',
    date: '15/05/2005',
    status: 'Muerto',
    actions: 'iconos',
  },
  {
    id: 9,
    user: 'Harvey Roxie',
    email: 'harveyroxie@gmail.com',
    rol: 'usuario',
    date: '15/05/2005',
    status: 'Muerto',
    actions: 'iconos',
  },
];

export { rows, columns };
