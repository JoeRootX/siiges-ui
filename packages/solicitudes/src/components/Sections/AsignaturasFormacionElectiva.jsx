import { Grid, Typography } from '@mui/material';
import PropTypes from 'prop-types';
<<<<<<< HEAD
import React, {
  useContext, useState, useEffect, useMemo,
} from 'react';
import { DataTable } from '@siiges-ui/shared';
=======
import { Button } from '@siiges-ui/shared';
import React, { useContext, useState, useEffect, useMemo } from 'react';
>>>>>>> 1617d30d4888be4d0af71af3bf3c3188d16c7e6b
import columns from './Mocks/AsignaturasFormacionElectiva';
import { TablesPlanEstudiosContext } from '../utils/Context/tablesPlanEstudiosProviderContext';
import AsignaturasFormacionCreateModal from '../utils/Components/AsignaturasFormacionModales/AsignaturasFormacionCreateModal';
import SolicitudContext from '../utils/Context/solicitudContext';
import useAsignaturas from '../utils/getAsignaturas';
import useSectionDisabled from './Hooks/useSectionDisabled';

export default function AsignaturasFormacionElectiva({ disabled, type }) {
  const { programaId } = useContext(SolicitudContext);
  const [modal, setModal] = useState(false);
  const showModal = () => setModal(true);
  const hideModal = () => setModal(false);
  const {
    asignaturasFormacionList,
    setAsignaturasFormacionList,
    setAsignaturasTotalList,
  } = useContext(TablesPlanEstudiosContext);

  const isSectionDisabled = useSectionDisabled(7);

  const isDisabled = disabled || isSectionDisabled;

<<<<<<< HEAD
  const { asignaturasFormacion, asignaturasTotal, loading } = type === 'editar' || type === 'consultar'
    ? useAsignaturas(programaId)
    : { asignaturasFormacion: [], loading: false };

  const tableColumns = useMemo(
    () => columns(isDisabled, type),
    [setAsignaturasFormacionList, asignaturasFormacion, isDisabled],
=======
  const { asignaturasFormacion, asignaturasTotal, loading } =
    type === 'editar'
      ? useAsignaturas(programaId)
      : { asignaturasFormacion: [], loading: false };

  const tableColumns = useMemo(
    () => columns(setAsignaturasFormacionList, asignaturasFormacionList),
    [setAsignaturasFormacionList, asignaturasFormacion]
>>>>>>> 1617d30d4888be4d0af71af3bf3c3188d16c7e6b
  );

  useEffect(() => {
    if ((type === 'editar' || type === 'consultar') && !loading) {
      setAsignaturasFormacionList(asignaturasFormacion);
      setAsignaturasTotalList(asignaturasTotal);
    }
  }, [loading, asignaturasFormacion]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h6">Asignaturas formación electiva</Typography>
      </Grid>
      <Grid item xs={12}>
        <DataTable
          buttonAdd
          buttonText="Agregar Asignatura"
          buttonClick={showModal}
          buttonDisabled={isDisabled}
          rows={asignaturasFormacionList}
          columns={tableColumns}
          pageSize={5}
          rowsPerPageOptions={[5]}
        />
      </Grid>
      <AsignaturasFormacionCreateModal
        open={modal}
        hideModal={hideModal}
        type="crear"
        title="Agregar Asignatura Formación Electiva"
      />
    </Grid>
  );
}

AsignaturasFormacionElectiva.defaultProps = {
  type: null,
};

AsignaturasFormacionElectiva.propTypes = {
  disabled: PropTypes.bool.isRequired,
  type: PropTypes.string,
};
