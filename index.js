document.addEventListener('DOMContentLoaded', function()
{
    var container = document.querySelector("#unity-container");
    var canvas = document.querySelector("#unity-canvas");
    var progressBarContainer = document.querySelector(".progress-bar-container");
    var progressBar = document.querySelector(".progress-bar");

    if (!canvas || !progressBarContainer || !progressBar) 
    {
        console.error("Canvas or loader element not found!");

        return;
    }

    var buildUrl = "Build";
    var loaderUrl = buildUrl + "/TelegramMiniApp-ProjectVirus-WebBuild-BetaTest.loader.js";
    var config = {
        dataUrl: buildUrl + "/066b2f7729c630594cd61c5bcec401db.data.unityweb",
        frameworkUrl: buildUrl + "/3582a7dc0134d6e45fd3a28174e28b74.js.unityweb",
        codeUrl: buildUrl + "/229e4b7efbe65a216e0c40e613369515.wasm.unityweb",
        streamingAssetsUrl: "StreamingAssets",
        companyName: "Dayme Inc",
        productName: "Project Virus",
        productVersion: "1.1.7"
    };

    if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent))
    {
        var meta = document.createElement('meta');
        meta.name = 'viewport';
        meta.content = 'width=device-width, height=device-height, initial-scale=1.0, user-scalable=no, shrink-to-fit=yes';
        document.getElementsByTagName('head')[0].appendChild(meta);
    }


    progressBarContainer.style.display = "block";

    var script = document.createElement("script");
    script.src = loaderUrl;
    
    script.onload = () => 
    {
        createUnityInstance(canvas, config, (progress) =>
        {
            progressBar.style.width = (progress * 100) + "%";
        }).then((unityInstance) =>
        {
            unityInstanceRef = unityInstance;

            progressBarContainer.style.opacity = "0";
            progressBarContainer.style.display = "none";

            setTimeout(() => 
            {
                progressBarContainer.style.visibility = "hidden";
            },
            500);

            console.log("Unity instance created successfully.");
        }
        ).catch((message) =>
        {
            console.error("Unity initialization error: " + message);
        });
    };

    script.onerror = (error) =>
    {
        console.error("Failed to load Unity loader script:", error);
    };

    document.body.appendChild(script);
});

window.addEventListener('load', function ()
{
    Telegram.WebApp.ready();
    Telegram.WebApp.expand();

    console.log("Telegram web app has been expanded to full screen");

    var version = Telegram.WebApp.version;
    var versionFloat = parseFloat(version);

    if (versionFloat >= 7.7)
    {
        Telegram.WebApp.disableVerticalSwipes();
        console.log('Activating vertical swipe disable');
    }

    console.log(`Telegram Web App opened with version: ${version}`);
});
