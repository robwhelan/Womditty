begin
    mandrill = Mandrill::API.new 'Ut9NXkhKFDLJVBTqMRGV7Q'
    template_name = "Welcome email - moving to Charleston"
    template_content = []
    message = {"subaccount"=>"Womditty",
     "preserve_recipients"=>nil,
     "images"=>[],
     "merge"=>true,
     "inline_css"=>nil,
     "auto_html"=>nil,
     "from_name"=>"Womditty",
     "text"=>"Your wisdom is needed!",
     "return_path_domain"=>nil,
     "view_content_link"=>nil,
     "merge_vars"=>
        [{"vars"=>[{"content"=>"merge2 content", "name"=>"merge2"}],
            "rcpt"=>"recipient.email@example.com"}],
     "google_analytics_domains"=>["womditty.com"],
     "tags"=>["password-resets"],
     "html"=>"<p>Example HTML content</p>",
     "tracking_domain"=>nil,
     "important"=>false,
     "google_analytics_campaign"=>"New signup email - already in Charleston",
     "signing_domain"=>nil,
     "bcc_address"=>"message.bcc_address@example.com",
     "track_opens"=>true,
     "from_email"=>"rob@womditty.com",
     "subject"=>"Welcome to Womditty and THANKS!",
     "metadata"=>{"website"=>"www.womditty.com"},
     "track_clicks"=>true,
     "headers"=>{"Reply-To"=>"rob@womditty.com"},
     "attachments"=>[],
     "global_merge_vars"=>[],
     "url_strip_qs"=>nil,
     "auto_text"=>nil,
     "recipient_metadata"=>
        [],
     "to"=>
        [{"email"=>"whelan@gmail.com",
            "type"=>"to",
            "name"=>"Recipient Name"}]}
    async = false
    ip_pool = "Main Pool"
    send_at = ""
    result = mandrill.messages.send_template template_name, template_content, message, async, ip_pool, send_at
        # [{"reject_reason"=>"hard-bounce",
        #     "email"=>"recipient.email@example.com",
        #     "status"=>"sent",
        #     "_id"=>"abc123abc123abc123abc123abc123"}]
    
rescue Mandrill::Error => e
    # Mandrill errors are thrown as exceptions
    puts "A mandrill error occurred: #{e.class} - #{e.message}"
    # A mandrill error occurred: Mandrill::UnknownSubaccountError - No subaccount exists with the id 'customer-123'    
    raise
end