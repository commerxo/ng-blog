export const environment = {

    production: true,

    oauthIssuerEndpoint: "https://idpserver.ap-south-1.elasticbeanstalk.com",

    blogResourceEndpoint: "http://blog-service-env.eba-rfv5ypmm.ap-south-1.elasticbeanstalk.com",

    oidcProd:true,

    apiVersion_1:"/api/v1",

    ngMultiSelectDropdownSetting:
    
    // { 
    //     singleSelection: false, 
    //     text:"Select Tags",
    //     // selectAllText:'Select All',
    //     // unSelectAllText:'UnSelect All',
    //     enableSearchFilter: true,
    //     addNewItemOnFilter: true,
    //     classes: "myclass custom-class",
    //     primaryKey: "alpha3Code",
    //   },
    
    {
        singleSelection: false,
        idField: 'item_id',
        textField: 'item_text',
        selectAllText: 'Select All',
        unSelectAllText: 'UnSelect All',
        itemsShowLimit: 3,
        allowSearchFilter: true,
        limitSelection: 3,
        enableCheckAll: true,
        clearSearchFilter: true,
        maxHeight: 197,
        searchPlaceholderText: 'Search Tag',
        noDataAvailablePlaceholderText: 'No items',
        closeDropDownOnSelection: false,
        showSelectedItemsAtTop: false,
        defaultOpen: false,
        addNewItemOnFilter: true
  
      },

    tinymceInit:{
    baseUrl:'/tinymce',
  suffix: '.min',
        height: 500,
        // apiKey:'jug949l49wduq4fl7p7qzvwktc5d9nv442tysgqqrc1jh0sb',
        // license_key:'jug949l49wduq4fl7p7qzvwktc5d9nv442tysgqqrc1jh0sb',
        license_key: 'gpl',
        plugins: 'print preview paste noneditable imagetools importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern noneditable help charmap quickbars emoticons',
        skin:'oxide-dark',
        elements: "tabletextarea",
        automatic_uploads: true,
        images_upload_url: 'postAcceptor.php',
        images_reuse_filename: true,
        menubar: 'file edit view insert format tools table help',
        content_css:["dark",
        ],
        fullscreen_native: true,
        // toolbar_sticky: true,
        paste_data_images: true,
        autosave_ask_before_unload: true,
        quickbars_selection_toolbar: 'bold italic | quicklink h2 h3 blockquote quickimage quicktable',
        toolbar_mode: 'sliding',
        contextmenu: 'link image imagetools table',
        toolbar:'undo redo | preview |bold italic underline strikethrough |fullscreen | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | preview save print | insertfile image media template link anchor codesample | ltr rtl',
        // theme_advanced_buttons1 : "save,newdocument,|,bold,italic,underline,strikethrough,|,justifyleft,justifycenter,justifyright,justifyfull,|,styleselect,formatselect,fontselect,fontsizeselect",
        // theme_advanced_buttons2 : "cut,copy,paste,pastetext,pasteword,|,search,replace,|,bullist,numlist,|,outdent,indent,blockquote,|,undo,redo,|,link,unlink,anchor,image,cleanup,help,code,|,insertdate,inserttime,preview,|,forecolor,backcolor",
        // theme_advanced_buttons3 : "tablecontrols,|,hr,removeformat,visualaid,|,sub,sup,|,charmap,emotions,iespell,media,advhr,|,print,|,ltr,rtl,|,fullscreen",
        // theme_advanced_buttons4 : "insertlayer,moveforward,movebackward,absolute,|,styleprops,spellchecker,|,cite,abbr,acronym,del,ins,attribs,|,visualchars,nonbreaking,template,blockquote,pagebreak,|,insertfile,insertimage",
        // theme_advanced_toolbar_location : "top",
        // theme_advanced_toolbar_align : "left",
        // theme_advanced_statusbar_location : "bottom",
        // theme_advanced_resizing : true,

        table_sizing_mode: 'relative',
        table_border_widths: [
            { title: 'small', value: '1px' },
            { title: 'medium', value: '3px' },
            { title: 'large', value: '5px' },
          ],
        table_default_attributes: {
            border: '1'
          }
    },


    addTiny:{
    baseUrl:'/tinymce',
    selector: 'textarea#open-source-plugins',
    plugins: 'preview importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media codesample table charmap pagebreak nonbreaking anchor insertdatetime advlist lists wordcount help charmap quickbars emoticons accordion',
    editimage_cors_hosts: ['picsum.photos'],
    menubar: 'file edit view insert format tools table help',
    toolbar: "undo redo | accordion accordionremove | blocks fontfamily fontsize | bold italic underline strikethrough | align numlist bullist | link image | table media | lineheight outdent indent| forecolor backcolor removeformat | charmap emoticons | code fullscreen preview | save print | pagebreak anchor codesample | ltr rtl",
    autosave_ask_before_unload: true,
    autosave_interval: '30s',
    autosave_prefix: '{path}{query}-{id}-',
    autosave_restore_when_empty: false,
    autosave_retention: '2m',
    image_advtab: true,
    link_list: [
      { title: 'My page 1', value: 'https://www.tiny.cloud' },
      { title: 'My page 2', value: 'http://www.moxiecode.com' }
    ],
    image_list: [
      { title: 'My page 1', value: 'https://www.tiny.cloud' },
      { title: 'My page 2', value: 'http://www.moxiecode.com' }
    ],
    image_class_list: [
      { title: 'None', value: '' },
      { title: 'Some class', value: 'class-name' }
    ],
    importcss_append: true,
    file_picker_callback: (callback, value, meta) => {
      /* Provide file and text for the link dialog */
      if (meta.filetype === 'file') {
        callback('https://www.google.com/logos/google.jpg', { text: 'My text' });
      }
  
      /* Provide image and alt text for the image dialog */
      if (meta.filetype === 'image') {
        callback('https://www.google.com/logos/google.jpg', { alt: 'My alt text' });
      }
  
      /* Provide alternative source and posted for the media dialog */
      if (meta.filetype === 'media') {
        callback('movie.mp4', { source2: 'alt.ogg', poster: 'https://www.google.com/logos/google.jpg' });
      }
    },
    height: 600,
    image_caption: true,
    quickbars_selection_toolbar: 'bold italic | quicklink h2 h3 blockquote quickimage quicktable',
    noneditable_class: 'mceNonEditable',
    toolbar_mode: 'sliding',
    contextmenu: 'link image table',
    skin: 'oxide-dark',
    content_css: 'dark',
    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:16px }'
    },

};
