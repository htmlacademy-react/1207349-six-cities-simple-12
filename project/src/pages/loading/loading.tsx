import './loading.css';

function Loading(): JSX.Element {
  return (
    <div className="page page--gray page--main">
      <span className="loader">
        <span className="loader-inner"></span>
      </span>
    </div>
  );
}

export default Loading;
