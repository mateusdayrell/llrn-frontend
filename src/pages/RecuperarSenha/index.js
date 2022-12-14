import React, { useState } from 'react';
import { toast } from 'react-toastify';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { cpf as cpfValidator } from 'cpf-cnpj-validator';
import { IdentificationCard, At, PaperPlaneRight, EnvelopeSimpleOpen, Key } from 'phosphor-react';

import Loading from '../../components/Loading';
import axios from '../../services/axios';
import './style.css';

export default function RecuperarSenha() {
  const [token, setToken] = useState('');
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [currentForm, setCurrentForm] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendCode = async () => {
    if (!validateCpfEmail()) return;

    const regTemp = {
      email,
    };

    try {
      setIsLoading(true);
      await axios.post(`/send-reset-password/${cpf}`, regTemp);
      setIsLoading(false);

      setCurrentForm(2);
      toast.success('Código enviado com sucesso!');
      return;
    } catch (error) {
      setIsLoading(false);
      const { erros } = error.response.data;
      erros.map((err) => toast.error(err));
    }
  };

  const getUserToken = async () => {
    if (!token) {
      toast.info('Preencha o campo código!');
      return;
    }

    try {
      setIsLoading(true);
      const { data } = await axios.get(`/usuarios/${cpf}`);
      setIsLoading(false);

      const validate = validateUserToken(
        data.password_reset_token,
        data.password_reset_expires
      );

      if (!validate) return;

      toast.success('Código validado com sucesso');
      setCurrentForm(3);
      return;
    } catch (error) {
      setIsLoading(false);
      const { erros } = error.response.data;
      erros.map((err) => toast.error(err));
    }
  };

  const handleNewPassword = async () => {
    if (!validatePassword()) return;

    const regTemp = {
      password,
    };

    try {
      setIsLoading(true);
      await axios.put(`/usuarios/${cpf}`, regTemp);
      setIsLoading(false);

      setCurrentForm(4);
    } catch (error) {
      setIsLoading(false);
      const { erros } = error.response.data;
      erros.map((err) => toast.error(err));
    }
  };

  const validateCpfEmail = () => {
    let validate = true;

    if (!cpf) {
      toast.info('Digite um cpf');
      validate = false;
    } else if (!cpfValidator.isValid(cpf)) {
      toast.error('CPF inválido!');
      validate = false;
    }
    if (!email) {
      toast.info('Digite um e-mail');
      validate = false;
    }

    return validate;
  };

  const validateUserToken = (uToken, uTokenExpiracao) => {
    const dtLimite = moment(uTokenExpiracao);
    const dtAtual = moment(new Date());
    const diffDatas = dtLimite.diff(dtAtual, 'minutes');

    if (!token || token !== uToken) {
      toast.error('Código inválido');
      return false;
    }

    if (diffDatas <= 0) {
      toast.error('Código expirado!');
      setCurrentForm(1)
      setToken('')
      toast.info(
        'Siga os passos abaixo para obter um novo código.'
      );
      return false;
    }

    return true;
  };

  const validatePassword = () => {
    let validate = true;

    if (!password) {
      toast.info('Preencha o campo senha!');
      validate = false;
    }

    if (!confirmPassword) {
      toast.info('Preencha o campo confirmar senha!');
      validate = false;
    } else if (password !== confirmPassword) {
      toast.error('As senhas devem ser idênticas!');
      validate = false;
    } else if (confirmPassword.length < 8) {
      toast.error('A senha deve ter no mínimo 8 caracteres!');
      validate = false;
    } else if (confirmPassword.length > 15) {
      toast.error('A senha deve ter no máximo 15 caracteres!');
      validate = false;
    }

    return validate;
  };

  return (
    <>
      <Loading isLoading={isLoading} />

      <div className='container-body-password'>
        <div className="password-container">
          <div className='header-password'>
            <h1 className='title-password'>Recuperar Senha</h1>
          </div>
          <div className='forms'>
            <div
              className="form-1"
              style={
                currentForm === 1 ? { display: 'flex' } : { display: 'none' }
              }>
              <p>Para prosseguir com a redefinição da sua senha, preencha os campos abaixo com suas informações conforme solicitado.</p>
              <div className='input-password'>
                <span>CPF</span>
                <input
                  type="text"
                  name="cpf"
                  className='input-animation'
                  value={cpfValidator.format(cpf)}
                  maxLength={11}
                  onChange={(e) => setCpf(e.target.value)}
                />
                <span className='input-icon'>
                  <IdentificationCard size={24} />
                </span>
                <div className='underline'/>
              </div>
              <div className='input-password'>
                <span>E-mail</span>
                <input
                  type="email"
                  name="email"
                  className='input-animation'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <span className='input-icon'>
                  <At size={24} />
                </span>
                <div className='underline'/>
              </div>
              <div className='content-button-password'>
                <Link  to="/login" className='justify-center'>
                  <button type='button' className='buttonpassword bg-verde-100'>Voltar</button>
                </Link>
                <button
                  className="buttonpassword bg-verde-100"
                  type="button"
                  onClick={handleSendCode}>
                    Enviar código
                  <PaperPlaneRight size={22} />
                </button>
              </div>
            </div>

            <div
              className="form-2"
              style={
                currentForm === 2 ? { display: 'flex' } : { display: 'none' }
              }
            >
              <label htmlFor="">Confirme sua identidade</label>
              {/* eslint-disable-next-line react/no-unescaped-entities */}
              <p>Um código foi enviado para o email <i>"{email}"</i>. Por favor, informe o código no campo abaixo.</p>
              <div className='input-password'>
                <span>Código</span>
                <input
                  type="text"
                  name="cpf"
                  className='input-animation'
                  value={token}
                  onChange={(e) => setToken(e.target.value)}
                />
                <span className='input-icon'>
                  <EnvelopeSimpleOpen size={24} />
                </span>
              </div>
              <div className="content-button-password">
                <button
                  className="buttonpassword bg-verde-100"
                  type="button"
                  onClick={() => setCurrentForm(1)}
                >
                  Voltar
                </button>
                <button className="buttonpassword bg-verde-100" type="button" onClick={getUserToken}>
                  Verificar código
                </button>
              </div>
            </div>

            <div
              className="form-3"
              style={
                currentForm === 3 ? { display: 'flex' } : { display: 'none' }
              }
            >
              <label>Crie uma nova senha</label>
              <div className='input-password'>
                <span>Nova Senha</span>
                <input
                  type="password"
                  name="senha"
                  className='input-animation'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <span className='input-icon'>
                  <Key size={24} />
                </span>
                <div className='underline'/>
              </div>
              <div className='input-password'>
                <span>Confirme sua nova senha</span>
                <input
                  type="password"
                  name="senha"
                  className='input-animation'
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <span className='input-icon'>
                  <Key size={24} />
                </span>
                <div className='underline'/>
              </div>
              <div className='content-button-password'>
                <button
                  className="buttonpassword bg-verde-100"
                  type="button"
                  onClick={() => setCurrentForm(2)}
                >
                  Voltar
                </button>
                <button
                  className="buttonpassword bg-verde-100"
                  type="button"
                  onClick={handleNewPassword}
                >
                  Confirmar
                </button>
              </div>
            </div>

            <div
              className="form-4 items-center gap-4"
              style={
                currentForm === 4 ? { display: 'flex' } : { display: 'none' }
              }
            >
              <label>A sua senha foi redefinida com sucesso!</label>
              <div className=''>
                <Link className="buttonpassword px-10 bg-verde-100" to="/login">
                  Fazer login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
