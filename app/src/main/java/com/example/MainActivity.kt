package com.example

import android.annotation.SuppressLint
import android.app.AlertDialog
import android.content.Context
import android.content.Intent
import android.content.pm.PackageManager
import android.graphics.Bitmap
import android.net.Uri
import android.os.Bundle
import android.os.CancellationSignal
import android.os.ParcelFileDescriptor
import android.print.PageRange
import android.print.PrintAttributes
import android.print.PrintDocumentAdapter
import android.print.PrintDocumentInfo
import android.print.PrintManager
import android.util.Base64
import android.util.Log
import android.view.ViewGroup
import android.webkit.ConsoleMessage
import android.webkit.JavascriptInterface
import android.webkit.JsPromptResult
import android.webkit.JsResult
import android.webkit.ValueCallback
import android.webkit.WebChromeClient
import android.webkit.WebResourceRequest
import android.webkit.WebSettings
import android.webkit.WebView
import android.webkit.WebViewClient
import android.widget.EditText
import android.widget.Toast
import androidx.activity.ComponentActivity
import androidx.activity.compose.BackHandler
import androidx.activity.compose.rememberLauncherForActivityResult
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.activity.result.contract.ActivityResultContracts
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.WindowInsets
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.safeDrawing
import androidx.compose.foundation.layout.windowInsetsPadding
import androidx.compose.material3.MaterialTheme
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.viewinterop.AndroidView
import androidx.core.content.FileProvider
import com.example.ui.theme.MyApplicationTheme
import java.io.File
import java.io.FileInputStream
import java.io.FileOutputStream

class MainActivity : ComponentActivity() {

    private var filePathCallback: ValueCallback<Array<Uri>>? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()

        setContent {
            MyApplicationTheme {
                MainScreen(
                    onFileChooserRequested = { callback ->
                        filePathCallback = callback
                    }
                )
            }
        }
    }
}

