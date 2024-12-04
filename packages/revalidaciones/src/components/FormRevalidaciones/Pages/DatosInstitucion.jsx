/* eslint-disable max-len */
import { Grid } from '@mui/material';
import {
  Input, InputDate, Select, Subtitle,
} from '@siiges-ui/shared';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const apiKey = process.env.NEXT_PUBLIC_API_KEY;
const domain = process.env.NEXT_PUBLIC_URL;

export default function DatosInstitucion({ form, handleOnChange, estados }) {
  const [tipoInstituciones, setTipoInstituciones] = useState([]);
  const [programas, setProgramas] = useState([]);
  const [instituciones, setInstituciones] = useState([]);
  const [grados, setGrados] = useState([]);
  const [tipoInstitucionId, setTipoInstitucionId] = useState(form.institucionDestino?.tipoInstitucionId || '');

  useEffect(() => {
    const fetchTipoInstituciones = async () => {
      try {
        const response = await fetch(`${domain}/api/v1/public/instituciones/tipoInstituciones`, {
          headers: {
            api_key: apiKey,
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();
        setTipoInstituciones(data.data);
      } catch (error) {
        console.error('Error fetching tipo de instituciones:', error);
      }
    };
    const fetchGrados = async () => {
      try {
        const response = await fetch(`${domain}/api/v1/public/grados/`, {
          headers: {
            api_key: apiKey,
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();
        setGrados(data.data);
      } catch (error) {
        console.error('Error fetching grados:', error);
      }
    };

    fetchGrados();
    fetchTipoInstituciones();
  }, []);

  const fetchInstituciones = async () => {
    try {
      const response = await fetch(
        `${domain}/api/v1/public/instituciones?tipoInstitucionId=${tipoInstitucionId}`,
        {
          headers: {
            api_key: apiKey,
            'Content-Type': 'application/json',
          },
        },
      );
      const data = await response.json();
      setInstituciones(data.data);
    } catch (error) {
      console.error('Error fetching instituciones:', error);
    }
  };

  const fetchProgramas = async (acuerdoRvoe) => {
    try {
      const response = await fetch(
        `${domain}/api/v1/public/programas?acuerdoRvoe=${acuerdoRvoe}`,
        {
          headers: {
            api_key: apiKey,
            'Content-Type': 'application/json',
          },
        },
      );
      const data = await response.json();
      setProgramas(data.data);
    } catch (error) {
      console.error('Error fetching Programas:', error);
    }
  };

  useEffect(() => {
    if (tipoInstitucionId === 1) {
      fetchInstituciones();
    }
  }, [tipoInstitucionId]);

  const handleTipoInstitucionChange = (event) => {
    const selectedTipoInstitucionId = event.target.value;
    setTipoInstitucionId(selectedTipoInstitucionId);
    handleOnChange(event, ['interesado', 'institucionDestino']);
  };

  const handleRvoeOnBlur = (event) => {
    const acuerdoRvoe = event.target.value;
    if (tipoInstitucionId === 1) {
      fetchProgramas(acuerdoRvoe);
    }
    handleOnChange(event, ['interesado', 'institucionDestino']);
  };

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <Subtitle>Datos de la Institución de procedencia</Subtitle>
      </Grid>
      <Grid item xs={6}>
        <Input
          id="nombreInstitucion"
          label="Nombre de la Institución"
          name="nombre"
          value={form.institucionProcedencia?.nombre || ''}
          onChange={(e) => handleOnChange(e, ['interesado', 'institucionProcedencia'])}
        />
      </Grid>
      <Grid item xs={6}>
        <Input
          id="nombreCarrera"
          label="Nombre de la Carrera"
          name="nombreCarrera"
          value={form.institucionProcedencia?.nombreCarrera || ''}
          onChange={(e) => handleOnChange(e, ['interesado', 'institucionProcedencia'])}
        />
      </Grid>
      <Grid item xs={4}>
        <Select
          title="Grado Academico Procedente"
          options={grados}
          name="gradoAcademicoProcedente"
          value={form.institucionProcedencia?.gradoAcademicoProcedente || ''}
          onChange={(e) => handleOnChange(e, ['interesado', 'institucionProcedencia'])}
        />
      </Grid>
      <Grid item xs={4}>
        <InputDate
          id="anoFinalizacionCarrera"
          label="Año de Finalización de la Carrera"
          name="anoFinalizacionCarrera"
          value={form.institucionProcedencia?.anoFinalizacionCarrera || ''}
          onChange={(e) => handleOnChange(e, ['interesado', 'institucionProcedencia'])}
        />
      </Grid>
      <Grid item xs={4}>
        <InputDate
          id="anoInicioCarrera"
          label="Año de Inicio de Realización de Estudios"
          name="anoInicioCarrera"
          value={form.institucionProcedencia?.anoInicioCarrera || ''}
          onChange={(e) => handleOnChange(e, ['interesado', 'institucionProcedencia'])}
        />
      </Grid>
      <Grid item xs={4}>
        <Select
          title="Pais"
          options={estados}
          name="paisId"
          value={form.institucionProcedencia?.paisId || ''}
          onChange={(e) => handleOnChange(e, ['interesado', 'institucionProcedencia'])}
        />
      </Grid>
      <Grid item xs={12}>
        <Subtitle>En caso de no contar con apostilla proporcionar datos de la universidad para verificación de autenticidad</Subtitle>
      </Grid>
      <Grid item xs={6}>
        <Input
          id="telefonoInstitucion"
          label="Telefono de la Institución"
          name="telefonoInstitucion"
          value={form.institucionProcedencia?.telefonoInstitucion || ''}
          onChange={(e) => handleOnChange(e, ['interesado', 'institucionProcedencia'])}
        />
      </Grid>
      <Grid item xs={6}>
        <Input
          id="paginaWebInstitucion"
          label="Pagina web de la Institución"
          name="paginaWebInstitucion"
          value={form.institucionProcedencia?.paginaWebInstitucion || ''}
          onChange={(e) => handleOnChange(e, ['interesado', 'institucionProcedencia'])}
        />
      </Grid>
      <Grid item xs={6}>
        <Input
          id="correoInstitucion"
          label="Telefono de la Institución"
          name="correoInstitucion"
          value={form.institucionProcedencia?.correoInstitucion || ''}
          onChange={(e) => handleOnChange(e, ['interesado', 'institucionProcedencia'])}
        />
      </Grid>
      <Grid item xs={12}>
        <Subtitle>Deseo Revalidar mis estudios como</Subtitle>
      </Grid>
      <Grid item xs={6}>
        <Input
          id="intitucionDestino"
          label="Institución de Educación Superior"
          name="intitucionDestino"
          value={form.institucionDestino?.institucionDestino || ''}
          onChange={(e) => handleOnChange(e, ['interesado', 'institucionDestino'])}
        />
      </Grid>
      <Grid item xs={4}>
        <Select
          title="Grado Academico Destino"
          options={grados}
          name="gradoAcademicoDestino"
          value={form.institucionDestino?.gradoAcademicoDestino || ''}
          onChange={(e) => handleOnChange(e, ['interesado', 'institucionDestino'])}
        />
      </Grid>
      <Grid item xs={6}>
        <Input
          id="planEstudios"
          label="Plan de Estudios"
          name="planEstudios"
          value={form.institucionDestino?.planEstudios || ''}
          onChange={(e) => handleOnChange(e, ['interesado', 'institucionDestino'])}
        />
      </Grid>
      {form.tipoTramiteId === 1 && (
      <>
        <Grid item xs={12}>
          <Subtitle>Datos de la Institución de destino</Subtitle>
        </Grid>
        <Grid item xs={3}>
          <Select
            title="Tipo de Institución"
            name="tipoInstitucionId"
            options={tipoInstituciones}
            value={tipoInstitucionId}
            onChange={handleTipoInstitucionChange}
          />
        </Grid>
        <Grid item xs={9}>
          {tipoInstitucionId === 1 ? (
            <Select
              title="Instituciones"
              options={instituciones}
              name="programaId"
              value={form.institucionDestino?.programaId || ''}
              onChange={(e) => handleOnChange(e, ['interesado', 'institucionDestino'])}
            />
          ) : (
            <Input
              id="institucionNombre"
              label="Instituciones de Educación Superior"
              name="nombre"
              value={form.institucionDestino?.nombre || ''}
              onChange={(e) => handleOnChange(e, ['interesado', 'institucionDestino'])}
            />
          )}
        </Grid>
        <Grid item xs={3}>
          <Input
            id="rvoe"
            label="RVOE"
            name="acuerdoRvoe"
            value={form.institucionDestino?.acuerdoRvoe || ''}
            onblur={handleRvoeOnBlur}
          />
        </Grid>
        <Grid item xs={9}>
          <Input
            id="nombreCarreraDestino"
            label="Nombre de la Carrera (Destino)"
            name="nombreCarrera"
            value={programas.nombre || ''}
            onChange={(e) => handleOnChange(e, ['interesado', 'institucionDestino'])}
            disabled={tipoInstitucionId === 1}
          />
        </Grid>
      </>
      )}
    </Grid>
  );
}

DatosInstitucion.propTypes = {
  form: PropTypes.shape({
    tipoTramiteId: PropTypes.number,
    institucionProcedencia: PropTypes.shape({
      nombre: PropTypes.string,
      paisId: PropTypes.string,
      nombreCarrera: PropTypes.string,
      gradoAcademicoProcedente: PropTypes.string,
      anoFinalizacionCarrera: PropTypes.string,
      anoInicioCarrera: PropTypes.string,
      telefonoInstitucion: PropTypes.string,
      paginaWebInstitucion: PropTypes.string,
      correoInstitucion: PropTypes.string,
    }),
    institucionDestino: PropTypes.shape({
      tipoInstitucionId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      programaId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      nombre: PropTypes.string,
      acuerdoRvoe: PropTypes.string,
      nombreCarrera: PropTypes.string,
      institucionDestino: PropTypes.string,
      gradoAcademicoDestino: PropTypes.string,
      planEstudios: PropTypes.string,
    }),
  }).isRequired,
  handleOnChange: PropTypes.func.isRequired,
  estados: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      nombre: PropTypes.string.isRequired,
    }),
  ).isRequired,
};
