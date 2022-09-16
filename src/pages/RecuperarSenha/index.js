import React, { useState } from 'react';
import { toast } from 'react-toastify';
import moment from 'moment';
// import { get } from 'lodash';
import { Link } from 'react-router-dom';
import { cpf as cpfValidator } from 'cpf-cnpj-validator';
import { isEmail } from 'validator';

import Loading from '../../components/Loading';
import axios from '../../services/axios';
import './style.css';

export default function RecuperarSenha() {
  const [token, setToken] = useState('');
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [currentForm, setCurrentForm] = useState('form1');
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

      setCurrentForm('form2');
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
      setCurrentForm('form3');
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

      toast.success('Senha atualizada com sucesso');
      setCurrentForm('form4');
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
    } else if (!isEmail(email)) {
      toast.error('Email inválido!');
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
      toast.info(
        'Renvie um email de recuperação de senha para obter um novo código'
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
      toast.error('A senha deve ter no mínimo 8 caracteres');
      validate = false;
    } else if (confirmPassword.length > 20) {
      toast.error('A senha deve ter no máximo 20 caracteres');
      validate = false;
    }

    return validate;
  };

  return (
    <>
      <Loading isLoading={isLoading} />

      <div className="password-container">
        <div
          className="form-1"
          style={
            currentForm === 'form1' ? { display: 'flex' } : { display: 'none' }
          }
        >
          <label htmlFor="">Informe o seu cpf</label>
          <input
            type="text"
            name="cpf"
            value={cpfValidator.format(cpf)}
            maxLength={11}
            onChange={(e) => setCpf(e.target.value)}
          />
          <label htmlFor="">Informe o seu email</label>
          <p>Um código será enviado para o seu email</p>
          <input
            type="text"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button className="btn w-40" type="button" onClick={handleSendCode}>
            Enviar código
          </button>
        </div>

        <div
          className="form-2"
          style={
            currentForm === 'form2' ? { display: 'flex' } : { display: 'none' }
          }
        >
          <label htmlFor="">Confirme sua identidade</label>
          <p>Digite o código que enviamos para o email informado</p>
          <input
            type="text"
            name="cpf"
            placeholder="Código"
            value={token}
            onChange={(e) => setToken(e.target.value)}
          />

          <button className="btn w-40" type="button" onClick={getUserToken}>
            Verificar código
          </button>
        </div>

        <div
          className="form-3"
          style={
            currentForm === 'form3' ? { display: 'flex' } : { display: 'none' }
          }
        >
          <h1 className="mx-auto font-extrabold text-2xl">
            Redefina a sua nova senha
          </h1>

          <label htmlFor="">Senha</label>
          <input
            type="password"
            name="senha"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <label htmlFor="">Confirmar senha</label>
          <input
            type="password"
            name="senha"
            placeholder="Confirmar senha"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <button
            className="btn w-40"
            type="button"
            onClick={handleNewPassword}
          >
            Confirmar
          </button>
        </div>

        <div
          className="form-4"
          style={
            currentForm === 'form4' ? { display: 'flex' } : { display: 'none' }
          }
        >
          <h1 className="mx-auto font-extrabold text-2xl">
            A sua senha foi atualizada com sucesso!
          </h1>

          <Link className="mx-auto text-blue-600" to="/login">
            Fazer login
          </Link>
        </div>

        <Link
          className="mx-auto text-blue-600"
          to="/login"
          style={
            currentForm !== 'form4' ? { display: 'flex' } : { display: 'none' }
          }
        >
          Voltar para página de login
        </Link>
      </div>
    </>
  );
}
