import style from "./Loader.module.css";

const Loader = () => {
  return (
    <div className={style.loader}>
      <div className={`${style.loader__skeleton} ${style.loader__title}`}></div>
    </div>
  );
};

export default Loader;
