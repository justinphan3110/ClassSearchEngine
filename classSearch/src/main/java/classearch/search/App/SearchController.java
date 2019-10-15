package classearch.search.App;


import classearch.search.API.Class;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping(SearchController.URI)
public class SearchController {

    public static final String URI = "search";

    @RequestMapping(value = "{text}")
    public List<Class> SearchController(@PathVariable final String text) throws IOException {

        return SearchApplication.elasticSearchAPI.boolSearch(text);
    }
}
