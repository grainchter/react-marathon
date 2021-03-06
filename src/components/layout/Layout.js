import style from './layout.module.css';
import cn from 'classnames';

const Layout = ({ title, descr, urlBg, colorBg, children }) => {

    const styleRoot = urlBg ? { backgroundImage: `url(${urlBg})` } : { backgroundColor: colorBg };

    return (

        <section className={style.root} style={styleRoot}>

            <div className={style.wrapper}>
                <article>
                    <div className={style.title}>
                        {title && <h3>{title}</h3>}
                        <span className={style.separator}></span>
                    </div>
                    <div className={cn(style.desc, style.full)}>
                        {children}
                    </div>
                </article>
            </div>
        </section>
    );
}

export default Layout;