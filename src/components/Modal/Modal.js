import style from './style.module.css';
import cn from 'classnames';
import { useEffect, useRef } from 'react/cjs/react.development';

const Modal = ({ isOpen, title, children, onCloseModal }) => {

    useEffect(() => {
        document.querySelector('body').style.overflow = isOpen ? 'hidden' : null;
    }, [isOpen]);

    const modalEl = useRef();

    const handleCloseModal = () => {
        onCloseModal && onCloseModal(false);
    }

    const handleClickRoot = (event) => {
        if (!modalEl.current.contains(event.target)) {
            handleCloseModal();
        }
    }

    return (
        <div
            className={cn(style.root, {
                [style.open]: isOpen
            })}
            onClick={handleClickRoot}
        >
            <div
                ref={modalEl}
                className={style.modal}
            >
                <div className={style.head}>
                    {title}
                    <span
                        className={style.btnClose}
                        onClick={handleCloseModal}
                    >
                    </span>
                </div>
                <div className={style.content}>
                    {children}
                </div>
            </div>
        </div>
    );

};



export default Modal;