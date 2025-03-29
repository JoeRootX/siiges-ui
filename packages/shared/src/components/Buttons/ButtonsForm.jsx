import React from 'react';
import { Grid } from '@mui/material';
import PropTypes from 'prop-types';
import '../../styles/buttons/ButtonAdd.css';
import ButtonSimple from './ButtonSimple';

export default function UserForm({
  confirm,
  cancel,
  confirmDisabled,
  confirmText,
  cancelText,
  justifyContent,
}) {
  const cancelButtonText = confirmDisabled ? 'Regresar' : cancelText;

  return (
    <Grid container justifyContent={justifyContent} spacing={2}>
      <Grid item>
<<<<<<< HEAD
        <ButtonSimple
          design="cancel"
          onClick={cancel}
          text={cancelButtonText}
        />
=======
        <ButtonUnstyled className="buttonAdd cancel" onClick={cancel}>
<<<<<<< HEAD
          <Typography variant="body1">Cancelar</Typography>
        </ButtonUnstyled>
>>>>>>> 1617d30d4888be4d0af71af3bf3c3188d16c7e6b
      </Grid>
      {!confirmDisabled && (
        <Grid item>
          <ButtonSimple onClick={confirm} text={confirmText} />
        </Grid>
      )}
    </Grid>
  );
}

UserForm.propTypes = {
  confirm: PropTypes.func.isRequired,
  cancel: PropTypes.func.isRequired,
  confirmDisabled: PropTypes.bool,
  confirmText: PropTypes.string,
  cancelText: PropTypes.string,
  justifyContent: PropTypes.string,
};

UserForm.defaultProps = {
  confirmDisabled: false,
  confirmText: 'Guardar',
  cancelText: 'Cancelar',
  justifyContent: 'flex-end',
};
