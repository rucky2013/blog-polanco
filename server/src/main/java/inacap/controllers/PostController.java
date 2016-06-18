package inacap.controllers;

import inacap.collection.PostCollection;
import inacap.models.Message;
import inacap.models.Post;
import inacap.requests.PostRequest;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.ArrayList;
import java.util.List;

@Path("/posts")
public class PostController {

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<Post> index() {
        try {
            return PostCollection.fetch();
        } catch (Exception ex) {
            System.err.println(ex.getMessage());
            return new ArrayList<Post>();
        }
    }

    @GET
    @Path("/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response show(@PathParam("id") int id) {
        try {
            Post post = PostCollection.find(id);
            if(post != null)
                return Response.ok(post).build();
            return Response.status(404).entity(new Message("Post not found.")).build();
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
            req.validate();
        } catch(Exception ex) {
            return Response.status(422).entity(new Message(ex.getMessage())).build();
        }

        try {
            Post post = PostCollection.store(req.title, req.body);
            if(post != null)
                return Response.ok(post).build();
            throw new Exception("Something went wrong.");
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
            req.validate();
        } catch(Exception ex) {
            return Response.status(422).entity(new Message(ex.getMessage())).build();
        }

        try {
            PostCollection.replace(id, req.title, req.body);
            return Response.status(200).build();
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
            PostCollection.remove(id);
            return Response.status(204).build();
        } catch (Exception ex) {
            System.err.println(ex.getMessage());
            return Response.status(500).entity(new Message(ex.getMessage())).build();
        }
    }

}
