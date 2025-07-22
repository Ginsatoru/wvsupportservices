import React, { useState, useEffect } from "react";
import {
  Save,
  Upload,
  MapPin,
  Phone,
  Mail,
  Building,
  Image,
} from "lucide-react";
import { getSettings, updateSettings } from "../../../services/settingsService";
import { ModernAlert } from "../Modals/Alert";

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    logo: "",
    companyName: "",
    address: "",
    phoneNumber: "",
    email: "",
    mapEmbedCode: "",
  });

  const [isDirty, setIsDirty] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isCompressing, setIsCompressing] = useState(false);
  const [alert, setAlert] = useState({ show: false, message: "", type: "" });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const data = await getSettings();
        setSettings(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to load settings:", error);
        setIsLoading(false);
      }
    };

    fetchSettings();
  }, []);

  const handleInputChange = (field, value) => {
    setSettings((prev) => ({ ...prev, [field]: value }));
    setIsDirty(true);
  };

  // Image compression function using HTMLImageElement
  const compressImage = (
    file,
    maxWidth = 800,
    maxHeight = 600,
    quality = 0.8
  ) => {
    return new Promise((resolve, reject) => {
      try {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        if (!ctx) {
          reject(new Error("Canvas context not supported"));
          return;
        }

        // Use document.createElement instead of new Image()
        const img = document.createElement("img");

        img.onload = () => {
          try {
            console.log(
              "Image loaded successfully:",
              img.naturalWidth,
              "x",
              img.naturalHeight
            );

            // Calculate new dimensions while maintaining aspect ratio
            let width = img.naturalWidth;
            let height = img.naturalHeight;

            // Only resize if image is larger than max dimensions
            if (width > maxWidth || height > maxHeight) {
              const aspectRatio = width / height;

              if (width > height) {
                width = Math.min(width, maxWidth);
                height = width / aspectRatio;
              } else {
                height = Math.min(height, maxHeight);
                width = height * aspectRatio;
              }
            }

            console.log("New dimensions:", width, "x", height);

            // Set canvas dimensions
            canvas.width = width;
            canvas.height = height;

            // Clear canvas and draw image
            ctx.clearRect(0, 0, width, height);
            ctx.drawImage(img, 0, 0, width, height);

            // Convert to compressed data URL
            const compressedDataUrl = canvas.toDataURL("image/jpeg", quality);

            if (!compressedDataUrl || compressedDataUrl === "data:,") {
              reject(new Error("Failed to generate compressed image"));
              return;
            }

            // Log size comparison
            const originalSize = file.size;
            const compressedSize = Math.round(
              (compressedDataUrl.length * 3) / 4
            );

            console.log(
              `Original: ${(originalSize / 1024).toFixed(1)}KB, Compressed: ${(
                compressedSize / 1024
              ).toFixed(1)}KB`
            );

            // Clean up
            URL.revokeObjectURL(img.src);

            resolve(compressedDataUrl);
          } catch (error) {
            console.error("Error in image processing:", error);
            reject(error);
          }
        };

        img.onerror = (error) => {
          console.error("Image loading error:", error);
          URL.revokeObjectURL(img.src);
          reject(new Error("Failed to load image file"));
        };

        // Create object URL for the image
        img.src = URL.createObjectURL(file);
      } catch (error) {
        console.error("Error setting up image compression:", error);
        reject(error);
      }
    });
  };

  const handleLogoUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    console.log("File selected:", file.name, file.type, file.size);

    // Validate file type
    if (!file.type.startsWith("image/")) {
      setAlert({
        show: true,
        message: "Please select a valid image file.",
        type: "error",
      });
      return;
    }

    // Validate file size (10MB limit before compression)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      setAlert({
        show: true,
        message:
          "Image file is too large. Please select an image smaller than 10MB.",
        type: "error",
      });
      return;
    }

    setIsCompressing(true);

    try {
      console.log("Starting compression...");

      // For very small images, skip compression
      if (file.size < 100 * 1024) {
        // Less than 100KB
        console.log("Small file, skipping compression");
        const reader = new FileReader();
        reader.onload = (e) => {
          handleInputChange("logo", e.target.result);
          setAlert({
            show: true,
            message: "Image uploaded successfully!",
            type: "success",
          });
        };
        reader.readAsDataURL(file);
      } else {
        // Compress the image
        const compressedImage = await compressImage(file, 800, 600, 0.8);

        // Update settings with compressed image
        handleInputChange("logo", compressedImage);

        setAlert({
          show: true,
          message: "Image uploaded and compressed successfully!",
          type: "success",
        });
      }
    } catch (error) {
      console.error("Compression failed:", error);

      // Fallback to original file without compression
      console.log("Falling back to original file...");
      try {
        const reader = new FileReader();
        reader.onload = (e) => {
          handleInputChange("logo", e.target.result);
          setAlert({
            show: true,
            message: "Image uploaded successfully (without compression)!",
            type: "success",
          });
        };
        reader.onerror = () => {
          setAlert({
            show: true,
            message: "Failed to process image. Please try a different image.",
            type: "error",
          });
        };
        reader.readAsDataURL(file);
      } catch (fallbackError) {
        console.error("Fallback also failed:", fallbackError);
        setAlert({
          show: true,
          message:
            "Failed to process image. Please try a different image format.",
          type: "error",
        });
      }
    } finally {
      setIsCompressing(false);
      // Reset file input
      event.target.value = "";
    }
  };

  const handleSave = async () => {
    setIsSaving(true);

    // Store current settings before making API call
    const currentSettings = { ...settings };

    try {
      const updatedSettings = await updateSettings(settings);

      // Only update settings if the API returns valid data
      // Otherwise, keep the current form data
      if (updatedSettings && typeof updatedSettings === "object") {
        // Merge the response with current settings to ensure all fields are preserved
        const mergedSettings = {
          ...currentSettings,
          ...updatedSettings,
        };
        setSettings(mergedSettings);
      } else {
        // If API doesn't return expected data, keep current settings
        console.log(
          "API response not in expected format, keeping current settings"
        );
      }

      // Show success message
      setAlert({
        show: true,
        message: "Settings saved successfully!",
        type: "success",
      });

      // Visual feedback (optional)
      const button = document.querySelector(".save-button");
      button?.classList.add("animate-pulse");
      setTimeout(() => button?.classList.remove("animate-pulse"), 2000);
    } catch (error) {
      console.error("Failed to save settings:", error);

      // Keep the form data intact even on error
      setSettings(currentSettings);

      // Handle 401 specifically
      if (error.response?.status === 401) {
        setAlert({
          show: true,
          message: "Session expired. Please login again.",
          type: "error",
        });
        setTimeout(() => {
          window.location.href = "/login";
        }, 3000);
      } else {
        setAlert({
          show: true,
          message: "Failed to save settings. Please try again.",
          type: "error",
        });
      }
    } finally {
      setIsSaving(false);

      // Delay clearing isDirty to prevent button flicker
      setTimeout(() => {
        setIsDirty(false);
      }, 300);
    }
  };

  const extractMapFromEmbed = (embedCode) => {
    const match = embedCode.match(/src="([^"]+)"/);
    return match ? match[1] : "";
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[90vh] bg-gray-50 dark:bg-gray-900 rounded-xl p-6">
        <div className="flex flex-col items-center space-y-6">
          {/* Animated spinner */}
          <div className="relative">
            <div className="w-16 h-16 border-4 border-blue-200 dark:border-blue-800 border-t-blue-600 dark:border-t-blue-500 rounded-full animate-spin"></div>
            <div
              className="absolute inset-0 w-16 h-16 border-4 border-transparent border-r-purple-600 dark:border-r-purple-500 rounded-full animate-spin"
              style={{
                animationDirection: "reverse",
                animationDuration: "1.5s",
              }}
            ></div>
          </div>

          {/* Loading text with pulse animation */}
          <div className="text-center">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
              Loading...
            </h2>
            <p className="text-gray-600 dark:text-gray-400 animate-pulse">
              Please wait while we prepare your content
            </p>
          </div>

          {/* Animated dots */}
          <div className="flex space-x-2">
            <div className="w-2 h-2 bg-blue-500 dark:bg-blue-400 rounded-full animate-bounce"></div>
            <div
              className="w-2 h-2 bg-blue-500 dark:bg-blue-400 rounded-full animate-bounce"
              style={{ animationDelay: "0.1s" }}
            ></div>
            <div
              className="w-2 h-2 bg-blue-500 dark:bg-blue-400 rounded-full animate-bounce"
              style={{ animationDelay: "0.2s" }}
            ></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-200 dark:bg-gray-900 min-h-[50vh] rounded-xl">
      {/* Modern Alert */}
      {alert.show && (
        <ModernAlert
          message={alert.message}
          type={alert.type}
          onClose={() => setAlert({ ...alert, show: false })}
        />
      )}
      <div className="container mx-auto px-4 py-1 max-w-8xl">
        <div className="mb-4">
          <h1 className="text-3xl text-gray-900 md:text-3xl font-bold dark:text-white mb-3">
            Company Settings
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base">
            Manage your company information and frontend display settings
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Settings Form */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 p-6 transition-all duration-300">
              <div className="space-y-6">
                {/* LOGO Upload */}
                <div className="group">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-3 flex items-center gap-2">
                    <Image className="w-4 h-4 text-sky-400 dark:text-sky-300" />
                    Company Logo
                  </label>
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      {settings.logo ? (
                        <img
                          src={settings.logo}
                          alt="Company Logo"
                          className="w-20 h-20 object-contain rounded-xl border-2 border-sky-100 dark:border-sky-900 bg-white dark:bg-gray-900 p-1"
                        />
                      ) : (
                        <div className="w-20 h-20 bg-gray-100 dark:bg-gray-700 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-600 flex items-center justify-center">
                          <Image className="w-6 h-6 text-gray-400 dark:text-gray-500" />
                        </div>
                      )}
                    </div>
                    <div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleLogoUpload}
                        className="hidden"
                        id="logo-upload"
                        disabled={isCompressing}
                      />
                      <label
                        htmlFor="logo-upload"
                        className={`inline-flex items-center gap-2 px-4 py-2 text-white text-sm rounded-xl cursor-pointer transition-all duration-200 ${
                          isCompressing
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-sky-500 hover:bg-sky-600"
                        }`}
                      >
                        {isCompressing ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Compressing...
                          </>
                        ) : (
                          <>
                            <Upload className="w-4 h-4" />
                            Upload Logo
                          </>
                        )}
                      </label>
                      {/* File size info */}
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        Max 10MB. Images will be automatically compressed.
                      </p>
                    </div>
                  </div>
                </div>

                {/* TEXT FIELDS */}
                {[
                  {
                    icon: Building,
                    label: "Company Name",
                    name: "companyName",
                    type: "text",
                    placeholder: "Enter company name",
                  },
                  {
                    icon: MapPin,
                    label: "Address",
                    name: "address",
                    type: "textarea",
                    placeholder: "Enter company address",
                  },
                  {
                    icon: Phone,
                    label: "Phone Number",
                    name: "phoneNumber",
                    type: "text",
                    placeholder: "Enter phone number",
                  },
                  {
                    icon: Mail,
                    label: "Email Address",
                    name: "email",
                    type: "email",
                    placeholder: "Enter email address",
                  },
                  {
                    icon: MapPin,
                    label: "Map Embed Code",
                    name: "mapEmbedCode",
                    type: "textarea",
                    placeholder: "Paste Google Maps embed code",
                  },
                ].map(({ icon: Icon, label, name, type, placeholder }) => (
                  <div key={name} className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 flex items-center gap-2">
                      <Icon className="w-4 h-4 text-sky-400 dark:text-sky-300" />
                      {label}
                    </label>
                    {type === "textarea" ? (
                      <textarea
                        value={settings[name] || ""}
                        onChange={(e) =>
                          handleInputChange(name, e.target.value)
                        }
                        rows={name === "mapEmbedCode" ? 4 : 3}
                        className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-100 rounded-xl focus:ring-1 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200 resize-none text-sm outline-none"
                        placeholder={placeholder}
                      />
                    ) : (
                      <input
                        type={type}
                        value={settings[name] || ""}
                        onChange={(e) =>
                          handleInputChange(name, e.target.value)
                        }
                        className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-100 rounded-xl focus:ring-1 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200 text-sm outline-none"
                        placeholder={placeholder}
                      />
                    )}
                    {name === "mapEmbedCode" && (
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        Get this from Google Maps → Share → Embed a map
                      </p>
                    )}
                  </div>
                ))}
              </div>

              {/* Buttons */}
              <div className="flex items-center justify-between pt-6 border-t border-gray-200 dark:border-gray-700 mt-6">
                <button
                  onClick={() => setShowPreview(!showPreview)}
                  className="px-4 py-2 text-sky-600 hover:text-sky-700 dark:text-sky-400 dark:hover:text-sky-300 text-sm font-medium transition-colors duration-200"
                >
                  {showPreview ? "Hide Preview" : "Show Preview"}
                </button>

                <button
                  onClick={handleSave}
                  disabled={!isDirty || isSaving || isCompressing}
                  className={`save-button inline-flex items-center gap-2 px-6 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isDirty && !isSaving && !isCompressing
                      ? "bg-sky-600 hover:bg-sky-700 text-white shadow hover:shadow-md"
                      : "bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                  }`}
                >
                  {isSaving ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      Save Changes
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Preview */}
          {showPreview && (
            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 p-6 sticky top-6">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">
                  Live Preview
                </h3>

                <div className="space-y-4">
                  <div className="text-center">
                    {settings.logo && (
                      <img
                        src={settings.logo}
                        alt="Company Logo"
                        className="w-16 h-16 object-contain mx-auto mb-3 rounded-xl"
                      />
                    )}
                    <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                      {settings.companyName}
                    </h2>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-sky-600 mt-0.5" />
                      <span className="text-gray-600 dark:text-gray-300">
                        {settings.address}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-sky-600" />
                      <span className="text-gray-600 dark:text-gray-300">
                        {settings.phoneNumber}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-sky-600" />
                      <span className="text-gray-600 dark:text-gray-300">
                        {settings.email}
                      </span>
                    </div>
                  </div>

                  {settings.mapEmbedCode &&
                    extractMapFromEmbed(settings.mapEmbedCode) && (
                      <div className="mt-4">
                        <h4 className="font-medium text-gray-700 dark:text-gray-200 mb-2 text-sm">
                          Map Location
                        </h4>
                        <div className="aspect-video rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                          <iframe
                            src={extractMapFromEmbed(settings.mapEmbedCode)}
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                          ></iframe>
                        </div>
                      </div>
                    )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
