package inacap;

import org.glassfish.grizzly.http.server.HttpServer;
import org.glassfish.jersey.grizzly2.httpserver.GrizzlyHttpServerFactory;
import org.glassfish.jersey.server.ResourceConfig;

import java.net.URI;
import java.util.HashSet;
import java.util.Set;

public class App {

    public static void main(String[] args) {
        Set<Class<?>> classes = new HashSet<>();

        classes.add(inacap.middleware.CORS.class);
        classes.add(org.glassfish.jersey.jackson.JacksonFeature.class);

        classes.add(inacap.controllers.PostController.class);

        ResourceConfig resourceConfig = new ResourceConfig();
        resourceConfig.registerClasses(classes);

        GrizzlyHttpServerFactory.createHttpServer(URI.create(Config.BASE_URI), resourceConfig);

        System.out.println("API server running at " + Config.BASE_URI);
        System.out.println("Check out " + Config.BASE_URI + "/posts");
    }

}