@SuppressLint("SetJavaScriptEnabled")
@Composable
fun MainScreen(
    onFileChooserRequested: (ValueCallback<Array<Uri>>?) -> Unit
) {
    val context = LocalContext.current
    var webViewInstance by remember { mutableStateOf<WebView?>(null) }
    var canGoBack by remember { mutableStateOf(false) }

    val fileChooserLauncher = rememberLauncherForActivityResult(
        contract = ActivityResultContracts.GetMultipleContents()
    ) { uris: List<Uri> ->
        onFileChooserRequested(null)
    }

    BackHandler(enabled = canGoBack) {
        webViewInstance?.let { wv ->
            if (wv.canGoBack()) {
                wv.goBack()
            }
        }
    }

    Box(
        modifier = Modifier
            .fillMaxSize()
            .background(Color(0xFF121214))
            .windowInsetsPadding(WindowInsets.safeDrawing)
            .testTag("arcdesign_main_container")
    ) {
        AndroidView(
            modifier = Modifier
                .fillMaxSize()
                .testTag("arcdesign_webview"),
            factory = { ctx ->
                WebView(ctx).apply {
                    layoutParams = ViewGroup.LayoutParams(
                        ViewGroup.LayoutParams.MATCH_PARENT,
                        ViewGroup.LayoutParams.MATCH_PARENT
                    )

                    settings.apply {
                        javaScriptEnabled = true
                        domStorageEnabled = true
                        databaseEnabled = true
                        allowFileAccess = true
                        allowContentAccess = true
                        loadWithOverviewMode = true
                        useWideViewPort = true
                        setSupportZoom(true)
                        builtInZoomControls = true
                        displayZoomControls = false
                        cacheMode = WebSettings.LOAD_DEFAULT
                        mixedContentMode = WebSettings.MIXED_CONTENT_ALWAYS_ALLOW
                        allowUniversalAccessFromFileURLs = true
                        allowFileAccessFromFileURLs = true
                    }

                    val bridge = WebAppInterface(ctx, this)
                    addJavascriptInterface(bridge, "AndroidBridge")
                    addJavascriptInterface(bridge, "Android")

                    webViewClient = object : WebViewClient() {
                        override fun shouldOverrideUrlLoading(
                            view: WebView?,
                            request: WebResourceRequest?
                        ): Boolean {
                            val url = request?.url?.toString() ?: return false
                            return handleUrl(ctx, url)
                        }

                        @Deprecated("Deprecated in Java")
                        override fun shouldOverrideUrlLoading(view: WebView?, url: String?): Boolean {
                            if (url == null) return false
                            return handleUrl(ctx, url)
                        }

                        override fun onPageStarted(view: WebView?, url: String?, favicon: Bitmap?) {
                            super.onPageStarted(view, url, favicon)
                            canGoBack = view?.canGoBack() == true
                        }

                        override fun onPageFinished(view: WebView?, url: String?) {
                            super.onPageFinished(view, url)
                            canGoBack = view?.canGoBack() == true
                        }
                    }

                    webChromeClient = object : WebChromeClient() {
                        override fun onJsAlert(
                            view: WebView?,
                            url: String?,
                            message: String?,
                            result: JsResult?
                        ): Boolean {
                            AlertDialog.Builder(ctx)
                                .setTitle("ArcDesign Construction")
                                .setMessage(message)
                                .setPositiveButton(android.R.string.ok) { _, _ -> result?.confirm() }
                                .setOnCancelListener { result?.cancel() }
                                .show()
                            return true
                        }

                        override fun onJsConfirm(
                            view: WebView?,
                            url: String?,
                            message: String?,
                            result: JsResult?
                        ): Boolean {
                            AlertDialog.Builder(ctx)
                                .setTitle("ArcDesign Construction Confirmation")
                                .setMessage(message)
                                .setPositiveButton(android.R.string.ok) { _, _ -> result?.confirm() }
                                .setNegativeButton(android.R.string.cancel) { _, _ -> result?.cancel() }
                                .setOnCancelListener { result?.cancel() }
                                .show()
                            return true
                        }

                        override fun onJsPrompt(
                            view: WebView?,
                            url: String?,
                            message: String?,
                            defaultValue: String?,
                            result: JsPromptResult?
                        ): Boolean {
                            val input = EditText(ctx).apply {
                                setText(defaultValue ?: "")
                            }
                            AlertDialog.Builder(ctx)
                                .setTitle("ArcDesign Construction Input")
                                .setMessage(message)
                                .setView(input)
                                .setPositiveButton(android.R.string.ok) { _, _ ->
                                    result?.confirm(input.text.toString())
                                }
                                .setNegativeButton(android.R.string.cancel) { _, _ ->
                                    result?.cancel()
                                }
                                .setOnCancelListener { result?.cancel() }
                                .show()
                            return true
                        }

                        override fun onConsoleMessage(consoleMessage: ConsoleMessage?): Boolean {
                            Log.d("ArcDesignWeb", "${consoleMessage?.message()} -- From line ${consoleMessage?.lineNumber()} of ${consoleMessage?.sourceId()}")
                            return super.onConsoleMessage(consoleMessage)
                        }

                        override fun onShowFileChooser(
                            webView: WebView?,
                            filePathCallback: ValueCallback<Array<Uri>>?,
                            fileChooserParams: FileChooserParams?
                        ): Boolean {
                            onFileChooserRequested(filePathCallback)
                            try {
                                fileChooserLauncher.launch("*/*")
                                return true
                            } catch (e: Exception) {
                                return false
                            }
                        }
                    }

                    loadUrl("file:///android_asset/index.html")
                    webViewInstance = this
                }
            },
            update = { wv ->
                webViewInstance = wv
            }
        )
    }
}

private fun handleUrl(context: Context, url: String): Boolean {
    if (url.startsWith("file:///android_asset/")) {
        return false
    }

    if (url.startsWith("fb-messenger:") || url.startsWith("whatsapp:") ||
        url.startsWith("tg:") || url.startsWith("mailto:") || url.startsWith("tel:")
    ) {
        try {
            val intent = Intent(Intent.ACTION_VIEW, Uri.parse(url))
            context.startActivity(intent)
            return true
        } catch (e: Exception) {
            Toast.makeText(context, "App not installed to handle this link.", Toast.LENGTH_SHORT).show()
            return true
        }
    }

    if (url.startsWith("http://") || url.startsWith("https://")) {
        try {
            val intent = Intent(Intent.ACTION_VIEW, Uri.parse(url))
            context.startActivity(intent)
            return true
        } catch (e: Exception) {
            return false
        }
    }

    return false
}

