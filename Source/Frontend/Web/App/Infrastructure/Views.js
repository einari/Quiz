import * as ko from "knockout";

class Views
{
    handleElement(element) {
        let self = this;
        let tagsWithView = element.querySelectorAll("[data-view]");

        tagsWithView.forEach(tagWithView => {
            let viewName = tagWithView.attributes["data-view"].value;
            self.hookUpElement(tagWithView, viewName);
        });
    }

    hookUpElement(element, viewName) {
        let self = this;
        let indexOflastSeperator = viewName.lastIndexOf("/");
        let filename = "";
        if( indexOflastSeperator < 0 ) filename = viewName; 
        else filename = viewName.substr(indexOflastSeperator+1);

        let viewSource = `/${viewName}.html!`;
        let viewModelSource = `/${viewName}.js`;

        Promise.all([
            System.import(viewSource),
            System.import(viewModelSource)
        ]).then(modules => {
            element.innerHTML = modules[0].body.innerHTML;
            
            var viewModelType = modules[1][filename];
            var viewModel = new viewModelType();
            ko.applyBindings(viewModel, element);
            self.handleElement(element);
        });
    }
}

export default new Views();