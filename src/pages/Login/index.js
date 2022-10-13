import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux/es/exports';
import { EnvelopeSimple, Key } from 'phosphor-react';
import { get } from 'lodash';
import { Link } from 'react-router-dom';

import Loading from '../../components/Loading';
import * as actions from '../../store/modules/auth/actions';
import './style.css';

export default function Login(props) {
  const dispatch = useDispatch();

  const prevPath = get(props, 'location.state.prevPath', '/');
  const isLoading = useSelector((state) => state.auth.isLoading);

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    let formErros = false;

    if (!email) {
      formErros = true;
      toast.info('Digite um e-mail');
    }

    if (!senha) {
      formErros = true;
      toast.info('Digite uma senha');
    }

    if (formErros) return;

    dispatch(actions.loginRequest({ email, senha, prevPath }));
  };

  return (
    <>
      <Loading isLoading={isLoading} />
      <div className='flex items-center justify-evenly px-10'>
        <svg width="800" height="700" viewBox="0 0 1049 1024" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g filter="url(#filter2_bd_412_1428)">
            <path d="M336.814 260.407C364.865 273.785 408.635 279.157 431.75 286.736C454.865 294.315 468.835 310.318 469.923 336.389C471.01 362.46 460.572 388.873 443.612 412.714C426.651 436.555 403.167 457.652 374.029 470.344C344.891 483.036 310.1 487.324 275.744 486.981C241.17 486.467 207.031 481.15 179.416 467.771C152.017 454.221 130.925 432.782 113.53 409.455C95.9165 386.129 82 360.916 82 335.874C82 310.833 86.2436 299.215 98.2355 281.648C114.979 257.121 138.038 232.522 165.654 218.8C193.269 205.079 214.197 198.832 249.858 199.003C285.737 199.175 308.764 246.857 336.814 260.407Z" fill="white" />
          </g>
          <g filter="url(#filter3_bd_412_1428)">
            <path d="M580 309.9C630.968 337.36 710.5 348.386 752.5 363.943C794.5 379.5 819.884 412.348 821.859 465.86C823.835 519.372 804.87 573.588 774.052 622.523C743.234 671.458 700.563 714.76 647.62 740.812C594.677 766.864 531.46 775.665 469.035 774.961C406.214 773.905 344.183 762.992 294.005 735.531C244.222 707.719 205.898 663.713 174.29 615.834C142.286 567.955 117 516.203 117 464.804C117 413.404 124.711 389.557 146.5 353.5C176.923 303.157 218.822 252.664 269 224.5C319.178 196.336 357.204 183.514 422 183.866C487.192 184.218 529.032 282.088 580 309.9Z" fill="#015F43" fill-opacity="0.7" shape-rendering="crispEdges" />
          </g>
          <g filter="url(#filter4_di_412_1428)">
            <path d="M238.905 421.876H279.936L279.937 543.323H320.677V559H259.994V437.725H219V318H238.905V421.876Z" fill="#00875F" />
            <path d="M386.328 387.941C386.328 391.501 386.095 394.716 385.629 397.587H312.121C312.703 405.167 315.555 411.254 320.677 415.848C325.799 420.441 332.084 422.738 339.534 422.738C350.243 422.738 357.809 418.317 362.232 409.474H383.708C380.798 418.202 375.502 425.38 367.82 431.007C360.253 436.519 350.825 439.276 339.534 439.276C330.338 439.276 322.074 437.266 314.74 433.246C307.524 429.112 301.82 423.37 297.629 416.02C293.555 408.555 291.518 399.942 291.518 390.18C291.518 380.418 293.497 371.862 297.455 364.512C301.529 357.048 307.174 351.305 314.391 347.286C321.725 343.266 330.105 341.257 339.534 341.257C348.613 341.257 356.703 343.209 363.804 347.114C370.904 351.018 376.433 356.531 380.391 363.651C384.349 370.657 386.328 378.753 386.328 387.941ZM365.55 381.739C365.433 374.504 362.814 368.704 357.693 364.34C352.571 359.976 346.227 357.794 338.661 357.794C331.793 357.794 325.915 359.976 321.026 364.34C316.137 368.589 313.227 374.389 312.296 381.739H365.55Z" fill="white" />
            <path d="M427.068 507.665C427.068 511.225 426.835 514.441 426.37 517.312H352.862C353.444 524.891 356.645 530.978 361.767 535.572C366.888 540.166 372.825 542.462 380.275 542.462C390.984 542.462 398.55 538.041 402.973 529.198H424.449C421.539 537.926 416.243 545.104 408.56 550.731C400.994 556.244 391.566 559 380.275 559C371.079 559 362.814 556.99 355.481 552.971C348.264 548.836 342.56 543.094 338.37 535.744C334.296 528.279 332.259 519.666 332.259 509.904C332.259 500.143 334.238 491.587 338.195 484.237C342.269 476.772 347.915 471.03 355.132 467.01C362.465 462.991 370.846 460.981 380.275 460.981C389.354 460.981 397.444 462.933 404.544 466.838C411.645 470.743 417.174 476.255 421.132 483.375C425.089 490.381 427.068 498.477 427.068 507.665ZM406.29 501.463C406.174 494.228 403.555 488.429 398.433 484.064C393.312 479.7 386.968 477.518 379.401 477.518C372.534 477.518 366.655 479.7 361.767 484.064C356.878 488.314 353.968 494.113 353.036 501.463H406.29Z" fill="white" />
            <path d="M440.021 509.56C440.021 500.028 442 491.587 445.958 484.237C450.032 476.887 455.503 471.202 462.37 467.182C469.355 463.048 477.037 460.981 485.418 460.981C492.984 460.981 499.561 462.474 505.148 465.46C510.852 468.331 515.391 471.948 518.767 476.312V462.531H538.846V557.45H518.767V543.324C515.391 547.803 510.794 551.535 504.974 554.521C499.153 557.507 492.518 559 485.069 559C476.804 559 469.238 556.933 462.37 552.798C455.503 548.549 450.032 542.692 445.958 535.227C442 527.648 440.021 519.092 440.021 509.56ZM518.767 509.904C518.767 503.358 517.37 497.674 514.577 492.85C511.899 488.027 508.349 484.352 503.926 481.825C499.503 479.298 494.73 478.035 489.608 478.035C484.487 478.035 479.714 479.298 475.291 481.825C470.868 484.237 467.259 487.854 464.466 492.678C461.788 497.386 460.45 503.014 460.45 509.56C460.45 516.106 461.788 521.848 464.466 526.786C467.259 531.725 470.868 535.514 475.291 538.156C479.831 540.682 484.603 541.946 489.608 541.946C494.73 541.946 499.503 540.682 503.926 538.156C508.349 535.629 511.899 531.954 514.577 527.131C517.37 522.193 518.767 516.45 518.767 509.904Z" fill="white" />
            <path d="M584.895 476.312C587.805 471.489 591.646 467.757 596.418 465.115C601.307 462.359 607.069 460.981 613.704 460.981V481.308H608.641C600.842 481.308 594.905 483.261 590.831 487.165C586.873 491.07 584.895 497.846 584.895 507.493V557.45H564.99V462.531H584.895V476.312Z" fill="white" />
            <path d="M680.54 460.981C688.106 460.981 694.857 462.531 700.794 465.632C706.847 468.733 711.561 473.327 714.936 479.413C718.312 485.5 720 492.85 720 501.463V557.45H700.27V504.392C700.27 495.893 698.116 489.405 693.81 484.926C689.503 480.332 683.625 478.035 676.175 478.035C668.725 478.035 662.789 480.332 658.365 484.926C654.058 489.405 651.905 495.893 651.905 504.392V557.45H632V462.531H651.905V473.384C655.164 469.479 659.297 466.436 664.302 464.254C669.424 462.072 674.836 460.981 680.54 460.981Z" fill="white" />
          </g>
          <g filter="url(#filter5_d_412_1428)">
            <path d="M492.19 228.213C493.223 228.746 494.004 229.062 494.744 229.475C502.096 232.907 509.35 236.3 516.702 239.733C519.101 240.818 519.405 242.871 517.618 244.758C517.049 245.323 516.519 245.789 515.892 246.216C504.619 254.706 492.494 261.375 479.42 266.183C468.401 270.121 457.691 274.979 447.137 280.014C441.223 282.841 435.252 285.531 429.182 288.181C423.524 290.657 418.001 293.642 412.73 296.844C407.225 300.063 401.449 302.832 395.672 305.601C394.125 306.337 392.307 306.622 390.567 306.712C389.102 306.686 387.325 306.307 386.039 305.559C381.868 302.961 381.124 298.913 384.267 295.077C386.291 292.605 388.781 290.662 391.155 288.444C392.038 287.667 393.018 286.928 393.803 286.111C406.601 273.016 419.341 259.784 432.139 246.69C439.598 238.926 446.979 231.357 454.515 223.964C467.937 211.009 483.744 202.539 501.857 198.183C504.733 197.531 507.569 196.977 510.541 196.364C508.633 194.91 507.676 194.75 506.888 196.133C505.816 195.699 504.743 195.264 503.67 194.83C502.695 194.435 501.817 194.079 501.49 192.925C501.355 192.416 500.654 191.905 500.127 191.805C498 191.17 495.735 190.594 493.608 189.959C492.886 189.78 492.164 189.601 491.481 189.324C490.701 189.008 489.293 189.119 489.475 187.831C489.638 186.307 491.064 186.431 492.118 186.631C495.126 187.054 498.133 187.478 501.061 188.096C509.222 189.813 517.696 191.315 525.812 194.262C528.095 195.073 530.298 196.08 532.502 197.086C535.154 198.387 535.673 200.187 534.567 202.918C533.856 204.674 532.776 205.939 531.247 206.909C528.504 208.636 525.858 210.403 523.097 211.896C513.715 216.837 504.275 221.642 494.894 226.584C494.032 227.029 493.268 227.515 492.19 228.213Z" fill="#00875F" />
            <path d="M463.503 231.994C471.06 234.577 478.617 237.16 486.071 239.702C488.577 240.597 491.04 241.595 493.545 242.491C495.085 243.114 496.397 244.004 496.636 245.774C496.834 247.646 495.902 249.061 494.335 249.98C493.015 250.879 491.531 251.592 490.089 252.203C456.911 267.441 424.019 283.153 391.963 300.638C390.004 301.637 388.046 302.636 385.985 303.593C384.604 304.348 383.142 304.712 381.75 303.431C380.459 302.191 380.589 300.691 381.172 299.253C382.73 295.702 384.39 292.193 386.153 288.725C389.7 282.036 393.39 275.286 396.936 268.597C400.917 261.129 404.652 253.68 408.736 246.253C412.945 238.518 417.42 231.01 421.792 223.461C423.761 220.077 425.627 216.65 427.678 213.06C426.549 212.603 425.523 212.187 424.599 211.813C421.478 210.668 418.213 209.584 415.133 208.337C411.335 206.798 410.894 204.349 413.745 201.441C415.542 199.66 417.441 197.92 419.444 196.222C422.106 194.074 424.974 192.009 427.697 190.006C435.765 183.954 443.935 177.943 451.9 171.85C454.768 169.785 457.362 169.282 460.483 170.427C465.493 172.218 470.545 173.906 475.555 175.696C486.951 179.715 498.45 183.776 509.805 187.898C512.824 189.001 515.8 190.207 518.674 191.371C519.701 191.787 520.625 192.161 521.568 192.782C524.85 194.709 525.311 197.406 522.544 200.108C521.304 201.398 519.84 202.358 518.334 203.421C508.413 209.918 497.86 215.321 487.245 220.581C480.259 223.964 473.047 227.018 465.897 230.215C465.031 230.581 464.166 230.948 463.362 231.458C463.423 231.603 463.484 231.747 463.503 231.994Z" fill="#FBFBFB" />
            <path d="M427.884 213.143C426.653 212.644 425.729 212.27 424.702 211.854C421.623 210.607 418.358 209.523 415.278 208.276C411.686 206.82 411.141 204.329 413.848 201.483C415.501 199.762 417.359 198.125 419.32 196.53C422.126 194.321 424.994 192.256 427.759 190.15C435.971 184.037 444.141 178.026 452.148 171.83C454.769 169.785 457.465 169.324 460.586 170.468C465.494 172.218 470.443 173.864 475.35 175.613C486.849 179.674 498.307 183.837 509.909 187.939C512.824 189.001 515.698 190.165 518.572 191.33C519.394 191.662 520.215 191.995 520.994 192.43C525.139 194.587 525.639 197.777 521.945 200.702C518.911 203.177 515.508 205.383 512.086 207.342C498.479 214.974 484.75 222.318 470.369 228.322C468.061 229.299 465.856 230.318 463.26 231.417C464.345 232.573 465.64 232.62 466.667 233.036C475.147 235.993 483.731 238.992 492.211 241.95C492.93 242.241 493.69 242.429 494.47 242.865C497.116 244.295 497.639 247.136 495.367 249.203C494.108 250.246 492.583 251.062 491.099 251.776C479.455 257.216 467.812 262.656 456.168 268.096C435.622 277.816 415.319 288.112 395.261 298.986C392.499 300.496 389.633 301.964 386.81 303.33C386.191 303.676 385.47 303.982 384.832 304.082C382.588 304.607 380.846 303.303 381.062 301.001C381.253 299.644 381.691 298.268 382.334 296.976C386.504 288.747 390.776 280.56 395.007 272.476C399.715 263.509 404.278 254.603 409.191 245.72C413.317 238.19 417.75 230.785 422.04 223.442C424.008 220.057 425.874 216.631 427.884 213.143ZM389.002 295.853C389.166 296.039 389.33 296.225 389.535 296.308C421.325 278.596 454.339 263.172 487.336 246.906C485.181 246.032 483.58 245.264 481.896 244.702C473.784 242.013 465.734 239.469 457.622 236.78C456.759 236.55 455.938 236.218 455.158 235.782C452.143 234.083 451.909 231.12 454.613 228.87C455.83 227.929 457.314 227.216 458.798 226.503C467.33 222.55 476.044 219.03 484.454 214.79C494.677 209.611 504.512 203.916 514.511 198.407C515.273 197.999 516.017 197.344 517.295 196.548C514.729 195.508 512.82 194.615 510.828 193.928C493.806 187.869 476.783 181.81 459.802 175.648C458.324 175.168 457.458 175.535 456.427 176.312C448.359 182.364 440.291 188.416 432.223 194.468C429.128 196.799 426.033 199.13 422.938 201.461C422.236 202.013 421.493 202.668 420.523 203.589C421.754 204.088 422.678 204.462 423.499 204.795C426.518 205.898 429.578 206.899 432.41 208.166C435.037 209.349 435.584 211.244 434.195 213.788C432.019 217.686 429.698 221.645 427.419 225.501C422.653 233.727 417.825 241.809 413.265 250.118C406.278 262.941 399.538 275.745 392.737 288.404C391.492 290.887 390.247 293.37 389.002 295.853Z" fill="#2A4857" />
          </g>
          <defs>
            <filter id="filter0_f_412_1428" x="73.9316" y="159.85" width="974.635" height="884.742" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
              <feGaussianBlur stdDeviation="158.5" result="effect1_foregroundBlur_412_1428" />
            </filter>
            <filter id="filter1_f_412_1428" x="-234.565" y="-133.592" width="974.635" height="884.742" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
              <feGaussianBlur stdDeviation="158.5" result="effect1_foregroundBlur_412_1428" />
            </filter>
            <filter id="filter2_bd_412_1428" x="-18" y="103" width="588" height="488" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feGaussianBlur in="BackgroundImageFix" stdDeviation="10" />
              <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_412_1428" />
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
              <feOffset dy="4" />
              <feGaussianBlur stdDeviation="50" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix type="matrix" values="0 0 0 0 0.14902 0 0 0 0 0.196078 0 0 0 0 0.219608 0 0 0 0.15 0" />
              <feBlend mode="normal" in2="effect1_backgroundBlur_412_1428" result="effect2_dropShadow_412_1428" />
              <feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow_412_1428" result="shape" />
            </filter>
            <filter id="filter3_bd_412_1428" x="17" y="87.8586" width="905" height="791.141" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feGaussianBlur in="BackgroundImageFix" stdDeviation="10" />
              <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_412_1428" />
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
              <feOffset dy="4" />
              <feGaussianBlur stdDeviation="50" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix type="matrix" values="0 0 0 0 0.14902 0 0 0 0 0.196078 0 0 0 0 0.219608 0 0 0 0.15 0" />
              <feBlend mode="normal" in2="effect1_backgroundBlur_412_1428" result="effect2_dropShadow_412_1428" />
              <feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow_412_1428" result="shape" />
            </filter>
            <filter id="filter4_di_412_1428" x="215" y="318" width="509" height="249" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
              <feOffset dy="4" />
              <feGaussianBlur stdDeviation="2" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_412_1428" />
              <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_412_1428" result="shape" />
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
              <feOffset dy="4" />
              <feGaussianBlur stdDeviation="2" />
              <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
              <feBlend mode="normal" in2="shape" result="effect2_innerShadow_412_1428" />
            </filter>
            <filter id="filter5_d_412_1428" x="310.748" y="104.827" width="314.365" height="296.885" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
              <feOffset dx="10" dy="15" />
              <feGaussianBlur stdDeviation="40" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0" />
              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_412_1428" />
              <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_412_1428" result="shape" />
            </filter>
          </defs>
        </svg>
        <div className='container-login'>
          <h1 className='title-login'>Login</h1>
          <div className='content-inputs'>
            <div class="input-login">
              <input
                type="text"
                name="email"
                placeholder="E-mail"
                class="input-animation"
                value={email}
                onChange={(e) => setEmail(e.target.value)} />
              <span class="absolute inset-y-0 left-0 flex items-center pl-2">
                <EnvelopeSimple size={20} />
              </span>
            </div>
            <div class="input-login">
              <input
                type="password"
                name="senha"
                placeholder="Senha"
                class="input-animation"
                value={senha}
                onChange={(e) => setSenha(e.target.value)} />
              <span class="absolute inset-y-0 left-0 flex items-center pl-2">
                <Key size={20} />
              </span>
            </div>
            <Link className="text-xs text-cinza-100 hover:text-cinza-300 duration-200 pl-2" to="/recuperar-senha">
              Esqueceu a senha?
            </Link>
            <button className="bg-verde-100 my-8 hover:bg-verde-200 hover:text-cinza-200 text-cinza-100 w-full py-1  rounded-lg duration-150 shadow-md hover:shadow-verde-200 shadow-verde-100" type="button" onClick={handleSubmit}>
              Entrar
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