class WebAppInterface(private val context: Context, private val webView: WebView) {

    @JavascriptInterface
    fun shareText(title: String, text: String, url: String) {
        try {
            val fullText = buildString {
                if (text.isNotEmpty()) append(text)
                if (url.isNotEmpty()) {
                    if (isNotEmpty()) append("\n\n")
                    append(url)
                }
            }

            val shareIntent = Intent(Intent.ACTION_SEND).apply {
                type = "text/plain"
                putExtra(Intent.EXTRA_SUBJECT, title)
                putExtra(Intent.EXTRA_TEXT, fullText)
                flags = Intent.FLAG_ACTIVITY_NEW_TASK
            }

            val chooser = Intent.createChooser(shareIntent, title).apply {
                flags = Intent.FLAG_ACTIVITY_NEW_TASK
            }
            context.startActivity(chooser)
        } catch (e: Exception) {
            Log.e("WebAppInterface", "Error sharing text", e)
            showToast("Failed to share text: ${e.message}")
        }
    }

    @JavascriptInterface
    fun shareFile(
        title: String,
        message: String,
        base64Data: String,
        fileName: String,
        mimeType: String,
        fallbackUrl: String
    ) {
        try {
            val cleanBase64 = if (base64Data.contains(",")) {
                base64Data.substringAfter(",")
            } else {
                base64Data
            }

            val bytes = Base64.decode(cleanBase64, Base64.DEFAULT)
            val exportDir = File(context.cacheDir, "shared_exports").apply {
                if (!exists()) mkdirs()
            }
            val targetFile = File(exportDir, fileName)
            FileOutputStream(targetFile).use { fos ->
                fos.write(bytes)
                fos.flush()
            }

            val authority = "${context.packageName}.fileprovider"
            val fileUri = FileProvider.getUriForFile(context, authority, targetFile)

            val shareIntent = Intent(Intent.ACTION_SEND).apply {
                type = mimeType.ifEmpty { "application/octet-stream" }
                putExtra(Intent.EXTRA_STREAM, fileUri)
                putExtra(Intent.EXTRA_SUBJECT, title)
                if (message.isNotEmpty() || fallbackUrl.isNotEmpty()) {
                    val fullMsg = buildString {
                        if (message.isNotEmpty()) append(message)
                        if (fallbackUrl.isNotEmpty()) {
                            if (isNotEmpty()) append("\n\n")
                            append(fallbackUrl)
                        }
                    }
                    putExtra(Intent.EXTRA_TEXT, fullMsg)
                }
                addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION)
                flags = Intent.FLAG_ACTIVITY_NEW_TASK
            }

            // Grant permission to potential receivers
            val resInfoList = context.packageManager.queryIntentActivities(
                shareIntent,
                PackageManager.MATCH_DEFAULT_ONLY
            )
            for (resolveInfo in resInfoList) {
                val packageName = resolveInfo.activityInfo.packageName
                context.grantUriPermission(
                    packageName,
                    fileUri,
                    Intent.FLAG_GRANT_READ_URI_PERMISSION
                )
            }

            val chooser = Intent.createChooser(shareIntent, title).apply {
                flags = Intent.FLAG_ACTIVITY_NEW_TASK
            }
            context.startActivity(chooser)
        } catch (e: Exception) {
            Log.e("WebAppInterface", "Error sharing file", e)
            showToast("Failed to share file: ${e.message}")
        }
    }

    @JavascriptInterface
    fun printPdf(base64Data: String, fileName: String, jobName: String) {
        try {
            val cleanBase64 = if (base64Data.contains(",")) {
                base64Data.substringAfter(",")
            } else {
                base64Data
            }
            val bytes = Base64.decode(cleanBase64, Base64.DEFAULT)
            val printDir = File(context.cacheDir, "print_jobs").apply {
                if (!exists()) mkdirs()
            }
            val safeName = fileName.ifEmpty { "ArcDesign_Document.pdf" }
            val targetFile = File(printDir, safeName)
            FileOutputStream(targetFile).use { fos ->
                fos.write(bytes)
                fos.flush()
            }

            webView.post {
                try {
                    val printManager = context.getSystemService(Context.PRINT_SERVICE) as? PrintManager
                    if (printManager != null) {
                        val printAttributes = PrintAttributes.Builder()
                            .setMediaSize(PrintAttributes.MediaSize.NA_LEGAL.asLandscape())
                            .setColorMode(PrintAttributes.COLOR_MODE_COLOR)
                            .build()
                        val printJobName = jobName.ifEmpty { safeName }
                        printManager.print(printJobName, PdfPrintDocumentAdapter(targetFile), printAttributes)
                    } else {
                        showToast("Printing service unavailable on this device")
                    }
                } catch (e: Exception) {
                    Log.e("WebAppInterface", "Error starting print dialog", e)
                    showToast("Print dialog error: ${e.message}")
                }
            }
        } catch (e: Exception) {
            Log.e("WebAppInterface", "Error preparing PDF for print", e)
            showToast("Failed to prepare PDF: ${e.message}")
        }
    }

    @JavascriptInterface
    fun printPage() {
        webView.post {
            try {
                val printManager = context.getSystemService(Context.PRINT_SERVICE) as? PrintManager
                if (printManager != null) {
                    val printAdapter = webView.createPrintDocumentAdapter("ArcDesign_Construction_Document")
                    val printAttributes = PrintAttributes.Builder()
                        .setMediaSize(PrintAttributes.MediaSize.NA_LEGAL.asLandscape())
                        .setColorMode(PrintAttributes.COLOR_MODE_COLOR)
                        .build()
                    printManager.print("ArcDesign_Construction_Document", printAdapter, printAttributes)
                } else {
                    showToast("Printing service unavailable on this device")
                }
            } catch (e: Exception) {
                Log.e("WebAppInterface", "Error printing", e)
                showToast("Print error: ${e.message}")
            }
        }
    }

    @JavascriptInterface
    fun openUrl(url: String) {
        try {
            val intent = Intent(Intent.ACTION_VIEW, Uri.parse(url)).apply {
                flags = Intent.FLAG_ACTIVITY_NEW_TASK
            }
            context.startActivity(intent)
        } catch (e: Exception) {
            Log.e("WebAppInterface", "Error opening URL: $url", e)
        }
    }

    @JavascriptInterface
    fun showToast(msg: String) {
        webView.post {
            Toast.makeText(context, msg, Toast.LENGTH_SHORT).show()
        }
    }
}

