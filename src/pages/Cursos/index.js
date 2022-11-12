import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { get } from 'lodash';
import { FaFileImage } from 'react-icons/fa';
import { useSelector } from 'react-redux';

import './style.css';
import Loading from '../../components/Loading';
import axios from '../../services/axios';


export default function Cursos() {
  const { cpf } = useSelector((state) => state.auth.usuario);
  const [cursos, setCursos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  useEffect(() => {
    getCursos();
  }, []);

  const getCursos = async () => {
    setIsLoading(true);
    const { data } = await axios.get(`/cursos/get-by-user/${cpf}`);
    setCursos(data);
    setIsLoading(false);
  };

  const handleRedirect = (cod_curso) => {
    history.push(`/cursos/${cod_curso}`);
  };

  return (
    <>
      <Loading isLoading={isLoading} />
      <div className="container-body">
        <h1 className='title'>Cursos</h1>
        {cursos.map((curso) => (
          <div className='flex justify-between items-center border  text-white w-full  mb-3 pr-3 '>
          <div key={curso.cod_curso} className="flex items-center gap-3  ">
              {get(curso, 'nome_arquivo', false) ?
                <img className='h-[110px] w-[150px]' src={`${process.env.REACT_APP_BACKEND_URL}/images/${curso.nome_arquivo}`} alt="Imagem do curso" />
                : <FaFileImage size={36}/>
              }
              <div className='Cursos-info'>
              <h2 className=''>{`${process.env.REACT_APP_BACKEND_URL}/${curso.nome_arquivo}`}</h2>
              <p className='text-xs'>{curso.desc_curso}</p>
              </div>
              </div>
              <button
                type='button'
                className='btn'
                onClick={() => handleRedirect(curso.cod_curso)}
              >
                Acessar
              </button>
          </div>
        ))}
      </div>
    </>
  );
}
