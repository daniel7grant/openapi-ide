# OpenAPI IDE

An online IDE to write scripts connecting to an API, runnable on Deno Deploy Subhosting.

## Usage

<!-- TODO: Screenshot -->

To start, choose an API source from the dropdown, for example, to interact with the Deno API,
you can choose `Deno`. This will load the editor with the API parameters and the Swagger UI on the right.

You can write code in the editor and run it on Deno Deploy Subhosting with the run button. You can add
environment variables if you want to evaluate them on the server. By default the API and the code is saved
in the URL, while environment variables are saved only locally. You can save and share the URL safely.

## Get started

This project is based on [Deno](https://docs.deno.com/runtime/manual/getting_started/installation)
and uses the Hono framework. To get started, simply create the `.env` file, and run the `start`:

```sh
cp .env.example .env
deno task start
```

To watch the files for changes (development mode), use `dev` task:

```sh
deno task dev
```
