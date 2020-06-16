# Routr Rest Registration(Experimental)

> Creates a test endpoint for Routr's rest registration feature proposal

![publish to docker](https://github.com/fonoster/ex-rest-registration/workflows/publish%20to%20docker%20hub/badge.svg)

This feature proposal bypasses Router's internal authentication and passes the responsibility to an external Rest API.

## Available Versions

You can see all images available to pull from Docker Hub via the [Tags](https://hub.docker.com/repository/docker/fonoster/ex-rest-registration/tags?page=1) page. Docker tag names that begin with a "change type" word such as task, bug, or feature are available for testing and may be removed at any time.

## Installation

You can clone this repository and manually build it.

```
cd fonoster/ex-rest-registration\:%%VERSION%%
docker build -t fonoster/ex-rest-registration:%%VERSION%% .
```

Otherwise you can pull this image from docker index.

```
docker pull fonoster/ex-rest-registration:%%VERSION%%
```

To install in K8s, simply add to the containers section of your deployment. For example:

```
...
spec:
  containers:
  - name: ex-rest-registration
    image: fonoster/ex-rest-registration:%%VERSION%%
...
```

## Usage Example

This test container creates an http post endpoint to validate an authentication request. From within the POD, you can for example:

```
curl localhost:3000/api/device/1001/authenticate
```

**Sample call**

```
POST /api/device/{id}/authenticate
{
  Authorization: "Digest",
  username: "1001",
  uri: "sip:1001@sip.domain.net",
  algorithm: "MD5",
  realm: "sip.domain.net",
  nonce: "wzZ...",
  response="267e...",
  qop: "auth",
  nc: 0000001,
  cnonce: "165455..",
  opaque: "+GNywa"
}

HTTP/1.1 200 OK
{
  "status": 200,
  "message": "Successful registration",
}
```

## Environment Variables

Environment variables are used in the entry point script to render configuration templates. You can specify the values of these variables in Kubernetes manifests in the `env` array.

- `PORT` - Container port. Defaults to `3000`
- `DOMAIN` - Test domain. Defaults to `sip.local`
- `USERNAME` - Test username. Defaults to `1001`
- `SECRET` - Test secret. Defaults to `1234`

## Exposed ports

- `3000` - Default port for the service endpoint

## Contributing

Please read [CONTRIBUTING.md](https://github.com/fonoster/fonos/blob/master/CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

## Authors

- [Pedro Sanders](https://github.com/psanders)

See also the list of contributors who [participated](https://github.com/fonoster/ex-rest-registration/contributors) in this project.

## License

Copyright (C) 2020 by Fonoster Inc. MIT License (see [LICENSE](https://github.com/fonoster/fonos/blob/master/LICENSE) for details).
