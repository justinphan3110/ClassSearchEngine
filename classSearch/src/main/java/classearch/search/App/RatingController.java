package classearch.search.App;

import classearch.search.API.Meeting;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping(RatingController.URI)
public class RatingController {
    public static final String URI = "rating";

    @RequestMapping(value = "{code}/{rate}", method = RequestMethod.POST)
    public void RatingController(@PathVariable String code, @PathVariable String rate) throws IOException {

    }
}
