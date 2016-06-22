package inacap.controllers;

import inacap.collection.PostsCollection;
import inacap.models.Message;
import inacap.models.Post;
import inacap.requests.PostRequest;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.ArrayList;
import java.util.List;

@Path("/posts")
public class PostsController {

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<Post> index() {
        try {
            return PostsCollection.fetch();
        } catch (Exception ex) {
            System.err.println(ex.getMessage());
            return new ArrayList<>();
        }
    }

    @GET
    @Path("/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response show(@PathParam("id") int id) {
        try {
            Post post = PostsCollection.find(id);
            if (post != null)
                return Response.ok(post).build();
            return Response.status(404).entity(new Message("Post not found")).build();
        } catch (Exception ex) {
            System.err.println(ex.getMessage());
            return Response.status(500).entity(new Message(ex.getMessage())).build();
        }
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response store(PostRequest req) {
        try {
            if (req == null)
                throw new Exception("Post required");
            req.validate();
        } catch (Exception ex) {
            return Response.status(422).entity(new Message(ex.getMessage())).build();
        }

        try {
            Post post = PostsCollection.store(req.title, req.body);
            if (post != null)
                return Response.ok(post).build();
            throw new Exception("Something went wrong");
        } catch (Exception ex) {
            System.err.println(ex.getMessage());
            return Response.status(500).entity(new Message(ex.getMessage())).build();
        }
    }

    @PUT
    @Path("/{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response update(@PathParam("id") int id, PostRequest req) {
        try {
            if (req == null)
                throw new Exception("Post required");
            req.validate();
        } catch (Exception ex) {
            return Response.status(422).entity(new Message(ex.getMessage())).build();
        }

        try {
            Post post = PostsCollection.replace(id, req.title, req.body);
            if (post == null)
                return Response.status(404).entity(new Message("Post not found")).build();
            return Response.status(200).entity(post).build();
        } catch (Exception ex) {
            System.err.println(ex.getMessage());
            return Response.status(500).entity(new Message(ex.getMessage())).build();
        }
    }

    @DELETE
    @Path("/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response delete(@PathParam("id") int id) {
        try {
            boolean removed = PostsCollection.remove(id);
            if (removed)
                return Response.status(204).build();
            return Response.status(404).entity(new Message("Post not found")).build();
        } catch (Exception ex) {
            System.err.println(ex.getMessage());
            return Response.status(500).entity(new Message(ex.getMessage())).build();
        }
    }

}
