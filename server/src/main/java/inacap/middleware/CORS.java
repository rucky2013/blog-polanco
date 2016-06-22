package inacap.middleware;

import javax.ws.rs.container.ContainerRequestContext;
import javax.ws.rs.container.ContainerResponseContext;
import javax.ws.rs.container.ContainerResponseFilter;
import java.io.IOException;

public class Cors implements ContainerResponseFilter {

    @Override
    public void filter(ContainerRequestContext req, ContainerResponseContext res) throws IOException {
        res.getHeaders().add("Access-Control-Allow-Origin", "*");
        res.getHeaders().add("Access-Control-Allow-Headers", "origin, content-type, accept, authorization");
        res.getHeaders().add("Access-Control-Allow-CredentialsRequest", "true");
        res.getHeaders().add("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
        res.getHeaders().add("Access-Control-Max-Age", "1209600");
    }

}
