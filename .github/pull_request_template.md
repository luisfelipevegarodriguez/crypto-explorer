## Resumen

<!-- Qué cambia y por qué. Un tema por PR. -->

## Verificación

<!-- Pega la salida de los comandos que corriste. `npm run build` también sin CRYPTOAPIS_API_KEY. -->

```text
npm install
npm run lint
npm run build
```

## Checklist

- [ ] El diff es pequeño y de un solo tema
- [ ] `npm install` termina bien
- [ ] `npm run lint` termina bien
- [ ] `npm run build` termina bien sin `CRYPTOAPIS_API_KEY`
- [ ] El diff no incluye secretos, `.env`, `.env.local` ni claves
- [ ] Sigue en el proyecto Hobby `luisfelipevegarodriguez-block-explorer`, una región, sin servicios de pago
- [ ] El modo demo sigue sirviendo datos de muestra cuando no hay clave
- [ ] La rama se actualiza con commits nuevos, sin force-push
