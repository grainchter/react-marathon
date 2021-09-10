import style from './layout.module.css';

const Layout = ({ title, descr, urlBg, colorBg}) => {

    const styleRoot = urlBg ? {backgroundImage: `url(${urlBg})`} : {backgroundColor: colorBg};

    return (

    <section className={style.root} style = {styleRoot}>

        <div className={style.wrapper}>
            <article>
                <div className={style.title}>
                   {title && <h3>{title}</h3>}
                    <span className={style.separator}></span>
                </div>
                <div className={`${style.desc} ${style.full}`}>
                    {descr && <p>{descr}</p>}
                </div>
            </article>
        </div>
    </section>
    );
}

export default Layout;