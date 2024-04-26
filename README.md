# Payments MS

This API was generate with NestJS

## Installation

1. Clone Respository

2. Install dependencies

```
npm install
```

3. Create file `.env` with `env.template`

4. Run Stripe CLI and create image from MS

```
docker compose up --build
```

5. Call webhook stripe

```
docker run --rm -it stripe/stripe-cli trigger payment_intent.created \
    --api-key your_api_key_from_stripe
```

para pruebas en local, es necesario levantar el servicio de https://dashboard.hookdeck.com/connections para hacer un puente entre stripe y tu maquiena local.
instalarlo en tu computador con

```
npm install hookdeck-cli -g
```

despues correr:

```
hookdeck listen 3000 stripe-to-localhost
```

Ojo el stripe-to-localhost hay que levantarlo en https://dashboard.hookdeck.com

### Author

![enter image description here](https://avatars1.githubusercontent.com/u/6466769?s=170&v=4)

- **Carlos Enrique Ramírez Flores** - _Backend Development_ - [GitHub](https://github.com/linuxcarl), [GitLab](https://gitlab.com/linux-carl), [Web Site](https://www.carlosramirezflores.com), [Linkedin](https://www.linkedin.com/in/carlos-enrique-ram%C3%ADrez-flores/)

## License

[MIT](https://choosealicense.com/licenses/mit/)
