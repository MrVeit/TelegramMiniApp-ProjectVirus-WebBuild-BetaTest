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
        dataUrl: buildUrl + "/TelegramMiniApp-ProjectVirus-WebBuild-BetaTest.data.unityweb",
        frameworkUrl: buildUrl + "/TelegramMiniApp-ProjectVirus-WebBuild-BetaTest.framework.js.unityweb",
        codeUrl: buildUrl + "/TelegramMiniApp-ProjectVirus-WebBuild-BetaTest.wasm.unityweb",
        streamingAssetsUrl: "StreamingAssets",
        companyName: "Dayme Inc",
        productName: "Project VRS",
        productVersion: "1.3.3"
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
