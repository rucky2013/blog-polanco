package inacap;

import org.glassfish.jersey.grizzly2.httpserver.GrizzlyHttpServerFactory;
import org.glassfish.jersey.server.ResourceConfig;

public class App {

    public static void main(String[] args) {

        ResourceConfig resourceConfig = new ResourceConfig()
                .register(inacap.middleware.Cors.class)
                .register(org.glassfish.jersey.jackson.JacksonFeature.class)
                .register(inacap.controllers.PostsController.class)
                .register(inacap.controllers.CommentsController.class);

        GrizzlyHttpServerFactory.createHttpServer(Config.BASE_URI, resourceConfig);
    }

}