class PdfPrintDocumentAdapter(private val file: File) : PrintDocumentAdapter() {
    override fun onLayout(
        oldAttributes: PrintAttributes?,
        newAttributes: PrintAttributes,
        cancellationSignal: CancellationSignal?,
        callback: LayoutResultCallback,
        extras: Bundle?
    ) {
        if (cancellationSignal?.isCanceled == true) {
            callback.onLayoutCancelled()
            return
        }
        val info = PrintDocumentInfo.Builder(file.name)
            .setContentType(PrintDocumentInfo.CONTENT_TYPE_DOCUMENT)
            .setPageCount(PrintDocumentInfo.PAGE_COUNT_UNKNOWN)
            .build()
        callback.onLayoutFinished(info, true)
    }

    override fun onWrite(
        pages: Array<out PageRange>?,
        destination: ParcelFileDescriptor,
        cancellationSignal: CancellationSignal?,
        callback: WriteResultCallback
    ) {
        try {
            FileInputStream(file).use { input ->
                FileOutputStream(destination.fileDescriptor).use { output ->
                    input.copyTo(output)
                }
            }
            callback.onWriteFinished(arrayOf(PageRange.ALL_PAGES))
        } catch (e: Exception) {
            Log.e("PdfPrintAdapter", "Error writing PDF to print output", e)
            callback.onWriteFailed(e.message)
        }
    }
}

