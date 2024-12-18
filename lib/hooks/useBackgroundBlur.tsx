import { useEffect } from 'react';

const useBlurExceptRef = (ref: React.RefObject<HTMLElement>) => {
  useEffect(() => {
    const blurElements = () => {
      // Pobierz wszystkie elementy na stronie
      const allElements = document.body.querySelectorAll('*');

      // Iteracja po wszystkich elementach na stronie
      allElements.forEach((element) => {
        // Sprawdzamy, czy element to nie jest element ref
        if (
          ref.current &&
          ref.current !== element &&
          !ref.current.contains(element)
        ) {
          const el = element as HTMLElement;
          el.style.filter = 'blur(5px)'; // Aplikujemy blur
        }
      });
    };

    // Zastosowanie blur po załadowaniu komponentu
    blurElements();

    // Usuwamy blur po odmontowaniu komponentu lub zmianie ref
    return () => {
      const allElements = document.body.querySelectorAll('*');
      allElements.forEach((element) => {
        const el = element as HTMLElement;
        el.style.filter = ''; // Usuwamy blur
      });
    };
  }, [ref]); // Hook wywoła się za każdym razem, gdy ref się zmieni
};

export default useBlurExceptRef;
