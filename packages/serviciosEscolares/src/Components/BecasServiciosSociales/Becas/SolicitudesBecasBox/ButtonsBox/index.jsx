import React, { useState } from 'react';
import { Grid, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { ButtonsForm, ButtonSimple, DefaultModal } from '@siiges-ui/shared';

export default function ButtonsFolios({
  save,
  cancel,
  send,
  isSaved,
  solicitudId,
}) {
  const [open, setOpen] = useState(false);
  return (
    <Grid container justifyContent="flex-end" spacing={2}>
      <Grid item>
        <ButtonSimple text="Regresar" onClick={cancel} design="cancel" />
      </Grid>
      { (!isSaved && !solicitudId) && (
        <Grid item>
          <ButtonSimple text="Guardar" onClick={save} />
        </Grid>
      )}
      { (!isSaved && solicitudId) && (
        <Grid item>
          <ButtonSimple text="Guardar" onClick={send} />
        </Grid>
      )}
      { isSaved && (
      <Grid item>
        <ButtonSimple
          text="Enviar Solicitud"
          onClick={() => setOpen(true)}
        />
      </Grid>
      ) }
      <DefaultModal title="Enviar solicitud" open={open} setOpen={setOpen}>
        <Typography sx={{ mb: 2 }}>
          ¿Está seguro de enviar la solicitud? Una vez enviada, ya no podrá ser
          editada.
        </Typography>
        <ButtonsForm
          cancel={() => setOpen(false)}
          confirm={async () => {
            const response = await send();
            if (
              response
              && (response.statusCode === 200 || response.statusCode === 201)
            ) {
              setOpen(false);
            }
          }}
        />
      </DefaultModal>
    </Grid>
  );
}

ButtonsFolios.propTypes = {
  save: PropTypes.func.isRequired,
  cancel: PropTypes.func.isRequired,
  send: PropTypes.func.isRequired,
  isSaved: PropTypes.bool.isRequired,
  solicitudId: PropTypes.bool.isRequired,
};
