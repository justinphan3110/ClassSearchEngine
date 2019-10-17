package classearch.search.App;


import classearch.search.API.Class;
import classearch.search.API.ElasticSearchAPI;
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

    @RequestMapping(value = "{index}/{text}")
    public List<Class> SearchController(@PathVariable String index, @PathVariable String text) throws IOException {

        return SearchApplication.elasticSearchAPI.boolSearch(index, text);
    }
}
