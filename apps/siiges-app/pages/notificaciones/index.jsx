import React, { useContext, useEffect, useState } from 'react';
import { Layout, DataTable, Context, DefaultModal, getData } from '@siiges-ui/shared';
import { Divider, IconButton, Typography, Grid, CircularProgress } from '@mui/material';
import ListAltIcon from '@mui/icons-material/ListAlt';

function ModalState() {
  const [modal, setModal] = useState(false);
  const [modalId, setModalId] = useState(null);
  const [modalData, setModalData] = useState(null);
  const [loading, setLoading] = useState(false);

  const showModal = async (id) => {
    setModalId(id);
    setModal(true);
    setLoading(true);

    // Obtener los detalles de la notificación
    const response = await getData({ endpoint: `/notificaciones/${id}` });
    if (response.statusCode === 200) {
      setModalData(response.data);
    }
    setLoading(false);
  };

  const hideModal = () => {
    setModal(false);
    setModalId(null);
    setModalData(null);
  };

  return {
    modal,
    showModal,
    hideModal,
    modalId,
    modalData,
    loading,
  };
}

export default function Notificaciones() {
  const { session } = useContext(Context);
  const { rol } = session;
  const [rows, setRows] = useState([]);

  const {
    modal, showModal, hideModal, modalData, loading,
  } = ModalState();

  useEffect(() => {
    const fetchNotificaciones = async () => {
      const response = await getData({ endpoint: '/notificaciones' });
      if (response.statusCode === 200) {
        const formattedRows = response.data.map((notificacion) => ({
          id: notificacion.id,
          asunto: notificacion.asunto,
          notificacion: notificacion.template,
          estatus: notificacion.status,
          ...(rol === 'admin' && {
            usuario: `${notificacion.usuario.persona.nombre} ${notificacion.usuario.persona.apellidoPaterno} ${notificacion.usuario.persona.apellidoMaterno}`,
            email: `${notificacion.usuario.correo}`,
          }),
        }));

        setRows(formattedRows);
      }
    };

    fetchNotificaciones();
  }, [rol]);

  const commonColumns = [
    { field: 'asunto', headerName: 'Asunto', width: 300 },
    { field: 'notificacion', headerName: 'Notificación', width: 650 },
    {
      field: 'actions',
      headerName: 'Acciones',
      width: 150,
      renderCell: (params) => (
        <IconButton aria-label="consultar" onClick={() => showModal(params.id)}>
          <ListAltIcon />
        </IconButton>
      ),
    },
  ];

  const adminColumns = [
    { field: 'usuario', headerName: 'Usuario', width: 230 },
    { field: 'email', headerName: 'Correo electrónico', width: 200 },
    { field: 'asunto', headerName: 'Asunto', width: 150 },
    { field: 'notificacion', headerName: 'Notificación', width: 300 },
    { field: 'estatus', headerName: 'Estatus', width: 110 },
    {
      field: 'actions',
      headerName: 'Acciones',
      width: 110,
      renderCell: (params) => (
        <IconButton aria-label="consultar" onClick={() => showModal(params.id)}>
          <ListAltIcon />
        </IconButton>
      ),
    },
  ];

  return (
    <Layout title="Notificaciones">
      <Divider sx={{ mt: 2 }} />
      <DataTable rows={rows} columns={rol === 'admin' ? adminColumns : commonColumns} />
      <DefaultModal open={modal} setOpen={hideModal} title="Detalles de la Notificación">
        {loading ? (
          <CircularProgress />
        ) : (
          modalData && (
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="h6">{`Asunto: ${modalData.asunto}`}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6">{`Notificación: ${modalData.data}`}</Typography>
              </Grid>
            </Grid>
          )
        )}
      </DefaultModal>
    </Layout>
  );
}
