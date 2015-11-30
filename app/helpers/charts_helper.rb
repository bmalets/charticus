module ChartsHelper

  def accordion_item title, &block
    ident = title.downcase.gsub(' ','_')
    content_tag :div, class: "panel panel-default" do
      accordion_title(ident, title) + accordion_body(ident){ yield }
    end
  end

  def accordion_title ident, title
    content_tag :div, class: "panel-heading", role: "tab", id: "heading_#{ident}" do
      content_tag :h4, class: "panel-title" do
        content_tag :a, class: "collapsed", role: "button", 'data-toggle' => "collapse", href: "#collapse_#{ident}", 'aria-controls' => "#collapse_#{ident}", 'aria-expanded' => "false" do
          title.html_safe
        end
      end
    end
  end

  def accordion_body ident, &block
    content_tag :div, id: "collapse_#{ident}", class: "panel-collapse collapse", role: "tabpanel", 'aria-labelledby' => "heading_#{ident}" do
      content_tag :div, class: "panel-body" do
        yield
      end
    end
  end

end
