var Module = typeof Module != "undefined" ? Module : {};
var ENVIRONMENT_IS_WEB = !!globalThis.window;
var ENVIRONMENT_IS_WORKER = !!globalThis.WorkerGlobalScope;
var ENVIRONMENT_IS_NODE = globalThis.process?.versions?.node && globalThis.process?.type != "renderer";
if (!Module["expectedDataFileDownloads"]) Module["expectedDataFileDownloads"] = 0;
Module["expectedDataFileDownloads"]++;
(() => {
  var isPthread = typeof ENVIRONMENT_IS_PTHREAD != "undefined" && ENVIRONMENT_IS_PTHREAD;
  var isWasmWorker = typeof ENVIRONMENT_IS_WASM_WORKER != "undefined" && ENVIRONMENT_IS_WASM_WORKER;
  if (isPthread || isWasmWorker) return;
  var isNode =
    globalThis.process &&
    globalThis.process.versions &&
    globalThis.process.versions.node &&
    globalThis.process.type != "renderer";
  async function loadPackage(metadata) {
    var PACKAGE_PATH = "";
    if (typeof window === "object") {
      PACKAGE_PATH = window["encodeURIComponent"](
        window.location.pathname.substring(0, window.location.pathname.lastIndexOf("/")) + "/"
      );
    } else if (typeof process === "undefined" && typeof location !== "undefined") {
      PACKAGE_PATH = encodeURIComponent(location.pathname.substring(0, location.pathname.lastIndexOf("/")) + "/");
    }
    var PACKAGE_NAME = "/home/caiiiycuk/vc/vc-sky/index.data";
    var REMOTE_PACKAGE_BASE = "index.data";
    var REMOTE_PACKAGE_NAME = Module["locateFile"]
      ? Module["locateFile"](REMOTE_PACKAGE_BASE, "")
      : REMOTE_PACKAGE_BASE;
    var REMOTE_PACKAGE_SIZE = metadata["remote_package_size"];
    async function fetchRemotePackage(packageName, packageSize) {
      if (isNode) {
        var contents = require("fs").readFileSync(packageName);
        return new Uint8Array(contents).buffer;
      }
      if (!Module["dataFileDownloads"]) Module["dataFileDownloads"] = {};
      try {
        var response = await fetch(packageName);
      } catch (e) {
        throw new Error(`Network Error: ${packageName}`, { e });
      }
      if (!response.ok) {
        throw new Error(`${response.status}: ${response.url}`);
      }
      const chunks = [];
      const headers = response.headers;
      const total = Number(headers.get("Content-Length") || packageSize);
      let loaded = 0;
      Module["setStatus"] && Module["setStatus"]("Downloading data...");
      const reader = response.body.getReader();
      while (1) {
        var { done, value } = await reader.read();
        if (done) break;
        chunks.push(value);
        loaded += value.length;
        Module["dataFileDownloads"][packageName] = { loaded, total };
        let totalLoaded = 0;
        let totalSize = 0;
        for (const download of Object.values(Module["dataFileDownloads"])) {
          totalLoaded += download.loaded;
          totalSize += download.total;
        }
        Module["setStatus"] && Module["setStatus"](`Downloading data... (${totalLoaded}/${totalSize})`);
      }
      const packageData = new Uint8Array(chunks.map((c) => c.length).reduce((a, b) => a + b, 0));
      let offset = 0;
      for (const chunk of chunks) {
        packageData.set(chunk, offset);
        offset += chunk.length;
      }
      return packageData.buffer;
    }
    var fetchPromise;
    var fetched =
      Module["getPreloadedPackage"] && Module["getPreloadedPackage"](REMOTE_PACKAGE_NAME, REMOTE_PACKAGE_SIZE);
    if (!fetched) {
      fetchPromise = fetchRemotePackage(REMOTE_PACKAGE_NAME, REMOTE_PACKAGE_SIZE);
    }
    async function runWithFS(Module) {
      function assert(check, msg) {
        if (!check) throw new Error(msg);
      }
      Module["FS_createPath"]("/", "vc-assets", true, true);
      Module["FS_createPath"]("/vc-assets", "local", true, true);
      Module["FS_createPath"]("/vc-assets/local", "anim", true, true);
      Module["FS_createPath"]("/vc-assets/local/anim", "cuts.img", true, true);
      Module["FS_createPath"]("/vc-assets/local", "audio", true, true);
      Module["FS_createPath"]("/vc-assets/local", "data", true, true);
      Module["FS_createPath"]("/vc-assets/local/data", "maps", true, true);
      Module["FS_createPath"]("/vc-assets/local/data/maps", "airport", true, true);
      Module["FS_createPath"]("/vc-assets/local/data/maps", "airportn", true, true);
      Module["FS_createPath"]("/vc-assets/local/data/maps", "bank", true, true);
      Module["FS_createPath"]("/vc-assets/local/data/maps", "bar", true, true);
      Module["FS_createPath"]("/vc-assets/local/data/maps", "bridge", true, true);
      Module["FS_createPath"]("/vc-assets/local/data/maps", "cisland", true, true);
      Module["FS_createPath"]("/vc-assets/local/data/maps", "club", true, true);
      Module["FS_createPath"]("/vc-assets/local/data/maps", "concerth", true, true);
      Module["FS_createPath"]("/vc-assets/local/data/maps", "docks", true, true);
      Module["FS_createPath"]("/vc-assets/local/data/maps", "downtown", true, true);
      Module["FS_createPath"]("/vc-assets/local/data/maps", "downtows", true, true);
      Module["FS_createPath"]("/vc-assets/local/data/maps", "golf", true, true);
      Module["FS_createPath"]("/vc-assets/local/data/maps", "haiti", true, true);
      Module["FS_createPath"]("/vc-assets/local/data/maps", "haitin", true, true);
      Module["FS_createPath"]("/vc-assets/local/data/maps", "hotel", true, true);
      Module["FS_createPath"]("/vc-assets/local/data/maps", "islandsf", true, true);
      Module["FS_createPath"]("/vc-assets/local/data/maps", "lawyers", true, true);
      Module["FS_createPath"]("/vc-assets/local/data/maps", "littleha", true, true);
      Module["FS_createPath"]("/vc-assets/local/data/maps", "mall", true, true);
      Module["FS_createPath"]("/vc-assets/local/data/maps", "mansion", true, true);
      Module["FS_createPath"]("/vc-assets/local/data/maps", "nbeach", true, true);
      Module["FS_createPath"]("/vc-assets/local/data/maps", "nbeachbt", true, true);
      Module["FS_createPath"]("/vc-assets/local/data/maps", "nbeachw", true, true);
      Module["FS_createPath"]("/vc-assets/local/data/maps", "oceandn", true, true);
      Module["FS_createPath"]("/vc-assets/local/data/maps", "oceandrv", true, true);
      Module["FS_createPath"]("/vc-assets/local/data/maps", "stadint", true, true);
      Module["FS_createPath"]("/vc-assets/local/data/maps", "starisl", true, true);
      Module["FS_createPath"]("/vc-assets/local/data/maps", "stripclb", true, true);
      Module["FS_createPath"]("/vc-assets/local/data/maps", "washintn", true, true);
      Module["FS_createPath"]("/vc-assets/local/data/maps", "washints", true, true);
      Module["FS_createPath"]("/vc-assets/local/data/maps", "yacht", true, true);
      Module["FS_createPath"]("/vc-assets/local/data", "paths", true, true);
      Module["FS_createPath"]("/vc-assets/local", "fonts", true, true);
      Module["FS_createPath"]("/vc-assets/local", "models", true, true);
      Module["FS_createPath"]("/vc-assets/local/models", "coll", true, true);
      Module["FS_createPath"]("/vc-assets/local/models", "generic", true, true);
      Module["FS_createPath"]("/vc-assets/local/models", "gta3.img", true, true);
      Module["FS_createPath"]("/vc-assets/local", "mp3", true, true);
      Module["FS_createPath"]("/vc-assets/local", "mss", true, true);
      Module["FS_createPath"]("/vc-assets/local", "skins", true, true);
      Module["FS_createPath"]("/vc-assets/local", "text", true, true);
      Module["FS_createPath"]("/vc-assets/local", "txd", true, true);
      for (var file of metadata["files"]) {
        var name = file["filename"];
        Module["addRunDependency"](`fp ${name}`);
      }
      async function processPackageData(arrayBuffer) {
        assert(arrayBuffer, "Loading data file failed.");
        assert(
          arrayBuffer.constructor.name === ArrayBuffer.name,
          "bad input to processPackageData " + arrayBuffer.constructor.name
        );
        var byteArray = new Uint8Array(arrayBuffer);
        for (var file of metadata["files"]) {
          var name = file["filename"];
          var data = byteArray.subarray(file["start"], file["end"]);
          Module["FS_createDataFile"](name, null, data, true, true, true);
          Module["removeRunDependency"](`fp ${name}`);
        }
        Module["removeRunDependency"]("datafile_/home/caiiiycuk/vc/vc-sky/index.data");
      }
      Module["addRunDependency"]("datafile_/home/caiiiycuk/vc/vc-sky/index.data");
      if (!Module["preloadResults"]) Module["preloadResults"] = {};
      Module["preloadResults"][PACKAGE_NAME] = { fromCache: false };
      if (!fetched) {
        fetched = await fetchPromise;
      }
      processPackageData(fetched);
    }
    if (Module["calledRun"]) {
      runWithFS(Module);
    } else {
      if (!Module["preRun"]) Module["preRun"] = [];
      Module["preRun"].push(runWithFS);
    }
  }
  loadPackage({
    files: [
      { filename: "/vc-assets/local/anim/cuts.dir", start: 0, end: 4736 },
      { filename: "/vc-assets/local/anim/cuts.img/int_a.dat", start: 4736, end: 8832 },
      { filename: "/vc-assets/local/anim/cuts.img/int_a.ifp", start: 8832, end: 1479296 },
      { filename: "/vc-assets/local/anim/cuts.img/int_d.dat", start: 1479296, end: 1487488 },
      { filename: "/vc-assets/local/anim/cuts.img/int_d.ifp", start: 1487488, end: 4061824 },
      { filename: "/vc-assets/local/anim/cuts.img/int_m.dat", start: 4061824, end: 4065920 },
      { filename: "/vc-assets/local/anim/cuts.img/int_m.ifp", start: 4065920, end: 5403264 },
      { filename: "/vc-assets/local/anim/ped.ifp", start: 5403264, end: 7604416 },
      { filename: "/vc-assets/local/audio/flash.adf", start: 7604416, end: 33051462 },
      { filename: "/vc-assets/local/audio/sfx.sdt", start: 33051462, end: 33250282 },
      { filename: "/vc-assets/local/audio/sound.cache", start: 33250282, end: 33255178 },
      { filename: "/vc-assets/local/data/animviewer.dat", start: 33255178, end: 33256272 },
      { filename: "/vc-assets/local/data/carcols.dat", start: 33256272, end: 33264219 },
      { filename: "/vc-assets/local/data/cullzone.dat", start: 33264219, end: 33419527 },
      { filename: "/vc-assets/local/data/cullzoneempty.dat", start: 33419527, end: 33580651 },
      { filename: "/vc-assets/local/data/debug.sc", start: 33580651, end: 33586029 },
      { filename: "/vc-assets/local/data/default.dat", start: 33586029, end: 33586532 },
      { filename: "/vc-assets/local/data/default.ide", start: 33586532, end: 33607379 },
      { filename: "/vc-assets/local/data/fistfite.dat", start: 33607379, end: 33609312 },
      { filename: "/vc-assets/local/data/freeroam_miami.scm", start: 33609312, end: 33647509 },
      { filename: "/vc-assets/local/data/gta_vc.dat", start: 33647509, end: 33650034 },
      { filename: "/vc-assets/local/data/handling.cfg", start: 33650034, end: 33675862 },
      { filename: "/vc-assets/local/data/info.zon", start: 33675862, end: 33686345 },
      { filename: "/vc-assets/local/data/main.sc", start: 33686345, end: 33691860 },
      { filename: "/vc-assets/local/data/main.scm", start: 33691860, end: 34960993 },
      { filename: "/vc-assets/local/data/map.zon", start: 34960993, end: 34963147 },
      { filename: "/vc-assets/local/data/maps/airport/airport.col", start: 34963147, end: 35287359 },
      { filename: "/vc-assets/local/data/maps/airport/airport.ide", start: 35287359, end: 35303622 },
      { filename: "/vc-assets/local/data/maps/airport/airport.ipl", start: 35303622, end: 35341367 },
      { filename: "/vc-assets/local/data/maps/airportn/airportn.col", start: 35341367, end: 35552347 },
      { filename: "/vc-assets/local/data/maps/airportn/airportn.ide", start: 35552347, end: 35557003 },
      { filename: "/vc-assets/local/data/maps/airportn/airportn.ipl", start: 35557003, end: 35577974 },
      { filename: "/vc-assets/local/data/maps/bank/bank.col", start: 35577974, end: 35595190 },
      { filename: "/vc-assets/local/data/maps/bank/bank.ide", start: 35595190, end: 35602876 },
      { filename: "/vc-assets/local/data/maps/bank/bank.ipl", start: 35602876, end: 35607855 },
      { filename: "/vc-assets/local/data/maps/bar/bar.ide", start: 35607855, end: 35607891 },
      { filename: "/vc-assets/local/data/maps/bridge/bridge.col", start: 35607891, end: 35707447 },
      { filename: "/vc-assets/local/data/maps/bridge/bridge.ide", start: 35707447, end: 35709471 },
      { filename: "/vc-assets/local/data/maps/bridge/bridge.ipl", start: 35709471, end: 35714302 },
      { filename: "/vc-assets/local/data/maps/cisland/cisland.col", start: 35714302, end: 35935594 },
      { filename: "/vc-assets/local/data/maps/cisland/cisland.ide", start: 35935594, end: 35944601 },
      { filename: "/vc-assets/local/data/maps/cisland/cisland.ipl", start: 35944601, end: 35970231 },
      { filename: "/vc-assets/local/data/maps/club/club.col", start: 35970231, end: 35994243 },
      { filename: "/vc-assets/local/data/maps/club/club.ide", start: 35994243, end: 36003567 },
      { filename: "/vc-assets/local/data/maps/club/club.ipl", start: 36003567, end: 36010521 },
      { filename: "/vc-assets/local/data/maps/concerth/concerth.col", start: 36010521, end: 36021101 },
      { filename: "/vc-assets/local/data/maps/concerth/concerth.ide", start: 36021101, end: 36029269 },
      { filename: "/vc-assets/local/data/maps/concerth/concerth.ipl", start: 36029269, end: 36031081 },
      { filename: "/vc-assets/local/data/maps/cull.ipl", start: 36031081, end: 36087558 },
      { filename: "/vc-assets/local/data/maps/docks/docks.col", start: 36087558, end: 36384002 },
      { filename: "/vc-assets/local/data/maps/docks/docks.ide", start: 36384002, end: 36393133 },
      { filename: "/vc-assets/local/data/maps/docks/docks.ipl", start: 36393133, end: 36423386 },
      { filename: "/vc-assets/local/data/maps/downtown/downtown.col", start: 36423386, end: 36928174 },
      { filename: "/vc-assets/local/data/maps/downtown/downtown.ide", start: 36928174, end: 36950875 },
      { filename: "/vc-assets/local/data/maps/downtown/downtown.ipl", start: 36950875, end: 37005634 },
      { filename: "/vc-assets/local/data/maps/downtows/downtows.col", start: 37005634, end: 37261898 },
      { filename: "/vc-assets/local/data/maps/downtows/downtows.ide", start: 37261898, end: 37268739 },
      { filename: "/vc-assets/local/data/maps/downtows/downtows.ipl", start: 37268739, end: 37295153 },
      { filename: "/vc-assets/local/data/maps/generic.ide", start: 37295153, end: 37316882 },
      { filename: "/vc-assets/local/data/maps/golf/golf.col", start: 37316882, end: 37677702 },
      { filename: "/vc-assets/local/data/maps/golf/golf.ide", start: 37677702, end: 37683299 },
      { filename: "/vc-assets/local/data/maps/golf/golf.ipl", start: 37683299, end: 37700668 },
      { filename: "/vc-assets/local/data/maps/haiti/haiti.col", start: 37700668, end: 38053200 },
      { filename: "/vc-assets/local/data/maps/haiti/haiti.ide", start: 38053200, end: 38059021 },
      { filename: "/vc-assets/local/data/maps/haiti/haiti.ipl", start: 38059021, end: 38097841 },
      { filename: "/vc-assets/local/data/maps/haitin/haitin.col", start: 38097841, end: 38399185 },
      { filename: "/vc-assets/local/data/maps/haitin/haitin.ide", start: 38399185, end: 38404988 },
      { filename: "/vc-assets/local/data/maps/haitin/haitin.ipl", start: 38404988, end: 38431403 },
      { filename: "/vc-assets/local/data/maps/hotel/hotel.col", start: 38431403, end: 38442583 },
      { filename: "/vc-assets/local/data/maps/hotel/hotel.ide", start: 38442583, end: 38447264 },
      { filename: "/vc-assets/local/data/maps/hotel/hotel.ipl", start: 38447264, end: 38456197 },
      { filename: "/vc-assets/local/data/maps/islandsf/islandsf.col", start: 38456197, end: 38464753 },
      { filename: "/vc-assets/local/data/maps/islandsf/islandsf.ide", start: 38464753, end: 38468656 },
      { filename: "/vc-assets/local/data/maps/islandsf/islandsf.ipl", start: 38468656, end: 38478914 },
      { filename: "/vc-assets/local/data/maps/lawyers/lawyers.col", start: 38478914, end: 38494706 },
      { filename: "/vc-assets/local/data/maps/lawyers/lawyers.ide", start: 38494706, end: 38495778 },
      { filename: "/vc-assets/local/data/maps/lawyers/lawyers.ipl", start: 38495778, end: 38497193 },
      { filename: "/vc-assets/local/data/maps/littleha/littleha.col", start: 38497193, end: 38864753 },
      { filename: "/vc-assets/local/data/maps/littleha/littleha.ide", start: 38864753, end: 38880021 },
      { filename: "/vc-assets/local/data/maps/littleha/littleha.ipl", start: 38880021, end: 38948253 },
      { filename: "/vc-assets/local/data/maps/mall/mall.col", start: 38948253, end: 39150745 },
      { filename: "/vc-assets/local/data/maps/mall/mall.ide", start: 39150745, end: 39160592 },
      { filename: "/vc-assets/local/data/maps/mall/mall.ipl", start: 39160592, end: 39184369 },
      { filename: "/vc-assets/local/data/maps/mansion/mansion.col", start: 39184369, end: 39337245 },
      { filename: "/vc-assets/local/data/maps/mansion/mansion.ide", start: 39337245, end: 39346762 },
      { filename: "/vc-assets/local/data/maps/mansion/mansion.ipl", start: 39346762, end: 39361821 },
      { filename: "/vc-assets/local/data/maps/map0.dat", start: 39361821, end: 39362479 },
      { filename: "/vc-assets/local/data/maps/map1.dat", start: 39362479, end: 39363137 },
      { filename: "/vc-assets/local/data/maps/map2.dat", start: 39363137, end: 39363795 },
      { filename: "/vc-assets/local/data/maps/map3.dat", start: 39363795, end: 39364453 },
      { filename: "/vc-assets/local/data/maps/map4.dat", start: 39364453, end: 39365111 },
      { filename: "/vc-assets/local/data/maps/map5.dat", start: 39365111, end: 39365769 },
      { filename: "/vc-assets/local/data/maps/map6.dat", start: 39365769, end: 39366427 },
      { filename: "/vc-assets/local/data/maps/map7.dat", start: 39366427, end: 39367085 },
      { filename: "/vc-assets/local/data/maps/nbeach/nbeach.col", start: 39367085, end: 39723785 },
      { filename: "/vc-assets/local/data/maps/nbeach/nbeach.ide", start: 39723785, end: 39729306 },
      { filename: "/vc-assets/local/data/maps/nbeach/nbeach.ipl", start: 39729306, end: 39772162 },
      { filename: "/vc-assets/local/data/maps/nbeachbt/nbeachbt.col", start: 39772162, end: 40267550 },
      { filename: "/vc-assets/local/data/maps/nbeachbt/nbeachbt.ide", start: 40267550, end: 40277712 },
      { filename: "/vc-assets/local/data/maps/nbeachbt/nbeachbt.ipl", start: 40277712, end: 40351880 },
      { filename: "/vc-assets/local/data/maps/nbeachw/nbeachw.col", start: 40351880, end: 40613460 },
      { filename: "/vc-assets/local/data/maps/nbeachw/nbeachw.ide", start: 40613460, end: 40622721 },
      { filename: "/vc-assets/local/data/maps/nbeachw/nbeachw.ipl", start: 40622721, end: 40663666 },
      { filename: "/vc-assets/local/data/maps/oceandn/oceandn.col", start: 40663666, end: 40954358 },
      { filename: "/vc-assets/local/data/maps/oceandn/oceandn.ide", start: 40954358, end: 40974676 },
      { filename: "/vc-assets/local/data/maps/oceandn/oceandn.ipl", start: 40974676, end: 41051625 },
      { filename: "/vc-assets/local/data/maps/oceandrv/oceandrv.col", start: 41051625, end: 41228733 },
      { filename: "/vc-assets/local/data/maps/oceandrv/oceandrv.ide", start: 41228733, end: 41241943 },
      { filename: "/vc-assets/local/data/maps/oceandrv/oceandrv.ipl", start: 41241943, end: 41292132 },
      { filename: "/vc-assets/local/data/maps/paths.ipl", start: 41292132, end: 42438238 },
      { filename: "/vc-assets/local/data/maps/stadint/stadint.col", start: 42438238, end: 42871574 },
      { filename: "/vc-assets/local/data/maps/stadint/stadint.ide", start: 42871574, end: 42881894 },
      { filename: "/vc-assets/local/data/maps/stadint/stadint.ipl", start: 42881894, end: 42889167 },
      { filename: "/vc-assets/local/data/maps/starisl/starisl.col", start: 42889167, end: 43135687 },
      { filename: "/vc-assets/local/data/maps/starisl/starisl.ide", start: 43135687, end: 43139685 },
      { filename: "/vc-assets/local/data/maps/starisl/starisl.ipl", start: 43139685, end: 43178706 },
      { filename: "/vc-assets/local/data/maps/stripclb/stripclb.col", start: 43178706, end: 43207698 },
      { filename: "/vc-assets/local/data/maps/stripclb/stripclb.ide", start: 43207698, end: 43212847 },
      { filename: "/vc-assets/local/data/maps/stripclb/stripclb.ipl", start: 43212847, end: 43214015 },
      { filename: "/vc-assets/local/data/maps/washintn/washintn.col", start: 43214015, end: 43489127 },
      { filename: "/vc-assets/local/data/maps/washintn/washintn.ide", start: 43489127, end: 43506624 },
      { filename: "/vc-assets/local/data/maps/washintn/washintn.ipl", start: 43506624, end: 43589579 },
      { filename: "/vc-assets/local/data/maps/washints/washints.col", start: 43589579, end: 43898783 },
      { filename: "/vc-assets/local/data/maps/washints/washints.ide", start: 43898783, end: 43920082 },
      { filename: "/vc-assets/local/data/maps/washints/washints.ipl", start: 43920082, end: 43987513 },
      { filename: "/vc-assets/local/data/maps/yacht/yacht.col", start: 43987513, end: 44012449 },
      { filename: "/vc-assets/local/data/maps/yacht/yacht.ide", start: 44012449, end: 44014827 },
      { filename: "/vc-assets/local/data/maps/yacht/yacht.ipl", start: 44014827, end: 44014903 },
      { filename: "/vc-assets/local/data/navig.zon", start: 44014903, end: 44015662 },
      { filename: "/vc-assets/local/data/object.dat", start: 44015662, end: 44041939 },
      { filename: "/vc-assets/local/data/occlu.ipl", start: 44041939, end: 44063666 },
      { filename: "/vc-assets/local/data/particle.cfg", start: 44063666, end: 44081004 },
      { filename: "/vc-assets/local/data/paths/flight.dat", start: 44081004, end: 44089044 },
      { filename: "/vc-assets/local/data/paths/flight2.dat", start: 44089044, end: 44092499 },
      { filename: "/vc-assets/local/data/paths/flight3.dat", start: 44092499, end: 44104303 },
      { filename: "/vc-assets/local/data/paths/spath0.dat", start: 44104303, end: 44106109 },
      { filename: "/vc-assets/local/data/ped.dat", start: 44106109, end: 44108124 },
      { filename: "/vc-assets/local/data/pedgrp.dat", start: 44108124, end: 44116559 },
      { filename: "/vc-assets/local/data/pedstats.dat", start: 44116559, end: 44119781 },
      { filename: "/vc-assets/local/data/surface.dat", start: 44119781, end: 44120343 },
      { filename: "/vc-assets/local/data/timecyc.dat", start: 44120343, end: 44166483 },
      { filename: "/vc-assets/local/data/train.dat", start: 44166483, end: 44168934 },
      { filename: "/vc-assets/local/data/train2.dat", start: 44168934, end: 44173128 },
      { filename: "/vc-assets/local/data/water.dat", start: 44173128, end: 44174357 },
      { filename: "/vc-assets/local/data/waterpro.dat", start: 44174357, end: 44195801 },
      { filename: "/vc-assets/local/data/weapon.dat", start: 44195801, end: 44202619 },
      { filename: "/vc-assets/local/fonts/sansation.ttf", start: 44202619, end: 44281083 },
      { filename: "/vc-assets/local/gamecontrollerdb.txt", start: 44281083, end: 44533234 },
      { filename: "/vc-assets/local/installscript.vdf", start: 44533234, end: 44533417 },
      { filename: "/vc-assets/local/models/coll/generic.col", start: 44533417, end: 44618189 },
      { filename: "/vc-assets/local/models/coll/peds.col", start: 44618189, end: 44639666 },
      { filename: "/vc-assets/local/models/coll/vehicles.col", start: 44639666, end: 44745262 },
      { filename: "/vc-assets/local/models/coll/weapons.col", start: 44745262, end: 44745710 },
      { filename: "/vc-assets/local/models/fonts.txd", start: 44745710, end: 45270294 },
      { filename: "/vc-assets/local/models/fonts_r.txd", start: 45270294, end: 45794878 },
      { filename: "/vc-assets/local/models/fronten1.txd", start: 45794878, end: 45992934 },
      { filename: "/vc-assets/local/models/fronten2.txd", start: 45992934, end: 46741518 },
      { filename: "/vc-assets/local/models/frontend_ds2.txd", start: 46741518, end: 47071494 },
      { filename: "/vc-assets/local/models/frontend_ds3.txd", start: 47071494, end: 47596462 },
      { filename: "/vc-assets/local/models/frontend_ds4.txd", start: 47596462, end: 48121430 },
      { filename: "/vc-assets/local/models/frontend_nsw.txd", start: 48121430, end: 50481534 },
      { filename: "/vc-assets/local/models/frontend_x360.txd", start: 50481534, end: 51006502 },
      { filename: "/vc-assets/local/models/frontend_xone.txd", start: 51006502, end: 51531470 },
      { filename: "/vc-assets/local/models/generic.txd", start: 51531470, end: 52699846 },
      { filename: "/vc-assets/local/models/generic/air_vlo.dff", start: 52699846, end: 52706762 },
      { filename: "/vc-assets/local/models/generic/arrow.dff", start: 52706762, end: 52711611 },
      { filename: "/vc-assets/local/models/generic/player.bmp", start: 52711611, end: 52778223 },
      { filename: "/vc-assets/local/models/generic/wheels.dff", start: 52778223, end: 52874290 },
      { filename: "/vc-assets/local/models/generic/wheels.txd", start: 52874290, end: 52898266 },
      { filename: "/vc-assets/local/models/generic/zonecylb.dff", start: 52898266, end: 52900526 },
      { filename: "/vc-assets/local/models/gta3.dir", start: 52900526, end: 53093902 },
      { filename: "/vc-assets/local/models/gta3.img/admiral.dff", start: 53093902, end: 53272078 },
      { filename: "/vc-assets/local/models/gta3.img/admiral.txd", start: 53272078, end: 53317134 },
      { filename: "/vc-assets/local/models/gta3.img/air_brway_030.dff", start: 53317134, end: 53343758 },
      { filename: "/vc-assets/local/models/gta3.img/air_brway_34.dff", start: 53343758, end: 53370382 },
      { filename: "/vc-assets/local/models/gta3.img/airgrndb.txd", start: 53370382, end: 53380622 },
      { filename: "/vc-assets/local/models/gta3.img/airplan.dff", start: 53380622, end: 53450254 },
      { filename: "/vc-assets/local/models/gta3.img/airplan.txd", start: 53450254, end: 53589518 },
      { filename: "/vc-assets/local/models/gta3.img/airport.col", start: 53589518, end: 53915150 },
      { filename: "/vc-assets/local/models/gta3.img/airport.txd", start: 53915150, end: 54064654 },
      { filename: "/vc-assets/local/models/gta3.img/airporterminal.txd", start: 54064654, end: 54328846 },
      { filename: "/vc-assets/local/models/gta3.img/airportn.col", start: 54328846, end: 54541838 },
      { filename: "/vc-assets/local/models/gta3.img/airsignn.txd", start: 54541838, end: 54629902 },
      { filename: "/vc-assets/local/models/gta3.img/airstuff2.txd", start: 54629902, end: 54656526 },
      { filename: "/vc-assets/local/models/gta3.img/airtrain.dff", start: 54656526, end: 54750734 },
      { filename: "/vc-assets/local/models/gta3.img/airtrain.txd", start: 54750734, end: 54777358 },
      { filename: "/vc-assets/local/models/gta3.img/alleyprop.txd", start: 54777358, end: 54803982 },
      { filename: "/vc-assets/local/models/gta3.img/ap_3dbillb.dff", start: 54803982, end: 54869518 },
      { filename: "/vc-assets/local/models/gta3.img/ap_barriergate3.dff", start: 54869518, end: 54892046 },
      { filename: "/vc-assets/local/models/gta3.img/ap_billboard.txd", start: 54892046, end: 55127566 },
      { filename: "/vc-assets/local/models/gta3.img/ap_billboards3.dff", start: 55127566, end: 55150094 },
      { filename: "/vc-assets/local/models/gta3.img/ap_blastdef_03.dff", start: 55150094, end: 55162382 },
      { filename: "/vc-assets/local/models/gta3.img/ap_boardshad1.dff", start: 55162382, end: 55168526 },
      { filename: "/vc-assets/local/models/gta3.img/ap_build1.txd", start: 55168526, end: 55248398 },
      { filename: "/vc-assets/local/models/gta3.img/ap_build2.txd", start: 55248398, end: 55606798 },
      { filename: "/vc-assets/local/models/gta3.img/ap_buildings2.txd", start: 55606798, end: 55879182 },
      { filename: "/vc-assets/local/models/gta3.img/ap_carbush2_01.dff", start: 55879182, end: 55909902 },
      { filename: "/vc-assets/local/models/gta3.img/ap_carparkterm1.dff", start: 55909902, end: 55985678 },
      { filename: "/vc-assets/local/models/gta3.img/ap_clothes.txd", start: 55985678, end: 56071694 },
      { filename: "/vc-assets/local/models/gta3.img/ap_dockstairs1.dff", start: 56071694, end: 56104462 },
      { filename: "/vc-assets/local/models/gta3.img/ap_firetrucks.dff", start: 56104462, end: 56133134 },
      { filename: "/vc-assets/local/models/gta3.img/ap_francisland.txd", start: 56133134, end: 56323598 },
      { filename: "/vc-assets/local/models/gta3.img/ap_ground1.txd", start: 56323598, end: 56473102 },
      { filename: "/vc-assets/local/models/gta3.img/ap_hangar1_01.dff", start: 56473102, end: 56540686 },
      { filename: "/vc-assets/local/models/gta3.img/ap_hland_01.dff", start: 56540686, end: 56552974 },
      { filename: "/vc-assets/local/models/gta3.img/ap_jumbo_01.dff", start: 56552974, end: 56610318 },
      { filename: "/vc-assets/local/models/gta3.img/ap_jumbo_bridge.dff", start: 56610318, end: 56667662 },
      { filename: "/vc-assets/local/models/gta3.img/ap_jumbos.txd", start: 56667662, end: 56837646 },
      { filename: "/vc-assets/local/models/gta3.img/ap_learjet1_01.dff", start: 56837646, end: 56888846 },
      { filename: "/vc-assets/local/models/gta3.img/ap_learjets.txd", start: 56888846, end: 56901134 },
      { filename: "/vc-assets/local/models/gta3.img/ap_lod.txd", start: 56901134, end: 56942094 },
      { filename: "/vc-assets/local/models/gta3.img/ap_lodbit.txd", start: 56942094, end: 56946190 },
      { filename: "/vc-assets/local/models/gta3.img/ap_misc1bit.txd", start: 56946190, end: 57013774 },
      { filename: "/vc-assets/local/models/gta3.img/ap_newesca_01.dff", start: 57013774, end: 57093646 },
      { filename: "/vc-assets/local/models/gta3.img/ap_newescaglas_01.dff", start: 57093646, end: 57112078 },
      { filename: "/vc-assets/local/models/gta3.img/ap_newprops1opac.txd", start: 57112078, end: 57128462 },
      { filename: "/vc-assets/local/models/gta3.img/ap_radar1_01.dff", start: 57128462, end: 57148942 },
      { filename: "/vc-assets/local/models/gta3.img/ap_rland04.dff", start: 57148942, end: 57169422 },
      { filename: "/vc-assets/local/models/gta3.img/ap_rland06.dff", start: 57169422, end: 57187854 },
      { filename: "/vc-assets/local/models/gta3.img/ap_rland07.dff", start: 57187854, end: 57196046 },
      { filename: "/vc-assets/local/models/gta3.img/ap_rland10.dff", start: 57196046, end: 57212430 },
      { filename: "/vc-assets/local/models/gta3.img/ap_rlandnew9.dff", start: 57212430, end: 57232910 },
      { filename: "/vc-assets/local/models/gta3.img/ap_roads.txd", start: 57232910, end: 57544206 },
      { filename: "/vc-assets/local/models/gta3.img/ap_roadsect1.dff", start: 57544206, end: 57570830 },
      { filename: "/vc-assets/local/models/gta3.img/ap_roadsect1.txd", start: 57570830, end: 57714190 },
      { filename: "/vc-assets/local/models/gta3.img/ap_roadsect2a.dff", start: 57714190, end: 57740814 },
      { filename: "/vc-assets/local/models/gta3.img/ap_roadsect3.dff", start: 57740814, end: 57779726 },
      { filename: "/vc-assets/local/models/gta3.img/ap_roadsect3b.dff", start: 57779726, end: 57804302 },
      { filename: "/vc-assets/local/models/gta3.img/ap_roadsect4.dff", start: 57804302, end: 57941518 },
      { filename: "/vc-assets/local/models/gta3.img/ap_roadsect5.dff", start: 57941518, end: 57986574 },
      { filename: "/vc-assets/local/models/gta3.img/ap_runsign3_01.dff", start: 57986574, end: 57998862 },
      { filename: "/vc-assets/local/models/gta3.img/ap_runsigns1.txd", start: 57998862, end: 58101262 },
      { filename: "/vc-assets/local/models/gta3.img/ap_seaplanedock1.dff", start: 58101262, end: 58121742 },
      { filename: "/vc-assets/local/models/gta3.img/ap_seaplanprop.txd", start: 58121742, end: 58441230 },
      { filename: "/vc-assets/local/models/gta3.img/ap_smahangar2_01.dff", start: 58441230, end: 58445326 },
      { filename: "/vc-assets/local/models/gta3.img/ap_smallradar1_02.dff", start: 58445326, end: 58455566 },
      { filename: "/vc-assets/local/models/gta3.img/ap_steps1_01.dff", start: 58455566, end: 58478094 },
      { filename: "/vc-assets/local/models/gta3.img/ap_stepsn1_01.dff", start: 58478094, end: 58500622 },
      { filename: "/vc-assets/local/models/gta3.img/ap_termbbase1.dff", start: 58500622, end: 58539534 },
      { filename: "/vc-assets/local/models/gta3.img/ap_termina2_01.dff", start: 58539534, end: 58568206 },
      { filename: "/vc-assets/local/models/gta3.img/ap_termina_01.dff", start: 58568206, end: 58596878 },
      { filename: "/vc-assets/local/models/gta3.img/ap_termina_roof1.dff", start: 58596878, end: 58607118 },
      { filename: "/vc-assets/local/models/gta3.img/ap_termina_roof2.dff", start: 58607118, end: 58617358 },
      { filename: "/vc-assets/local/models/gta3.img/ap_terminagrflo1.dff", start: 58617358, end: 58625550 },
      { filename: "/vc-assets/local/models/gta3.img/ap_terminagrflo2.dff", start: 58625550, end: 58633742 },
      { filename: "/vc-assets/local/models/gta3.img/ap_terminal1.txd", start: 58633742, end: 58908174 },
      { filename: "/vc-assets/local/models/gta3.img/ap_terminal1boards.txd", start: 58908174, end: 59188750 },
      { filename: "/vc-assets/local/models/gta3.img/ap_terminalb1.dff", start: 59188750, end: 59272718 },
      { filename: "/vc-assets/local/models/gta3.img/ap_termsign1_dy.dff", start: 59272718, end: 59274766 },
      { filename: "/vc-assets/local/models/gta3.img/ap_termwindows.txd", start: 59274766, end: 59442702 },
      { filename: "/vc-assets/local/models/gta3.img/ap_termwindows1.dff", start: 59442702, end: 59454990 },
      { filename: "/vc-assets/local/models/gta3.img/ap_termwindows1b.dff", start: 59454990, end: 59461134 },
      { filename: "/vc-assets/local/models/gta3.img/ap_tower.dff", start: 59461134, end: 59481614 },
      { filename: "/vc-assets/local/models/gta3.img/ap_trailer_01.dff", start: 59481614, end: 59528718 },
      { filename: "/vc-assets/local/models/gta3.img/ap_treesfw1_01.dff", start: 59528718, end: 59538958 },
      { filename: "/vc-assets/local/models/gta3.img/ap_treeshot1_02.dff", start: 59538958, end: 59553294 },
      { filename: "/vc-assets/local/models/gta3.img/ap_viceairport.txd", start: 59553294, end: 59743758 },
      { filename: "/vc-assets/local/models/gta3.img/ap_wallfence2.dff", start: 59743758, end: 59756046 },
      { filename: "/vc-assets/local/models/gta3.img/ap_wallfence3.dff", start: 59756046, end: 59770382 },
      { filename: "/vc-assets/local/models/gta3.img/ap_wallfence4.dff", start: 59770382, end: 59786766 },
      { filename: "/vc-assets/local/models/gta3.img/ap_wallfence5.dff", start: 59786766, end: 59805198 },
      { filename: "/vc-assets/local/models/gta3.img/ap_wallfence7.dff", start: 59805198, end: 59813390 },
      { filename: "/vc-assets/local/models/gta3.img/ap_windowstruts.dff", start: 59813390, end: 59872782 },
      { filename: "/vc-assets/local/models/gta3.img/apairprtbits07.dff", start: 59872782, end: 59876878 },
      { filename: "/vc-assets/local/models/gta3.img/apcarparkn.txd", start: 59876878, end: 59938318 },
      { filename: "/vc-assets/local/models/gta3.img/apchecpointn.txd", start: 59938318, end: 60016142 },
      { filename: "/vc-assets/local/models/gta3.img/apgroundn.txd", start: 60016142, end: 60108302 },
      { filename: "/vc-assets/local/models/gta3.img/apjumbon.txd", start: 60108302, end: 60278286 },
      { filename: "/vc-assets/local/models/gta3.img/aproadsn.txd", start: 60278286, end: 60558862 },
      { filename: "/vc-assets/local/models/gta3.img/b_hse_doors.dff", start: 60558862, end: 60560910 },
      { filename: "/vc-assets/local/models/gta3.img/b_hse_ext.dff", start: 60560910, end: 60585486 },
      { filename: "/vc-assets/local/models/gta3.img/b_hse_interior.dff", start: 60585486, end: 60610062 },
      { filename: "/vc-assets/local/models/gta3.img/b_hse_interiorrays.dff", start: 60610062, end: 60614158 },
      { filename: "/vc-assets/local/models/gta3.img/b_hse_pier.dff", start: 60614158, end: 60739086 },
      { filename: "/vc-assets/local/models/gta3.img/b_hse_pierfence.dff", start: 60739086, end: 60751374 },
      { filename: "/vc-assets/local/models/gta3.img/baggage.dff", start: 60751374, end: 60847630 },
      { filename: "/vc-assets/local/models/gta3.img/baggage.txd", start: 60847630, end: 60870158 },
      { filename: "/vc-assets/local/models/gta3.img/bank.col", start: 60870158, end: 60888590 },
      { filename: "/vc-assets/local/models/gta3.img/banshee.dff", start: 60888590, end: 61033998 },
      { filename: "/vc-assets/local/models/gta3.img/banshee.txd", start: 61033998, end: 61077006 },
      { filename: "/vc-assets/local/models/gta3.img/baseball.ifp", start: 61077006, end: 61136398 },
      { filename: "/vc-assets/local/models/gta3.img/basketballcourt04.dff", start: 61136398, end: 61158926 },
      { filename: "/vc-assets/local/models/gta3.img/bat.dff", start: 61158926, end: 61163022 },
      { filename: "/vc-assets/local/models/gta3.img/bat.txd", start: 61163022, end: 61171214 },
      { filename: "/vc-assets/local/models/gta3.img/beach_bush02.dff", start: 61171214, end: 61173262 },
      { filename: "/vc-assets/local/models/gta3.img/beach_bush06s.dff", start: 61173262, end: 61177358 },
      { filename: "/vc-assets/local/models/gta3.img/beach_bush08s.dff", start: 61177358, end: 61181454 },
      { filename: "/vc-assets/local/models/gta3.img/beachlo1.dff", start: 61181454, end: 61185550 },
      { filename: "/vc-assets/local/models/gta3.img/benson.dff", start: 61185550, end: 61359630 },
      { filename: "/vc-assets/local/models/gta3.img/benson.txd", start: 61359630, end: 61470222 },
      { filename: "/vc-assets/local/models/gta3.img/bfinject.dff", start: 61470222, end: 61599246 },
      { filename: "/vc-assets/local/models/gta3.img/bfinject.txd", start: 61599246, end: 61638158 },
      { filename: "/vc-assets/local/models/gta3.img/bfost.dff", start: 61638158, end: 61705742 },
      { filename: "/vc-assets/local/models/gta3.img/bfost.txd", start: 61705742, end: 61728270 },
      { filename: "/vc-assets/local/models/gta3.img/bfotr.dff", start: 61728270, end: 61793806 },
      { filename: "/vc-assets/local/models/gta3.img/bfotr.txd", start: 61793806, end: 61816334 },
      { filename: "/vc-assets/local/models/gta3.img/bfypr.dff", start: 61816334, end: 61875726 },
      { filename: "/vc-assets/local/models/gta3.img/bfypr.txd", start: 61875726, end: 61898254 },
      { filename: "/vc-assets/local/models/gta3.img/bfyst.dff", start: 61898254, end: 61963790 },
      { filename: "/vc-assets/local/models/gta3.img/bfyst.txd", start: 61963790, end: 61986318 },
      { filename: "/vc-assets/local/models/gta3.img/biked.ifp", start: 61986318, end: 62127630 },
      { filename: "/vc-assets/local/models/gta3.img/bikeh.ifp", start: 62127630, end: 62238222 },
      { filename: "/vc-assets/local/models/gta3.img/bikes.ifp", start: 62238222, end: 62371342 },
      { filename: "/vc-assets/local/models/gta3.img/bikev.ifp", start: 62371342, end: 62459406 },
      { filename: "/vc-assets/local/models/gta3.img/billbd3.dff", start: 62459406, end: 62488078 },
      { filename: "/vc-assets/local/models/gta3.img/billbrd.txd", start: 62488078, end: 62539278 },
      { filename: "/vc-assets/local/models/gta3.img/blimp_day.dff", start: 62539278, end: 62551566 },
      { filename: "/vc-assets/local/models/gta3.img/blimp_night.dff", start: 62551566, end: 62563854 },
      { filename: "/vc-assets/local/models/gta3.img/blistac.dff", start: 62563854, end: 62729742 },
      { filename: "/vc-assets/local/models/gta3.img/blistac.txd", start: 62729742, end: 62774798 },
      { filename: "/vc-assets/local/models/gta3.img/bmodk.dff", start: 62774798, end: 62846478 },
      { filename: "/vc-assets/local/models/gta3.img/bmodk.txd", start: 62846478, end: 62869006 },
      { filename: "/vc-assets/local/models/gta3.img/bmost.dff", start: 62869006, end: 62948878 },
      { filename: "/vc-assets/local/models/gta3.img/bmost.txd", start: 62948878, end: 62971406 },
      { filename: "/vc-assets/local/models/gta3.img/bmotr.dff", start: 62971406, end: 63047182 },
      { filename: "/vc-assets/local/models/gta3.img/bmotr.txd", start: 63047182, end: 63069710 },
      { filename: "/vc-assets/local/models/gta3.img/bmycr.dff", start: 63069710, end: 63143438 },
      { filename: "/vc-assets/local/models/gta3.img/bmycr.txd", start: 63143438, end: 63165966 },
      { filename: "/vc-assets/local/models/gta3.img/bmypi.dff", start: 63165966, end: 63245838 },
      { filename: "/vc-assets/local/models/gta3.img/bmypi.txd", start: 63245838, end: 63268366 },
      { filename: "/vc-assets/local/models/gta3.img/bmyst.dff", start: 63268366, end: 63344142 },
      { filename: "/vc-assets/local/models/gta3.img/bmyst.txd", start: 63344142, end: 63366670 },
      { filename: "/vc-assets/local/models/gta3.img/boat_kb1.dff", start: 63366670, end: 63385102 },
      { filename: "/vc-assets/local/models/gta3.img/boat_kb2.dff", start: 63385102, end: 63458830 },
      { filename: "/vc-assets/local/models/gta3.img/boatcranelg0.dff", start: 63458830, end: 63489550 },
      { filename: "/vc-assets/local/models/gta3.img/boatcranesm0.dff", start: 63489550, end: 63516174 },
      { filename: "/vc-assets/local/models/gta3.img/boathouse.txd", start: 63516174, end: 64003598 },
      { filename: "/vc-assets/local/models/gta3.img/bobcat.dff", start: 64003598, end: 64159246 },
      { filename: "/vc-assets/local/models/gta3.img/bobcat.txd", start: 64159246, end: 64208398 },
      { filename: "/vc-assets/local/models/gta3.img/bodyarmour.dff", start: 64208398, end: 64216590 },
      { filename: "/vc-assets/local/models/gta3.img/bollardlight.dff", start: 64216590, end: 64220686 },
      { filename: "/vc-assets/local/models/gta3.img/boxville.dff", start: 64220686, end: 64388622 },
      { filename: "/vc-assets/local/models/gta3.img/boxville.txd", start: 64388622, end: 64495118 },
      { filename: "/vc-assets/local/models/gta3.img/brassknuckle.dff", start: 64495118, end: 64499214 },
      { filename: "/vc-assets/local/models/gta3.img/brassknuckle.txd", start: 64499214, end: 64505358 },
      { filename: "/vc-assets/local/models/gta3.img/brfcase.dff", start: 64505358, end: 64531982 },
      { filename: "/vc-assets/local/models/gta3.img/brfcase.txd", start: 64531982, end: 64546318 },
      { filename: "/vc-assets/local/models/gta3.img/bribe.dff", start: 64546318, end: 64552462 },
      { filename: "/vc-assets/local/models/gta3.img/bridge.col", start: 64552462, end: 64652814 },
      { filename: "/vc-assets/local/models/gta3.img/burrito.dff", start: 64652814, end: 64841230 },
      { filename: "/vc-assets/local/models/gta3.img/burrito.txd", start: 64841230, end: 64884238 },
      { filename: "/vc-assets/local/models/gta3.img/bus.dff", start: 64884238, end: 65029646 },
      { filename: "/vc-assets/local/models/gta3.img/bus.txd", start: 65029646, end: 65074702 },
      { filename: "/vc-assets/local/models/gta3.img/bussign1.dff", start: 65074702, end: 65078798 },
      { filename: "/vc-assets/local/models/gta3.img/cabbie.dff", start: 65078798, end: 65273358 },
      { filename: "/vc-assets/local/models/gta3.img/cabbie.txd", start: 65273358, end: 65326606 },
      { filename: "/vc-assets/local/models/gta3.img/cdseaan.dff", start: 65326606, end: 65328654 },
      { filename: "/vc-assets/local/models/gta3.img/cdseabed01.dff", start: 65328654, end: 65334798 },
      { filename: "/vc-assets/local/models/gta3.img/cdseabed02.dff", start: 65334798, end: 65340942 },
      { filename: "/vc-assets/local/models/gta3.img/cdseabed03.dff", start: 65340942, end: 65345038 },
      { filename: "/vc-assets/local/models/gta3.img/cdseabed04.dff", start: 65345038, end: 65349134 },
      { filename: "/vc-assets/local/models/gta3.img/cdseabed05.dff", start: 65349134, end: 65353230 },
      { filename: "/vc-assets/local/models/gta3.img/cdseabed06.dff", start: 65353230, end: 65357326 },
      { filename: "/vc-assets/local/models/gta3.img/cdseabed07.dff", start: 65357326, end: 65361422 },
      { filename: "/vc-assets/local/models/gta3.img/cdseabed08.dff", start: 65361422, end: 65365518 },
      { filename: "/vc-assets/local/models/gta3.img/cdseabed09.dff", start: 65365518, end: 65369614 },
      { filename: "/vc-assets/local/models/gta3.img/cdseabed16.dff", start: 65369614, end: 65371662 },
      { filename: "/vc-assets/local/models/gta3.img/cdseabed18.dff", start: 65371662, end: 65375758 },
      { filename: "/vc-assets/local/models/gta3.img/cdseabed19.dff", start: 65375758, end: 65377806 },
      { filename: "/vc-assets/local/models/gta3.img/cdseabed20.dff", start: 65377806, end: 65381902 },
      { filename: "/vc-assets/local/models/gta3.img/cdseabed21.dff", start: 65381902, end: 65383950 },
      { filename: "/vc-assets/local/models/gta3.img/cdseabed24.dff", start: 65383950, end: 65385998 },
      { filename: "/vc-assets/local/models/gta3.img/cdseabed25.dff", start: 65385998, end: 65388046 },
      { filename: "/vc-assets/local/models/gta3.img/cdseabed26.dff", start: 65388046, end: 65390094 },
      { filename: "/vc-assets/local/models/gta3.img/cdseabed27.dff", start: 65390094, end: 65392142 },
      { filename: "/vc-assets/local/models/gta3.img/cdseabed28.dff", start: 65392142, end: 65394190 },
      { filename: "/vc-assets/local/models/gta3.img/cdseabed29.dff", start: 65394190, end: 65396238 },
      { filename: "/vc-assets/local/models/gta3.img/cdseabed30.dff", start: 65396238, end: 65398286 },
      { filename: "/vc-assets/local/models/gta3.img/cheetah.dff", start: 65398286, end: 65568270 },
      { filename: "/vc-assets/local/models/gta3.img/cheetah.txd", start: 65568270, end: 65611278 },
      { filename: "/vc-assets/local/models/gta3.img/chromegun.dff", start: 65611278, end: 65629710 },
      { filename: "/vc-assets/local/models/gta3.img/chromegun.txd", start: 65629710, end: 65637902 },
      { filename: "/vc-assets/local/models/gta3.img/cisland.col", start: 65637902, end: 65861134 },
      { filename: "/vc-assets/local/models/gta3.img/cl_tablesetlrg.dff", start: 65861134, end: 65887758 },
      { filename: "/vc-assets/local/models/gta3.img/club.col", start: 65887758, end: 65912334 },
      { filename: "/vc-assets/local/models/gta3.img/coach.dff", start: 65912334, end: 66053646 },
      { filename: "/vc-assets/local/models/gta3.img/coach.ifp", start: 66053646, end: 66139662 },
      { filename: "/vc-assets/local/models/gta3.img/coach.txd", start: 66139662, end: 66188814 },
      { filename: "/vc-assets/local/models/gta3.img/cokpoolwater.dff", start: 66188814, end: 66190862 },
      { filename: "/vc-assets/local/models/gta3.img/colt45.dff", start: 66190862, end: 66207246 },
      { filename: "/vc-assets/local/models/gta3.img/colt45.ifp", start: 66207246, end: 66266638 },
      { filename: "/vc-assets/local/models/gta3.img/colt45.txd", start: 66266638, end: 66274830 },
      { filename: "/vc-assets/local/models/gta3.img/comet.dff", start: 66274830, end: 66416142 },
      { filename: "/vc-assets/local/models/gta3.img/comet.txd", start: 66416142, end: 66461198 },
      { filename: "/vc-assets/local/models/gta3.img/concerth.col", start: 66461198, end: 66473486 },
      { filename: "/vc-assets/local/models/gta3.img/cop.dff", start: 66473486, end: 66545166 },
      { filename: "/vc-assets/local/models/gta3.img/cop.txd", start: 66545166, end: 66567694 },
      { filename: "/vc-assets/local/models/gta3.img/cranebasea0.dff", start: 66567694, end: 66592270 },
      { filename: "/vc-assets/local/models/gta3.img/cranes.txd", start: 66592270, end: 66668046 },
      { filename: "/vc-assets/local/models/gta3.img/crate.txd", start: 66668046, end: 67010062 },
      { filename: "/vc-assets/local/models/gta3.img/crgoshp010.dff", start: 67010062, end: 67087886 },
      { filename: "/vc-assets/local/models/gta3.img/cs_chop.dff", start: 67087886, end: 67333646 },
      { filename: "/vc-assets/local/models/gta3.img/cs_chop.txd", start: 67333646, end: 67452430 },
      { filename: "/vc-assets/local/models/gta3.img/csassa.dff", start: 67452430, end: 67542542 },
      { filename: "/vc-assets/local/models/gta3.img/csassa.txd", start: 67542542, end: 67587598 },
      { filename: "/vc-assets/local/models/gta3.img/csassb.dff", start: 67587598, end: 67681806 },
      { filename: "/vc-assets/local/models/gta3.img/csassb.txd", start: 67681806, end: 67726862 },
      { filename: "/vc-assets/local/models/gta3.img/csassc.dff", start: 67726862, end: 67816974 },
      { filename: "/vc-assets/local/models/gta3.img/csassc.txd", start: 67816974, end: 67862030 },
      { filename: "/vc-assets/local/models/gta3.img/csdeal.dff", start: 67862030, end: 67995150 },
      { filename: "/vc-assets/local/models/gta3.img/csdeal.txd", start: 67995150, end: 68040206 },
      { filename: "/vc-assets/local/models/gta3.img/csken.dff", start: 68040206, end: 68204046 },
      { filename: "/vc-assets/local/models/gta3.img/csken.txd", start: 68204046, end: 68249102 },
      { filename: "/vc-assets/local/models/gta3.img/csplay.dff", start: 68249102, end: 68394510 },
      { filename: "/vc-assets/local/models/gta3.img/csplay.txd", start: 68394510, end: 68439566 },
      { filename: "/vc-assets/local/models/gta3.img/cssonny.dff", start: 68439566, end: 68570638 },
      { filename: "/vc-assets/local/models/gta3.img/cssonny.txd", start: 68570638, end: 68615694 },
      { filename: "/vc-assets/local/models/gta3.img/deco_buildkb29_nt.dff", start: 68615694, end: 68648462 },
      { filename: "/vc-assets/local/models/gta3.img/deco_buildkb_nt.dff", start: 68648462, end: 68673038 },
      { filename: "/vc-assets/local/models/gta3.img/deco_polgrnda10.dff", start: 68673038, end: 68724238 },
      { filename: "/vc-assets/local/models/gta3.img/deco_polgrnda12.dff", start: 68724238, end: 68861454 },
      { filename: "/vc-assets/local/models/gta3.img/deco_polgrnda13.dff", start: 68861454, end: 68873742 },
      { filename: "/vc-assets/local/models/gta3.img/delcase.dff", start: 68873742, end: 68881934 },
      { filename: "/vc-assets/local/models/gta3.img/delcase.txd", start: 68881934, end: 68926990 },
      { filename: "/vc-assets/local/models/gta3.img/dinghy.dff", start: 68926990, end: 69010958 },
      { filename: "/vc-assets/local/models/gta3.img/dinghy.txd", start: 69010958, end: 69047822 },
      { filename: "/vc-assets/local/models/gta3.img/dk_cargoshp95.dff", start: 69047822, end: 69248526 },
      { filename: "/vc-assets/local/models/gta3.img/dk_dockroads02.dff", start: 69248526, end: 69277198 },
      { filename: "/vc-assets/local/models/gta3.img/dk_dockroads03.dff", start: 69277198, end: 69305870 },
      { filename: "/vc-assets/local/models/gta3.img/dk_dockroads04.dff", start: 69305870, end: 69320206 },
      { filename: "/vc-assets/local/models/gta3.img/dk_midbuilds.txd", start: 69320206, end: 69783054 },
      { filename: "/vc-assets/local/models/gta3.img/dk_waretank.dff", start: 69783054, end: 69826062 },
      { filename: "/vc-assets/local/models/gta3.img/dk_waretankdoor1.dff", start: 69826062, end: 69828110 },
      { filename: "/vc-assets/local/models/gta3.img/dkcargohull2.dff", start: 69828110, end: 69940750 },
      { filename: "/vc-assets/local/models/gta3.img/dkcargohull2b.dff", start: 69940750, end: 70012430 },
      { filename: "/vc-assets/local/models/gta3.img/dkcargohull2c.dff", start: 70012430, end: 70088206 },
      { filename: "/vc-assets/local/models/gta3.img/dkcargoshp.txd", start: 70088206, end: 70452750 },
      { filename: "/vc-assets/local/models/gta3.img/doc_crane_cab03.dff", start: 70452750, end: 70477326 },
      { filename: "/vc-assets/local/models/gta3.img/doc_crane_cab04.dff", start: 70477326, end: 70524430 },
      { filename: "/vc-assets/local/models/gta3.img/doc_craneeggs04.dff", start: 70524430, end: 70567438 },
      { filename: "/vc-assets/local/models/gta3.img/doc_dockwareold.dff", start: 70567438, end: 70606350 },
      { filename: "/vc-assets/local/models/gta3.img/doccrane.txd", start: 70606350, end: 70669838 },
      { filename: "/vc-assets/local/models/gta3.img/docfactories.txd", start: 70669838, end: 71177742 },
      { filename: "/vc-assets/local/models/gta3.img/dock_props01.dff", start: 71177742, end: 71183886 },
      { filename: "/vc-assets/local/models/gta3.img/dock_props02.dff", start: 71183886, end: 71220750 },
      { filename: "/vc-assets/local/models/gta3.img/dock_ships.txd", start: 71220750, end: 71466510 },
      { filename: "/vc-assets/local/models/gta3.img/dockcranescale0.dff", start: 71466510, end: 71519758 },
      { filename: "/vc-assets/local/models/gta3.img/dockfence.dff", start: 71519758, end: 71521806 },
      { filename: "/vc-assets/local/models/gta3.img/dockfence.txd", start: 71521806, end: 71583246 },
      { filename: "/vc-assets/local/models/gta3.img/dockfuel07.dff", start: 71583246, end: 71609870 },
      { filename: "/vc-assets/local/models/gta3.img/dockgrass.dff", start: 71609870, end: 71652878 },
      { filename: "/vc-assets/local/models/gta3.img/dockgrass.txd", start: 71652878, end: 71663118 },
      { filename: "/vc-assets/local/models/gta3.img/dockgrnd.txd", start: 71663118, end: 72074766 },
      { filename: "/vc-assets/local/models/gta3.img/docklight.txd", start: 72074766, end: 72115726 },
      { filename: "/vc-assets/local/models/gta3.img/dockroads.txd", start: 72115726, end: 72355342 },
      { filename: "/vc-assets/local/models/gta3.img/docks.col", start: 72355342, end: 72652302 },
      { filename: "/vc-assets/local/models/gta3.img/docks.txd", start: 72652302, end: 73223694 },
      { filename: "/vc-assets/local/models/gta3.img/docks10.dff", start: 73223694, end: 73291278 },
      { filename: "/vc-assets/local/models/gta3.img/docks21.dff", start: 73291278, end: 73369102 },
      { filename: "/vc-assets/local/models/gta3.img/docks28.dff", start: 73369102, end: 73412110 },
      { filename: "/vc-assets/local/models/gta3.img/docks30.dff", start: 73412110, end: 73514510 },
      { filename: "/vc-assets/local/models/gta3.img/docks31.dff", start: 73514510, end: 73528846 },
      { filename: "/vc-assets/local/models/gta3.img/docks32.dff", start: 73528846, end: 73537038 },
      { filename: "/vc-assets/local/models/gta3.img/docks37.dff", start: 73537038, end: 73569806 },
      { filename: "/vc-assets/local/models/gta3.img/docks40.dff", start: 73569806, end: 73586190 },
      { filename: "/vc-assets/local/models/gta3.img/docks62.dff", start: 73586190, end: 73594382 },
      { filename: "/vc-assets/local/models/gta3.img/docks85.dff", start: 73594382, end: 73606670 },
      { filename: "/vc-assets/local/models/gta3.img/docksprops04.dff", start: 73606670, end: 73790990 },
      { filename: "/vc-assets/local/models/gta3.img/docksprops11.dff", start: 73790990, end: 73934350 },
      { filename: "/vc-assets/local/models/gta3.img/docksprops12.dff", start: 73934350, end: 74077710 },
      { filename: "/vc-assets/local/models/gta3.img/docksprops13.dff", start: 74077710, end: 74194446 },
      { filename: "/vc-assets/local/models/gta3.img/docksprops14.dff", start: 74194446, end: 74280462 },
      { filename: "/vc-assets/local/models/gta3.img/dolphin.dff", start: 74280462, end: 74307086 },
      { filename: "/vc-assets/local/models/gta3.img/dolphin.txd", start: 74307086, end: 74311182 },
      { filename: "/vc-assets/local/models/gta3.img/downtown.col", start: 74311182, end: 74817038 },
      { filename: "/vc-assets/local/models/gta3.img/downtows.col", start: 74817038, end: 75075086 },
      { filename: "/vc-assets/local/models/gta3.img/drink.dff", start: 75075086, end: 75079182 },
      { filename: "/vc-assets/local/models/gta3.img/drink.txd", start: 75079182, end: 75091470 },
      { filename: "/vc-assets/local/models/gta3.img/dt_blimp.txd", start: 75091470, end: 75095566 },
      { filename: "/vc-assets/local/models/gta3.img/dt_lod.txd", start: 75095566, end: 75253262 },
      { filename: "/vc-assets/local/models/gta3.img/dts_lodbig.txd", start: 75253262, end: 75296270 },
      { filename: "/vc-assets/local/models/gta3.img/dts_lodsmall.txd", start: 75296270, end: 75324942 },
      { filename: "/vc-assets/local/models/gta3.img/dts_lodsmall2.txd", start: 75324942, end: 75415054 },
      { filename: "/vc-assets/local/models/gta3.img/dynhydrent.txd", start: 75415054, end: 75427342 },
      { filename: "/vc-assets/local/models/gta3.img/dynsigns.txd", start: 75427342, end: 75453966 },
      { filename: "/vc-assets/local/models/gta3.img/esperant.dff", start: 75453966, end: 75623950 },
      { filename: "/vc-assets/local/models/gta3.img/esperant.txd", start: 75623950, end: 75675150 },
      { filename: "/vc-assets/local/models/gta3.img/faggio.dff", start: 75675150, end: 75750926 },
      { filename: "/vc-assets/local/models/gta3.img/faggio.txd", start: 75750926, end: 75775502 },
      { filename: "/vc-assets/local/models/gta3.img/fire_hydrant.dff", start: 75775502, end: 75791886 },
      { filename: "/vc-assets/local/models/gta3.img/fish1.txd", start: 75791886, end: 75798030 },
      { filename: "/vc-assets/local/models/gta3.img/fish1single.dff", start: 75798030, end: 75800078 },
      { filename: "/vc-assets/local/models/gta3.img/fish2.txd", start: 75800078, end: 75806222 },
      { filename: "/vc-assets/local/models/gta3.img/fish2s.dff", start: 75806222, end: 75810318 },
      { filename: "/vc-assets/local/models/gta3.img/fish2single.dff", start: 75810318, end: 75812366 },
      { filename: "/vc-assets/local/models/gta3.img/fish3.txd", start: 75812366, end: 75818510 },
      { filename: "/vc-assets/local/models/gta3.img/fish3s.dff", start: 75818510, end: 75820558 },
      { filename: "/vc-assets/local/models/gta3.img/fish3single.dff", start: 75820558, end: 75822606 },
      { filename: "/vc-assets/local/models/gta3.img/flatbed.dff", start: 75822606, end: 76070414 },
      { filename: "/vc-assets/local/models/gta3.img/flatbed.txd", start: 76070414, end: 76146190 },
      { filename: "/vc-assets/local/models/gta3.img/gda.dff", start: 76146190, end: 76207630 },
      { filename: "/vc-assets/local/models/gta3.img/gda.txd", start: 76207630, end: 76230158 },
      { filename: "/vc-assets/local/models/gta3.img/gdb.dff", start: 76230158, end: 76291598 },
      { filename: "/vc-assets/local/models/gta3.img/gdb.txd", start: 76291598, end: 76314126 },
      { filename: "/vc-assets/local/models/gta3.img/gf_lod.txd", start: 76314126, end: 76346894 },
      { filename: "/vc-assets/local/models/gta3.img/gf_treesfw1_01.dff", start: 76346894, end: 76367374 },
      { filename: "/vc-assets/local/models/gta3.img/gf_treesfw2_01.dff", start: 76367374, end: 76383758 },
      { filename: "/vc-assets/local/models/gta3.img/gf_treesfw3_01.dff", start: 76383758, end: 76398094 },
      { filename: "/vc-assets/local/models/gta3.img/gf_treesfw4_01.dff", start: 76398094, end: 76414478 },
      { filename: "/vc-assets/local/models/gta3.img/gf_treesfw5_01.dff", start: 76414478, end: 76432910 },
      { filename: "/vc-assets/local/models/gta3.img/ggsalonsign1.dff", start: 76432910, end: 76437006 },
      { filename: "/vc-assets/local/models/gta3.img/glendale.dff", start: 76437006, end: 76594702 },
      { filename: "/vc-assets/local/models/gta3.img/glendale.txd", start: 76594702, end: 76647950 },
      { filename: "/vc-assets/local/models/gta3.img/golf.col", start: 76647950, end: 77010446 },
      { filename: "/vc-assets/local/models/gta3.img/greenwoo.dff", start: 77010446, end: 77198862 },
      { filename: "/vc-assets/local/models/gta3.img/greenwoo.txd", start: 77198862, end: 77245966 },
      { filename: "/vc-assets/local/models/gta3.img/haiti.col", start: 77245966, end: 77600270 },
      { filename: "/vc-assets/local/models/gta3.img/haitin.col", start: 77600270, end: 77903374 },
      { filename: "/vc-assets/local/models/gta3.img/health.dff", start: 77903374, end: 77911566 },
      { filename: "/vc-assets/local/models/gta3.img/hermes.dff", start: 77911566, end: 78040590 },
      { filename: "/vc-assets/local/models/gta3.img/hermes.txd", start: 78040590, end: 78099982 },
      { filename: "/vc-assets/local/models/gta3.img/hfost.dff", start: 78099982, end: 78165518 },
      { filename: "/vc-assets/local/models/gta3.img/hfost.txd", start: 78165518, end: 78188046 },
      { filename: "/vc-assets/local/models/gta3.img/hfotr.dff", start: 78188046, end: 78253582 },
      { filename: "/vc-assets/local/models/gta3.img/hfotr.txd", start: 78253582, end: 78276110 },
      { filename: "/vc-assets/local/models/gta3.img/hfybe.dff", start: 78276110, end: 78331406 },
      { filename: "/vc-assets/local/models/gta3.img/hfybe.txd", start: 78331406, end: 78353934 },
      { filename: "/vc-assets/local/models/gta3.img/hfybu.dff", start: 78353934, end: 78419470 },
      { filename: "/vc-assets/local/models/gta3.img/hfybu.txd", start: 78419470, end: 78441998 },
      { filename: "/vc-assets/local/models/gta3.img/hfypr.dff", start: 78441998, end: 78501390 },
      { filename: "/vc-assets/local/models/gta3.img/hfypr.txd", start: 78501390, end: 78523918 },
      { filename: "/vc-assets/local/models/gta3.img/hfyri.dff", start: 78523918, end: 78585358 },
      { filename: "/vc-assets/local/models/gta3.img/hfyri.txd", start: 78585358, end: 78607886 },
      { filename: "/vc-assets/local/models/gta3.img/hfyst.dff", start: 78607886, end: 78671374 },
      { filename: "/vc-assets/local/models/gta3.img/hfyst.txd", start: 78671374, end: 78693902 },
      { filename: "/vc-assets/local/models/gta3.img/hi_cutcouch.txd", start: 78693902, end: 78745102 },
      { filename: "/vc-assets/local/models/gta3.img/hi_cuthoomintshad.txd", start: 78745102, end: 78902798 },
      { filename: "/vc-assets/local/models/gta3.img/hi_cuthotel1.txd", start: 78902798, end: 78945806 },
      { filename: "/vc-assets/local/models/gta3.img/hi_cuthtl2.txd", start: 78945806, end: 79154702 },
      { filename: "/vc-assets/local/models/gta3.img/hi_cuthtl4.txd", start: 79154702, end: 79189518 },
      { filename: "/vc-assets/local/models/gta3.img/hi_cuthtlalp.txd", start: 79189518, end: 79375886 },
      { filename: "/vc-assets/local/models/gta3.img/hi_cutint1.txd", start: 79375886, end: 79509006 },
      { filename: "/vc-assets/local/models/gta3.img/hi_cutintprops.txd", start: 79509006, end: 79609358 },
      { filename: "/vc-assets/local/models/gta3.img/hi_cuttblprop.txd", start: 79609358, end: 79695374 },
      { filename: "/vc-assets/local/models/gta3.img/hmoca.dff", start: 79695374, end: 79765006 },
      { filename: "/vc-assets/local/models/gta3.img/hmoca.txd", start: 79765006, end: 79787534 },
      { filename: "/vc-assets/local/models/gta3.img/hmost.dff", start: 79787534, end: 79863310 },
      { filename: "/vc-assets/local/models/gta3.img/hmost.txd", start: 79863310, end: 79885838 },
      { filename: "/vc-assets/local/models/gta3.img/hmotr.dff", start: 79885838, end: 79961614 },
      { filename: "/vc-assets/local/models/gta3.img/hmotr.txd", start: 79961614, end: 79984142 },
      { filename: "/vc-assets/local/models/gta3.img/hmyap.dff", start: 79984142, end: 80053774 },
      { filename: "/vc-assets/local/models/gta3.img/hmyap.txd", start: 80053774, end: 80076302 },
      { filename: "/vc-assets/local/models/gta3.img/hmyst.dff", start: 80076302, end: 80150030 },
      { filename: "/vc-assets/local/models/gta3.img/hmyst.txd", start: 80150030, end: 80172558 },
      { filename: "/vc-assets/local/models/gta3.img/hot_bar1_01.dff", start: 80172558, end: 80244238 },
      { filename: "/vc-assets/local/models/gta3.img/hot_drawers1_01.dff", start: 80244238, end: 80283150 },
      { filename: "/vc-assets/local/models/gta3.img/hot_mags1.dff", start: 80283150, end: 80289294 },
      { filename: "/vc-assets/local/models/gta3.img/hot_mobint.txd", start: 80289294, end: 80989710 },
      { filename: "/vc-assets/local/models/gta3.img/hot_room317.dff", start: 80989710, end: 81042958 },
      { filename: "/vc-assets/local/models/gta3.img/hot_roomtrans.txd", start: 81042958, end: 81315342 },
      { filename: "/vc-assets/local/models/gta3.img/hot_trans1.dff", start: 81315342, end: 81344014 },
      { filename: "/vc-assets/local/models/gta3.img/hotel.col", start: 81344014, end: 81356302 },
      { filename: "/vc-assets/local/models/gta3.img/hotelroomint.txd", start: 81356302, end: 82085390 },
      { filename: "/vc-assets/local/models/gta3.img/hotroomfan.dff", start: 82085390, end: 82091534 },
      { filename: "/vc-assets/local/models/gta3.img/hotshad1.dff", start: 82091534, end: 82099726 },
      { filename: "/vc-assets/local/models/gta3.img/ht_doors.dff", start: 82099726, end: 82103822 },
      { filename: "/vc-assets/local/models/gta3.img/ht_fans_nt.dff", start: 82103822, end: 82146830 },
      { filename: "/vc-assets/local/models/gta3.img/ht_kb_couch1_nt.dff", start: 82146830, end: 82208270 },
      { filename: "/vc-assets/local/models/gta3.img/ht_mainfloor2_nt.dff", start: 82208270, end: 82243086 },
      { filename: "/vc-assets/local/models/gta3.img/ht_mainfloor_nt.dff", start: 82243086, end: 82281998 },
      { filename: "/vc-assets/local/models/gta3.img/ht_upstairs.dff", start: 82281998, end: 82333198 },
      { filename: "/vc-assets/local/models/gta3.img/ht_veg01_nt.dff", start: 82333198, end: 82347534 },
      { filename: "/vc-assets/local/models/gta3.img/ht_veg02_dy.dff", start: 82347534, end: 82386446 },
      { filename: "/vc-assets/local/models/gta3.img/ht_veg02_nt.dff", start: 82386446, end: 82425358 },
      { filename: "/vc-assets/local/models/gta3.img/ht_veg04_nt.dff", start: 82425358, end: 82451982 },
      { filename: "/vc-assets/local/models/gta3.img/htdoorhtlalp.txd", start: 82451982, end: 82478606 },
      { filename: "/vc-assets/local/models/gta3.img/htl_dco_chair03_nt.dff", start: 82478606, end: 82529806 },
      { filename: "/vc-assets/local/models/gta3.img/htl_ext03.txd", start: 82529806, end: 82548238 },
      { filename: "/vc-assets/local/models/gta3.img/htl_exterior03_nt.dff", start: 82548238, end: 82554382 },
      { filename: "/vc-assets/local/models/gta3.img/htl_gls_1_nt.dff", start: 82554382, end: 82556430 },
      { filename: "/vc-assets/local/models/gta3.img/htl_gls_2_nt.dff", start: 82556430, end: 82558478 },
      { filename: "/vc-assets/local/models/gta3.img/htl_gls_3_nt.dff", start: 82558478, end: 82560526 },
      { filename: "/vc-assets/local/models/gta3.img/htl_gls_lobby.dff", start: 82560526, end: 82562574 },
      { filename: "/vc-assets/local/models/gta3.img/htl_lftdoor1_nt.dff", start: 82562574, end: 82566670 },
      { filename: "/vc-assets/local/models/gta3.img/htl_maintiles_nt.dff", start: 82566670, end: 82591246 },
      { filename: "/vc-assets/local/models/gta3.img/icons3.txd", start: 82591246, end: 82595342 },
      { filename: "/vc-assets/local/models/gta3.img/icons4.txd", start: 82595342, end: 82599438 },
      { filename: "/vc-assets/local/models/gta3.img/icons5.txd", start: 82599438, end: 82605582 },
      { filename: "/vc-assets/local/models/gta3.img/icons7.txd", start: 82605582, end: 82609678 },
      { filename: "/vc-assets/local/models/gta3.img/icons9.txd", start: 82609678, end: 82615822 },
      { filename: "/vc-assets/local/models/gta3.img/igken.dff", start: 82615822, end: 82693646 },
      { filename: "/vc-assets/local/models/gta3.img/igken.txd", start: 82693646, end: 82738702 },
      { filename: "/vc-assets/local/models/gta3.img/infernus.dff", start: 82738702, end: 82861582 },
      { filename: "/vc-assets/local/models/gta3.img/infernus.txd", start: 82861582, end: 82914830 },
      { filename: "/vc-assets/local/models/gta3.img/islandlodbeach.dff", start: 82914830, end: 83283470 },
      { filename: "/vc-assets/local/models/gta3.img/islandlodmainland.dff", start: 83283470, end: 83629582 },
      { filename: "/vc-assets/local/models/gta3.img/islandlolodb.txd", start: 83629582, end: 83715598 },
      { filename: "/vc-assets/local/models/gta3.img/islandlolodm.txd", start: 83715598, end: 83815950 },
      { filename: "/vc-assets/local/models/gta3.img/islandsf.col", start: 83815950, end: 83826190 },
      { filename: "/vc-assets/local/models/gta3.img/jellyfish.dff", start: 83826190, end: 83836430 },
      { filename: "/vc-assets/local/models/gta3.img/jellyfish1.txd", start: 83836430, end: 83846670 },
      { filename: "/vc-assets/local/models/gta3.img/jfoto.dff", start: 83846670, end: 83912206 },
      { filename: "/vc-assets/local/models/gta3.img/jfoto.txd", start: 83912206, end: 83934734 },
      { filename: "/vc-assets/local/models/gta3.img/jmoto.dff", start: 83934734, end: 83996174 },
      { filename: "/vc-assets/local/models/gta3.img/jmoto.txd", start: 83996174, end: 84018702 },
      { filename: "/vc-assets/local/models/gta3.img/kaufman.dff", start: 84018702, end: 84215310 },
      { filename: "/vc-assets/local/models/gta3.img/kaufman.txd", start: 84215310, end: 84297230 },
      { filename: "/vc-assets/local/models/gta3.img/lamppost1.dff", start: 84297230, end: 84305422 },
      { filename: "/vc-assets/local/models/gta3.img/lamppost2.dff", start: 84305422, end: 84319758 },
      { filename: "/vc-assets/local/models/gta3.img/lamppost3.dff", start: 84319758, end: 84323854 },
      { filename: "/vc-assets/local/models/gta3.img/landstal.dff", start: 84323854, end: 84520462 },
      { filename: "/vc-assets/local/models/gta3.img/landstal.txd", start: 84520462, end: 84565518 },
      { filename: "/vc-assets/local/models/gta3.img/lawyers.col", start: 84565518, end: 84581902 },
      { filename: "/vc-assets/local/models/gta3.img/linerun.dff", start: 84581902, end: 84737550 },
      { filename: "/vc-assets/local/models/gta3.img/linerun.txd", start: 84737550, end: 84786702 },
      { filename: "/vc-assets/local/models/gta3.img/littleha.col", start: 84786702, end: 85155342 },
      { filename: "/vc-assets/local/models/gta3.img/lod_backside.dff", start: 85155342, end: 85165582 },
      { filename: "/vc-assets/local/models/gta3.img/lod_beacon2_nt.dff", start: 85165582, end: 85171726 },
      { filename: "/vc-assets/local/models/gta3.img/lod_beacon_dy.dff", start: 85171726, end: 85179918 },
      { filename: "/vc-assets/local/models/gta3.img/lod_beacon_nt.dff", start: 85179918, end: 85188110 },
      { filename: "/vc-assets/local/models/gta3.img/lod_bridgew.dff", start: 85188110, end: 85190158 },
      { filename: "/vc-assets/local/models/gta3.img/lod_build01.dff", start: 85190158, end: 85192206 },
      { filename: "/vc-assets/local/models/gta3.img/lod_build02.dff", start: 85192206, end: 85196302 },
      { filename: "/vc-assets/local/models/gta3.img/lod_build03.dff", start: 85196302, end: 85200398 },
      { filename: "/vc-assets/local/models/gta3.img/lod_build04.dff", start: 85200398, end: 85202446 },
      { filename: "/vc-assets/local/models/gta3.img/lod_build05.dff", start: 85202446, end: 85206542 },
      { filename: "/vc-assets/local/models/gta3.img/lod_car_show_out.dff", start: 85206542, end: 85216782 },
      { filename: "/vc-assets/local/models/gta3.img/lod_colony_nt.dff", start: 85216782, end: 85218830 },
      { filename: "/vc-assets/local/models/gta3.img/lod_docks.txd", start: 85218830, end: 85382670 },
      { filename: "/vc-assets/local/models/gta3.img/lod_docks2.txd", start: 85382670, end: 85419534 },
      { filename: "/vc-assets/local/models/gta3.img/lod_dockwareold.dff", start: 85419534, end: 85423630 },
      { filename: "/vc-assets/local/models/gta3.img/lod_frntstep.dff", start: 85423630, end: 85429774 },
      { filename: "/vc-assets/local/models/gta3.img/lod_grnd2.dff", start: 85429774, end: 85444110 },
      { filename: "/vc-assets/local/models/gta3.img/lod_grnd3.dff", start: 85444110, end: 85450254 },
      { filename: "/vc-assets/local/models/gta3.img/lod_grnd4.dff", start: 85450254, end: 85462542 },
      { filename: "/vc-assets/local/models/gta3.img/lod_grnd5.dff", start: 85462542, end: 85476878 },
      { filename: "/vc-assets/local/models/gta3.img/lod_grnd6.dff", start: 85476878, end: 85487118 },
      { filename: "/vc-assets/local/models/gta3.img/lod_grssypatch.dff", start: 85487118, end: 85491214 },
      { filename: "/vc-assets/local/models/gta3.img/lod_hotel01.dff", start: 85491214, end: 85505550 },
      { filename: "/vc-assets/local/models/gta3.img/lod_hotel02.dff", start: 85505550, end: 85526030 },
      { filename: "/vc-assets/local/models/gta3.img/lod_hotel03.dff", start: 85526030, end: 85558798 },
      { filename: "/vc-assets/local/models/gta3.img/lod_hotel04.dff", start: 85558798, end: 85571086 },
      { filename: "/vc-assets/local/models/gta3.img/lod_hotel05.dff", start: 85571086, end: 85585422 },
      { filename: "/vc-assets/local/models/gta3.img/lod_hotel06.dff", start: 85585422, end: 85599758 },
      { filename: "/vc-assets/local/models/gta3.img/lod_hotel08.dff", start: 85599758, end: 85616142 },
      { filename: "/vc-assets/local/models/gta3.img/lod_hotel13.dff", start: 85616142, end: 85632526 },
      { filename: "/vc-assets/local/models/gta3.img/lod_hotel15.dff", start: 85632526, end: 85648910 },
      { filename: "/vc-assets/local/models/gta3.img/lod_hotelhot_nt.dff", start: 85648910, end: 85650958 },
      { filename: "/vc-assets/local/models/gta3.img/lod_houses27.dff", start: 85650958, end: 85665294 },
      { filename: "/vc-assets/local/models/gta3.img/lod_htlpoolbar01.dff", start: 85665294, end: 85677582 },
      { filename: "/vc-assets/local/models/gta3.img/lod_htlpoolbase01.dff", start: 85677582, end: 85681678 },
      { filename: "/vc-assets/local/models/gta3.img/lod_htlpoolbase01b.dff", start: 85681678, end: 85685774 },
      { filename: "/vc-assets/local/models/gta3.img/lod_htlpoolbase02.dff", start: 85685774, end: 85691918 },
      { filename: "/vc-assets/local/models/gta3.img/lod_htlpoolbase03.dff", start: 85691918, end: 85696014 },
      { filename: "/vc-assets/local/models/gta3.img/lod_htlpoolbase04.dff", start: 85696014, end: 85698062 },
      { filename: "/vc-assets/local/models/gta3.img/lod_htlpoolrm01.dff", start: 85698062, end: 85704206 },
      { filename: "/vc-assets/local/models/gta3.img/lod_htlpoolrm02.dff", start: 85704206, end: 85710350 },
      { filename: "/vc-assets/local/models/gta3.img/lod_leslie_dy.dff", start: 85710350, end: 85714446 },
      { filename: "/vc-assets/local/models/gta3.img/lod_leslie_nt.dff", start: 85714446, end: 85718542 },
      { filename: "/vc-assets/local/models/gta3.img/lod_macalpin_dy.dff", start: 85718542, end: 85724686 },
      { filename: "/vc-assets/local/models/gta3.img/lod_macalpin_nt.dff", start: 85724686, end: 85730830 },
      { filename: "/vc-assets/local/models/gta3.img/lod_majest_nt.dff", start: 85730830, end: 85734926 },
      { filename: "/vc-assets/local/models/gta3.img/lod_majestic2x_nt.dff", start: 85734926, end: 85739022 },
      { filename: "/vc-assets/local/models/gta3.img/lod_majestic_dy.dff", start: 85739022, end: 85745166 },
      { filename: "/vc-assets/local/models/gta3.img/lod_majestic_nt.dff", start: 85745166, end: 85751310 },
      { filename: "/vc-assets/local/models/gta3.img/lod_majesticz_nt.dff", start: 85751310, end: 85753358 },
      { filename: "/vc-assets/local/models/gta3.img/lod_man_grnds.txd", start: 85753358, end: 85806606 },
      { filename: "/vc-assets/local/models/gta3.img/lod_mansion03.dff", start: 85806606, end: 85812750 },
      { filename: "/vc-assets/local/models/gta3.img/lod_mansionbase02.dff", start: 85812750, end: 85816846 },
      { filename: "/vc-assets/local/models/gta3.img/lod_pizzaplace.dff", start: 85816846, end: 85820942 },
      { filename: "/vc-assets/local/models/gta3.img/lod_road01.dff", start: 85820942, end: 85825038 },
      { filename: "/vc-assets/local/models/gta3.img/lod_road02.dff", start: 85825038, end: 85827086 },
      { filename: "/vc-assets/local/models/gta3.img/lod_road03.dff", start: 85827086, end: 85831182 },
      { filename: "/vc-assets/local/models/gta3.img/lod_road04.dff", start: 85831182, end: 85835278 },
      { filename: "/vc-assets/local/models/gta3.img/lod_road05.dff", start: 85835278, end: 85839374 },
      { filename: "/vc-assets/local/models/gta3.img/lod_road07.dff", start: 85839374, end: 85841422 },
      { filename: "/vc-assets/local/models/gta3.img/lod_road08.dff", start: 85841422, end: 85843470 },
      { filename: "/vc-assets/local/models/gta3.img/lod_road09.dff", start: 85843470, end: 85845518 },
      { filename: "/vc-assets/local/models/gta3.img/lod_road10.dff", start: 85845518, end: 85849614 },
      { filename: "/vc-assets/local/models/gta3.img/lod_road11.dff", start: 85849614, end: 85853710 },
      { filename: "/vc-assets/local/models/gta3.img/lod_road12_gf.dff", start: 85853710, end: 85855758 },
      { filename: "/vc-assets/local/models/gta3.img/lod_roadswsh01.dff", start: 85855758, end: 85861902 },
      { filename: "/vc-assets/local/models/gta3.img/lod_roadswsh04.dff", start: 85861902, end: 85863950 },
      { filename: "/vc-assets/local/models/gta3.img/lod_roadswsh05.dff", start: 85863950, end: 85868046 },
      { filename: "/vc-assets/local/models/gta3.img/lod_roadswsh28.dff", start: 85868046, end: 85870094 },
      { filename: "/vc-assets/local/models/gta3.img/lod_rooftopstart.dff", start: 85870094, end: 85876238 },
      { filename: "/vc-assets/local/models/gta3.img/lod_shedbig30.dff", start: 85876238, end: 85882382 },
      { filename: "/vc-assets/local/models/gta3.img/lod_shop.dff", start: 85882382, end: 85892622 },
      { filename: "/vc-assets/local/models/gta3.img/lod_starbig.txd", start: 85892622, end: 85921294 },
      { filename: "/vc-assets/local/models/gta3.img/lod_starlite_dy.dff", start: 85921294, end: 85923342 },
      { filename: "/vc-assets/local/models/gta3.img/lod_starlite_nt.dff", start: 85923342, end: 85925390 },
      { filename: "/vc-assets/local/models/gta3.img/lod_starsmall.txd", start: 85925390, end: 85988878 },
      { filename: "/vc-assets/local/models/gta3.img/lod_tides2_nt.dff", start: 85988878, end: 85995022 },
      { filename: "/vc-assets/local/models/gta3.img/lod_tides_dy.dff", start: 85995022, end: 86005262 },
      { filename: "/vc-assets/local/models/gta3.img/lod_tides_nt.dff", start: 86005262, end: 86015502 },
      { filename: "/vc-assets/local/models/gta3.img/lod_wtrftr_1a.dff", start: 86015502, end: 86017550 },
      { filename: "/vc-assets/local/models/gta3.img/lodach_police.dff", start: 86017550, end: 86025742 },
      { filename: "/vc-assets/local/models/gta3.img/lodachb.dff", start: 86025742, end: 86029838 },
      { filename: "/vc-assets/local/models/gta3.img/lodachb1.dff", start: 86029838, end: 86033934 },
      { filename: "/vc-assets/local/models/gta3.img/lodachbit02.dff", start: 86033934, end: 86038030 },
      { filename: "/vc-assets/local/models/gta3.img/lodachbit03.dff", start: 86038030, end: 86046222 },
      { filename: "/vc-assets/local/models/gta3.img/lodachbit04.dff", start: 86046222, end: 86060558 },
      { filename: "/vc-assets/local/models/gta3.img/lodachbit04b.dff", start: 86060558, end: 86076942 },
      { filename: "/vc-assets/local/models/gta3.img/lodachbit05.dff", start: 86076942, end: 86081038 },
      { filename: "/vc-assets/local/models/gta3.img/lodachbit06.dff", start: 86081038, end: 86085134 },
      { filename: "/vc-assets/local/models/gta3.img/lodachroads01.dff", start: 86085134, end: 86089230 },
      { filename: "/vc-assets/local/models/gta3.img/lodachroads02.dff", start: 86089230, end: 86091278 },
      { filename: "/vc-assets/local/models/gta3.img/lodachroads03.dff", start: 86091278, end: 86093326 },
      { filename: "/vc-assets/local/models/gta3.img/lodachroads09.dff", start: 86093326, end: 86097422 },
      { filename: "/vc-assets/local/models/gta3.img/lodachsand1.dff", start: 86097422, end: 86099470 },
      { filename: "/vc-assets/local/models/gta3.img/lodachsand2.dff", start: 86099470, end: 86101518 },
      { filename: "/vc-assets/local/models/gta3.img/lodachsand2b.dff", start: 86101518, end: 86103566 },
      { filename: "/vc-assets/local/models/gta3.img/lodachwjetty01.dff", start: 86103566, end: 86113806 },
      { filename: "/vc-assets/local/models/gta3.img/lodachwjetty02.dff", start: 86113806, end: 86119950 },
      { filename: "/vc-assets/local/models/gta3.img/lodacne.dff", start: 86119950, end: 86126094 },
      { filename: "/vc-assets/local/models/gta3.img/lodairpn.txd", start: 86126094, end: 86156814 },
      { filename: "/vc-assets/local/models/gta3.img/lodallbit.dff", start: 86156814, end: 86158862 },
      { filename: "/vc-assets/local/models/gta3.img/lodalleys1_01_nt.dff", start: 86158862, end: 86162958 },
      { filename: "/vc-assets/local/models/gta3.img/lodalleys1b_01_dy.dff", start: 86162958, end: 86167054 },
      { filename: "/vc-assets/local/models/gta3.img/lodalleys2_01_dy.dff", start: 86167054, end: 86171150 },
      { filename: "/vc-assets/local/models/gta3.img/lodalleys2_01_nt.dff", start: 86171150, end: 86173198 },
      { filename: "/vc-assets/local/models/gta3.img/lodalleys3_01_nt.dff", start: 86173198, end: 86175246 },
      { filename: "/vc-assets/local/models/gta3.img/lodalleys3b_01_dy.dff", start: 86175246, end: 86177294 },
      { filename: "/vc-assets/local/models/gta3.img/lodalleys3b_01_nt.dff", start: 86177294, end: 86179342 },
      { filename: "/vc-assets/local/models/gta3.img/lodallroof01.dff", start: 86179342, end: 86183438 },
      { filename: "/vc-assets/local/models/gta3.img/lodanahouse01.dff", start: 86183438, end: 86187534 },
      { filename: "/vc-assets/local/models/gta3.img/lodanahouse02.dff", start: 86187534, end: 86191630 },
      { filename: "/vc-assets/local/models/gta3.img/lodanahouse03.dff", start: 86191630, end: 86195726 },
      { filename: "/vc-assets/local/models/gta3.img/lodanahouse04.dff", start: 86195726, end: 86199822 },
      { filename: "/vc-assets/local/models/gta3.img/lodanahouse06.dff", start: 86199822, end: 86203918 },
      { filename: "/vc-assets/local/models/gta3.img/lodanahouse07.dff", start: 86203918, end: 86208014 },
      { filename: "/vc-assets/local/models/gta3.img/lodanahouse09.dff", start: 86208014, end: 86212110 },
      { filename: "/vc-assets/local/models/gta3.img/lodanahouse10.dff", start: 86212110, end: 86218254 },
      { filename: "/vc-assets/local/models/gta3.img/lodanahouse11.dff", start: 86218254, end: 86222350 },
      { filename: "/vc-assets/local/models/gta3.img/lodanahouse12.dff", start: 86222350, end: 86242830 },
      { filename: "/vc-assets/local/models/gta3.img/lodanrd1_nt.dff", start: 86242830, end: 86246926 },
      { filename: "/vc-assets/local/models/gta3.img/lodanrda03_nt.dff", start: 86246926, end: 86251022 },
      { filename: "/vc-assets/local/models/gta3.img/lodanrda04_nt.dff", start: 86251022, end: 86253070 },
      { filename: "/vc-assets/local/models/gta3.img/lodanrda05_dy.dff", start: 86253070, end: 86255118 },
      { filename: "/vc-assets/local/models/gta3.img/lodanrda05_nt.dff", start: 86255118, end: 86257166 },
      { filename: "/vc-assets/local/models/gta3.img/lodanrda06_nt.dff", start: 86257166, end: 86259214 },
      { filename: "/vc-assets/local/models/gta3.img/lodanroad04.dff", start: 86259214, end: 86265358 },
      { filename: "/vc-assets/local/models/gta3.img/lodanroad05.dff", start: 86265358, end: 86269454 },
      { filename: "/vc-assets/local/models/gta3.img/lodanrod2b_nt.dff", start: 86269454, end: 86273550 },
      { filename: "/vc-assets/local/models/gta3.img/lodargohull2.dff", start: 86273550, end: 86285838 },
      { filename: "/vc-assets/local/models/gta3.img/lodasket.dff", start: 86285838, end: 86287886 },
      { filename: "/vc-assets/local/models/gta3.img/lodavehotel.dff", start: 86287886, end: 86308366 },
      { filename: "/vc-assets/local/models/gta3.img/lodawasteb2.dff", start: 86308366, end: 86312462 },
      { filename: "/vc-assets/local/models/gta3.img/lodawyersfront.dff", start: 86312462, end: 86314510 },
      { filename: "/vc-assets/local/models/gta3.img/lodbackbit.dff", start: 86314510, end: 86318606 },
      { filename: "/vc-assets/local/models/gta3.img/lodbighotel_nt.dff", start: 86318606, end: 86345230 },
      { filename: "/vc-assets/local/models/gta3.img/lodbighotpool.dff", start: 86345230, end: 86351374 },
      { filename: "/vc-assets/local/models/gta3.img/lodbigshops1.dff", start: 86351374, end: 86363662 },
      { filename: "/vc-assets/local/models/gta3.img/lodbigshops2.dff", start: 86363662, end: 86375950 },
      { filename: "/vc-assets/local/models/gta3.img/lodbillboards1.dff", start: 86375950, end: 86377998 },
      { filename: "/vc-assets/local/models/gta3.img/lodbillboards2.dff", start: 86377998, end: 86380046 },
      { filename: "/vc-assets/local/models/gta3.img/lodbillboards3.dff", start: 86380046, end: 86382094 },
      { filename: "/vc-assets/local/models/gta3.img/lodbillboards4.dff", start: 86382094, end: 86384142 },
      { filename: "/vc-assets/local/models/gta3.img/lodbillboards5.dff", start: 86384142, end: 86386190 },
      { filename: "/vc-assets/local/models/gta3.img/lodbit02.dff", start: 86386190, end: 86390286 },
      { filename: "/vc-assets/local/models/gta3.img/lodbit03.dff", start: 86390286, end: 86402574 },
      { filename: "/vc-assets/local/models/gta3.img/lodboxgirdbridge.dff", start: 86402574, end: 86404622 },
      { filename: "/vc-assets/local/models/gta3.img/lodbphq.dff", start: 86404622, end: 86412814 },
      { filename: "/vc-assets/local/models/gta3.img/lodbridge.txd", start: 86412814, end: 86418958 },
      { filename: "/vc-assets/local/models/gta3.img/lodbridgesupp01.dff", start: 86418958, end: 86429198 },
      { filename: "/vc-assets/local/models/gta3.img/lodbridgesupp03.dff", start: 86429198, end: 86437390 },
      { filename: "/vc-assets/local/models/gta3.img/lodbridgesupp04.dff", start: 86437390, end: 86445582 },
      { filename: "/vc-assets/local/models/gta3.img/lodbuil19wall.dff", start: 86445582, end: 86449678 },
      { filename: "/vc-assets/local/models/gta3.img/lodbuild.dff", start: 86449678, end: 86455822 },
      { filename: "/vc-assets/local/models/gta3.img/lodbuild01.dff", start: 86455822, end: 86472206 },
      { filename: "/vc-assets/local/models/gta3.img/lodbuilding01.dff", start: 86472206, end: 86484494 },
      { filename: "/vc-assets/local/models/gta3.img/lodbuildingg1.dff", start: 86484494, end: 86494734 },
      { filename: "/vc-assets/local/models/gta3.img/lodbuildingg2.dff", start: 86494734, end: 86502926 },
      { filename: "/vc-assets/local/models/gta3.img/lodbuildingg3.dff", start: 86502926, end: 86511118 },
      { filename: "/vc-assets/local/models/gta3.img/lodbuildingw1.dff", start: 86511118, end: 86519310 },
      { filename: "/vc-assets/local/models/gta3.img/lodbuildkb23_nt.dff", start: 86519310, end: 86521358 },
      { filename: "/vc-assets/local/models/gta3.img/lodbuildkb27_nt.dff", start: 86521358, end: 86523406 },
      { filename: "/vc-assets/local/models/gta3.img/lodbuildkb2_dy.dff", start: 86523406, end: 86525454 },
      { filename: "/vc-assets/local/models/gta3.img/lodbuildkb2_nt.dff", start: 86525454, end: 86527502 },
      { filename: "/vc-assets/local/models/gta3.img/lodbuildws02.dff", start: 86527502, end: 86531598 },
      { filename: "/vc-assets/local/models/gta3.img/lodbuildws03.dff", start: 86531598, end: 86541838 },
      { filename: "/vc-assets/local/models/gta3.img/lodbuildws04.dff", start: 86541838, end: 86556174 },
      { filename: "/vc-assets/local/models/gta3.img/lodbuildws05.dff", start: 86556174, end: 86560270 },
      { filename: "/vc-assets/local/models/gta3.img/lodbuildws06.dff", start: 86560270, end: 86572558 },
      { filename: "/vc-assets/local/models/gta3.img/lodbuildws07.dff", start: 86572558, end: 86578702 },
      { filename: "/vc-assets/local/models/gta3.img/lodbuildws07.txd", start: 86578702, end: 86660622 },
      { filename: "/vc-assets/local/models/gta3.img/lodbuildws09.dff", start: 86660622, end: 86672910 },
      { filename: "/vc-assets/local/models/gta3.img/lodbuildws10.dff", start: 86672910, end: 86677006 },
      { filename: "/vc-assets/local/models/gta3.img/lodbuildws12.dff", start: 86677006, end: 86681102 },
      { filename: "/vc-assets/local/models/gta3.img/lodbuildws13.dff", start: 86681102, end: 86693390 },
      { filename: "/vc-assets/local/models/gta3.img/lodbuildws14.dff", start: 86693390, end: 86707726 },
      { filename: "/vc-assets/local/models/gta3.img/lodbuildws16.dff", start: 86707726, end: 86726158 },
      { filename: "/vc-assets/local/models/gta3.img/lodbuildws17.dff", start: 86726158, end: 86742542 },
      { filename: "/vc-assets/local/models/gta3.img/lodbuildws18.dff", start: 86742542, end: 86756878 },
      { filename: "/vc-assets/local/models/gta3.img/lodbuildws19.dff", start: 86756878, end: 86767118 },
      { filename: "/vc-assets/local/models/gta3.img/lodbuildws20.dff", start: 86767118, end: 86773262 },
      { filename: "/vc-assets/local/models/gta3.img/lodbuildws21.dff", start: 86773262, end: 86779406 },
      { filename: "/vc-assets/local/models/gta3.img/lodbuildws22.dff", start: 86779406, end: 86783502 },
      { filename: "/vc-assets/local/models/gta3.img/lodbuildws23.dff", start: 86783502, end: 86789646 },
      { filename: "/vc-assets/local/models/gta3.img/lodbuildws2329.dff", start: 86789646, end: 86793742 },
      { filename: "/vc-assets/local/models/gta3.img/lodbuildws24.dff", start: 86793742, end: 86799886 },
      { filename: "/vc-assets/local/models/gta3.img/lodbuildws25.dff", start: 86799886, end: 86810126 },
      { filename: "/vc-assets/local/models/gta3.img/lodbuildws26.dff", start: 86810126, end: 86818318 },
      { filename: "/vc-assets/local/models/gta3.img/lodbuildws264.dff", start: 86818318, end: 86820366 },
      { filename: "/vc-assets/local/models/gta3.img/lodbuildws27.dff", start: 86820366, end: 86824462 },
      { filename: "/vc-assets/local/models/gta3.img/lodbuildws28.dff", start: 86824462, end: 86828558 },
      { filename: "/vc-assets/local/models/gta3.img/lodbuildws29.dff", start: 86828558, end: 86830606 },
      { filename: "/vc-assets/local/models/gta3.img/lodbuildws30.dff", start: 86830606, end: 86834702 },
      { filename: "/vc-assets/local/models/gta3.img/lodbuildws31.dff", start: 86834702, end: 86840846 },
      { filename: "/vc-assets/local/models/gta3.img/lodbuildws312.dff", start: 86840846, end: 86844942 },
      { filename: "/vc-assets/local/models/gta3.img/lodbuildws32.dff", start: 86844942, end: 86851086 },
      { filename: "/vc-assets/local/models/gta3.img/lodbuildws322.dff", start: 86851086, end: 86855182 },
      { filename: "/vc-assets/local/models/gta3.img/lodbuildws33.dff", start: 86855182, end: 86859278 },
      { filename: "/vc-assets/local/models/gta3.img/lodbuildws332.dff", start: 86859278, end: 86863374 },
      { filename: "/vc-assets/local/models/gta3.img/lodbuildws35.dff", start: 86863374, end: 86867470 },
      { filename: "/vc-assets/local/models/gta3.img/lodbuildws36.dff", start: 86867470, end: 86875662 },
      { filename: "/vc-assets/local/models/gta3.img/lodbuildws40.dff", start: 86875662, end: 86879758 },
      { filename: "/vc-assets/local/models/gta3.img/lodbuildws41.dff", start: 86879758, end: 86885902 },
      { filename: "/vc-assets/local/models/gta3.img/lodbuildws42.dff", start: 86885902, end: 86889998 },
      { filename: "/vc-assets/local/models/gta3.img/lodbuildws43.dff", start: 86889998, end: 86898190 },
      { filename: "/vc-assets/local/models/gta3.img/lodbuildws43ins.dff", start: 86898190, end: 86904334 },
      { filename: "/vc-assets/local/models/gta3.img/lodbuildws44.dff", start: 86904334, end: 86908430 },
      { filename: "/vc-assets/local/models/gta3.img/lodbuildws45.dff", start: 86908430, end: 86912526 },
      { filename: "/vc-assets/local/models/gta3.img/lodcargoshp03.dff", start: 86912526, end: 86914574 },
      { filename: "/vc-assets/local/models/gta3.img/lodcargoshp04.dff", start: 86914574, end: 86916622 },
      { filename: "/vc-assets/local/models/gta3.img/lodcargoshp05.dff", start: 86916622, end: 86928910 },
      { filename: "/vc-assets/local/models/gta3.img/lodcargoshp24.dff", start: 86928910, end: 86930958 },
      { filename: "/vc-assets/local/models/gta3.img/lodcargoshp25.dff", start: 86930958, end: 86933006 },
      { filename: "/vc-assets/local/models/gta3.img/lodcargoshp28.dff", start: 86933006, end: 86941198 },
      { filename: "/vc-assets/local/models/gta3.img/lodcargoshp32.dff", start: 86941198, end: 86947342 },
      { filename: "/vc-assets/local/models/gta3.img/lodcargoshp35.dff", start: 86947342, end: 86951438 },
      { filename: "/vc-assets/local/models/gta3.img/lodcargoshp40.dff", start: 86951438, end: 86955534 },
      { filename: "/vc-assets/local/models/gta3.img/lodcargoshp41.dff", start: 86955534, end: 86961678 },
      { filename: "/vc-assets/local/models/gta3.img/lodcargoshp47.dff", start: 86961678, end: 86965774 },
      { filename: "/vc-assets/local/models/gta3.img/lodcargoshp50.dff", start: 86965774, end: 86969870 },
      { filename: "/vc-assets/local/models/gta3.img/lodcargoshp51.dff", start: 86969870, end: 86973966 },
      { filename: "/vc-assets/local/models/gta3.img/lodcargoshp64.dff", start: 86973966, end: 86990350 },
      { filename: "/vc-assets/local/models/gta3.img/lodcargoshp70.dff", start: 86990350, end: 86998542 },
      { filename: "/vc-assets/local/models/gta3.img/lodcargoshp71.dff", start: 86998542, end: 87006734 },
      { filename: "/vc-assets/local/models/gta3.img/lodcargoshp72.dff", start: 87006734, end: 87012878 },
      { filename: "/vc-assets/local/models/gta3.img/lodcargoshp73.dff", start: 87012878, end: 87019022 },
      { filename: "/vc-assets/local/models/gta3.img/lodcarparkterm1.dff", start: 87019022, end: 87021070 },
      { filename: "/vc-assets/local/models/gta3.img/lodcasagrande_nt.dff", start: 87021070, end: 87027214 },
      { filename: "/vc-assets/local/models/gta3.img/lodcbtwbrdge.dff", start: 87027214, end: 87031310 },
      { filename: "/vc-assets/local/models/gta3.img/lodchariot.dff", start: 87031310, end: 87057934 },
      { filename: "/vc-assets/local/models/gta3.img/lodchbt.dff", start: 87057934, end: 87064078 },
      { filename: "/vc-assets/local/models/gta3.img/lodchbtb.dff", start: 87064078, end: 87066126 },
      { filename: "/vc-assets/local/models/gta3.img/lodchbtb2.dff", start: 87066126, end: 87070222 },
      { filename: "/vc-assets/local/models/gta3.img/lodchlo1.dff", start: 87070222, end: 87072270 },
      { filename: "/vc-assets/local/models/gta3.img/lodcland01.dff", start: 87072270, end: 87078414 },
      { filename: "/vc-assets/local/models/gta3.img/lodcland03.dff", start: 87078414, end: 87082510 },
      { filename: "/vc-assets/local/models/gta3.img/lodcland09.dff", start: 87082510, end: 87088654 },
      { filename: "/vc-assets/local/models/gta3.img/lodcland10.dff", start: 87088654, end: 87092750 },
      { filename: "/vc-assets/local/models/gta3.img/lodcland11.dff", start: 87092750, end: 87094798 },
      { filename: "/vc-assets/local/models/gta3.img/lodcland12.dff", start: 87094798, end: 87107086 },
      { filename: "/vc-assets/local/models/gta3.img/lodcland13_gf.dff", start: 87107086, end: 87113230 },
      { filename: "/vc-assets/local/models/gta3.img/lodclevelander_nt.dff", start: 87113230, end: 87121422 },
      { filename: "/vc-assets/local/models/gta3.img/lodclubback.dff", start: 87121422, end: 87123470 },
      { filename: "/vc-assets/local/models/gta3.img/lodclubhouse1.dff", start: 87123470, end: 87129614 },
      { filename: "/vc-assets/local/models/gta3.img/lodclubout_nt.dff", start: 87129614, end: 87143950 },
      { filename: "/vc-assets/local/models/gta3.img/lodcoast.dff", start: 87143950, end: 87148046 },
      { filename: "/vc-assets/local/models/gta3.img/lodcoast04.dff", start: 87148046, end: 87154190 },
      { filename: "/vc-assets/local/models/gta3.img/lodcoast06.dff", start: 87154190, end: 87160334 },
      { filename: "/vc-assets/local/models/gta3.img/lodcoast08.dff", start: 87160334, end: 87164430 },
      { filename: "/vc-assets/local/models/gta3.img/lodcoast1.dff", start: 87164430, end: 87168526 },
      { filename: "/vc-assets/local/models/gta3.img/lodcoast2.dff", start: 87168526, end: 87172622 },
      { filename: "/vc-assets/local/models/gta3.img/lodcoast3.dff", start: 87172622, end: 87176718 },
      { filename: "/vc-assets/local/models/gta3.img/lodcoast4.dff", start: 87176718, end: 87180814 },
      { filename: "/vc-assets/local/models/gta3.img/lodcoast5.dff", start: 87180814, end: 87182862 },
      { filename: "/vc-assets/local/models/gta3.img/lodcoasta2.dff", start: 87182862, end: 87184910 },
      { filename: "/vc-assets/local/models/gta3.img/lodcoastfirst.dff", start: 87184910, end: 87189006 },
      { filename: "/vc-assets/local/models/gta3.img/lodcolony2_dy.dff", start: 87189006, end: 87193102 },
      { filename: "/vc-assets/local/models/gta3.img/lodcolony2_nt.dff", start: 87193102, end: 87197198 },
      { filename: "/vc-assets/local/models/gta3.img/lodcolony_nt.dff", start: 87197198, end: 87203342 },
      { filename: "/vc-assets/local/models/gta3.img/lodconcwall1.dff", start: 87203342, end: 87205390 },
      { filename: "/vc-assets/local/models/gta3.img/lodcpaynspray.dff", start: 87205390, end: 87211534 },
      { filename: "/vc-assets/local/models/gta3.img/lodcrushbn.dff", start: 87211534, end: 87217678 },
      { filename: "/vc-assets/local/models/gta3.img/lodcrushefuck.dff", start: 87217678, end: 87234062 },
      { filename: "/vc-assets/local/models/gta3.img/lodcrushers08.dff", start: 87234062, end: 87250446 },
      { filename: "/vc-assets/local/models/gta3.img/lodcrushers10.dff", start: 87250446, end: 87264782 },
      { filename: "/vc-assets/local/models/gta3.img/lodcrushers12.dff", start: 87264782, end: 87272974 },
      { filename: "/vc-assets/local/models/gta3.img/lodcrushers14.dff", start: 87272974, end: 87283214 },
      { filename: "/vc-assets/local/models/gta3.img/lodcrushju.dff", start: 87283214, end: 87295502 },
      { filename: "/vc-assets/local/models/gta3.img/lodcrushmnf.dff", start: 87295502, end: 87301646 },
      { filename: "/vc-assets/local/models/gta3.img/lodd_build2.dff", start: 87301646, end: 87315982 },
      { filename: "/vc-assets/local/models/gta3.img/lodd_buildnew.dff", start: 87315982, end: 87320078 },
      { filename: "/vc-assets/local/models/gta3.img/lodd_downtown05.dff", start: 87320078, end: 87322126 },
      { filename: "/vc-assets/local/models/gta3.img/lodd_downtown06.dff", start: 87322126, end: 87324174 },
      { filename: "/vc-assets/local/models/gta3.img/lodd_downtown08.dff", start: 87324174, end: 87326222 },
      { filename: "/vc-assets/local/models/gta3.img/lodd_downtown09.dff", start: 87326222, end: 87328270 },
      { filename: "/vc-assets/local/models/gta3.img/lodd_downtown10.dff", start: 87328270, end: 87330318 },
      { filename: "/vc-assets/local/models/gta3.img/lodd_downtown_new1.dff", start: 87330318, end: 87332366 },
      { filename: "/vc-assets/local/models/gta3.img/loddbridge.dff", start: 87332366, end: 87338510 },
      { filename: "/vc-assets/local/models/gta3.img/loddingsite1.dff", start: 87338510, end: 87361038 },
      { filename: "/vc-assets/local/models/gta3.img/loddockbridge.dff", start: 87361038, end: 87365134 },
      { filename: "/vc-assets/local/models/gta3.img/loddockroads01.dff", start: 87365134, end: 87367182 },
      { filename: "/vc-assets/local/models/gta3.img/loddockroads02.dff", start: 87367182, end: 87371278 },
      { filename: "/vc-assets/local/models/gta3.img/loddockroads03.dff", start: 87371278, end: 87375374 },
      { filename: "/vc-assets/local/models/gta3.img/loddockroads04.dff", start: 87375374, end: 87377422 },
      { filename: "/vc-assets/local/models/gta3.img/loddockroads05.dff", start: 87377422, end: 87379470 },
      { filename: "/vc-assets/local/models/gta3.img/loddockroads06.dff", start: 87379470, end: 87383566 },
      { filename: "/vc-assets/local/models/gta3.img/loddockroads08.dff", start: 87383566, end: 87387662 },
      { filename: "/vc-assets/local/models/gta3.img/loddockwall1.dff", start: 87387662, end: 87389710 },
      { filename: "/vc-assets/local/models/gta3.img/loder2.dff", start: 87389710, end: 87393806 },
      { filename: "/vc-assets/local/models/gta3.img/lodfiretrucks.dff", start: 87393806, end: 87399950 },
      { filename: "/vc-assets/local/models/gta3.img/lodflargetank1.dff", start: 87399950, end: 87406094 },
      { filename: "/vc-assets/local/models/gta3.img/lodflyingschool1.dff", start: 87406094, end: 87410190 },
      { filename: "/vc-assets/local/models/gta3.img/lodfreightterminal1.dff", start: 87410190, end: 87418382 },
      { filename: "/vc-assets/local/models/gta3.img/lodfroad1.dff", start: 87418382, end: 87420430 },
      { filename: "/vc-assets/local/models/gta3.img/lodfroad2.dff", start: 87420430, end: 87424526 },
      { filename: "/vc-assets/local/models/gta3.img/lodfroad3.dff", start: 87424526, end: 87426574 },
      { filename: "/vc-assets/local/models/gta3.img/lodfroad4.dff", start: 87426574, end: 87428622 },
      { filename: "/vc-assets/local/models/gta3.img/lodfroad5.dff", start: 87428622, end: 87432718 },
      { filename: "/vc-assets/local/models/gta3.img/lodfsthus.dff", start: 87432718, end: 87445006 },
      { filename: "/vc-assets/local/models/gta3.img/lodgarage02.dff", start: 87445006, end: 87447054 },
      { filename: "/vc-assets/local/models/gta3.img/lodgarage03.dff", start: 87447054, end: 87451150 },
      { filename: "/vc-assets/local/models/gta3.img/lodgarage1.dff", start: 87451150, end: 87453198 },
      { filename: "/vc-assets/local/models/gta3.img/lodgarden1.dff", start: 87453198, end: 87459342 },
      { filename: "/vc-assets/local/models/gta3.img/lodgate03.dff", start: 87459342, end: 87465486 },
      { filename: "/vc-assets/local/models/gta3.img/lodgate1.dff", start: 87465486, end: 87467534 },
      { filename: "/vc-assets/local/models/gta3.img/lodgate2.dff", start: 87467534, end: 87469582 },
      { filename: "/vc-assets/local/models/gta3.img/lodgatesa.dff", start: 87469582, end: 87481870 },
      { filename: "/vc-assets/local/models/gta3.img/lodgatesb.dff", start: 87481870, end: 87494158 },
      { filename: "/vc-assets/local/models/gta3.img/lodgolfwall.dff", start: 87494158, end: 87504398 },
      { filename: "/vc-assets/local/models/gta3.img/lodgrnda1.dff", start: 87504398, end: 87506446 },
      { filename: "/vc-assets/local/models/gta3.img/lodground1.dff", start: 87506446, end: 87510542 },
      { filename: "/vc-assets/local/models/gta3.img/lodground2.dff", start: 87510542, end: 87518734 },
      { filename: "/vc-assets/local/models/gta3.img/lodground3.dff", start: 87518734, end: 87522830 },
      { filename: "/vc-assets/local/models/gta3.img/lodground4.dff", start: 87522830, end: 87526926 },
      { filename: "/vc-assets/local/models/gta3.img/lodground5.dff", start: 87526926, end: 87531022 },
      { filename: "/vc-assets/local/models/gta3.img/lodgroundplane.dff", start: 87531022, end: 87535118 },
      { filename: "/vc-assets/local/models/gta3.img/lodgstoreext.dff", start: 87535118, end: 87539214 },
      { filename: "/vc-assets/local/models/gta3.img/lodh_ammu.dff", start: 87539214, end: 87541262 },
      { filename: "/vc-assets/local/models/gta3.img/lodh_brdgsup1.dff", start: 87541262, end: 87549454 },
      { filename: "/vc-assets/local/models/gta3.img/lodh_deco01.dff", start: 87549454, end: 87569934 },
      { filename: "/vc-assets/local/models/gta3.img/lodh_deco02.dff", start: 87569934, end: 87586318 },
      { filename: "/vc-assets/local/models/gta3.img/lodh_deco03.dff", start: 87586318, end: 87604750 },
      { filename: "/vc-assets/local/models/gta3.img/lodh_deco04.dff", start: 87604750, end: 87617038 },
      { filename: "/vc-assets/local/models/gta3.img/lodh_deco05.dff", start: 87617038, end: 87623182 },
      { filename: "/vc-assets/local/models/gta3.img/lodh_hardwares.dff", start: 87623182, end: 87625230 },
      { filename: "/vc-assets/local/models/gta3.img/lodh_hosp02.dff", start: 87625230, end: 87631374 },
      { filename: "/vc-assets/local/models/gta3.img/lodh_hosp03.dff", start: 87631374, end: 87637518 },
      { filename: "/vc-assets/local/models/gta3.img/lodh_hospgrnd.dff", start: 87637518, end: 87643662 },
      { filename: "/vc-assets/local/models/gta3.img/lodh_hospital.dff", start: 87643662, end: 87653902 },
      { filename: "/vc-assets/local/models/gta3.img/lodh_pizzaplace.dff", start: 87653902, end: 87655950 },
      { filename: "/vc-assets/local/models/gta3.img/lodhafinrd.dff", start: 87655950, end: 87660046 },
      { filename: "/vc-assets/local/models/gta3.img/lodhahousebk2.dff", start: 87660046, end: 87666190 },
      { filename: "/vc-assets/local/models/gta3.img/lodhaiblockc1.dff", start: 87666190, end: 87678478 },
      { filename: "/vc-assets/local/models/gta3.img/lodhaiblockc2.dff", start: 87678478, end: 87690766 },
      { filename: "/vc-assets/local/models/gta3.img/lodhaiblockc3.dff", start: 87690766, end: 87703054 },
      { filename: "/vc-assets/local/models/gta3.img/lodhaiti.txd", start: 87703054, end: 87784974 },
      { filename: "/vc-assets/local/models/gta3.img/lodhaitibig.txd", start: 87784974, end: 87834126 },
      { filename: "/vc-assets/local/models/gta3.img/lodhaitin.txd", start: 87834126, end: 87856654 },
      { filename: "/vc-assets/local/models/gta3.img/lodhaitinbig.txd", start: 87856654, end: 87985678 },
      { filename: "/vc-assets/local/models/gta3.img/lodhangar1.dff", start: 87985678, end: 87989774 },
      { filename: "/vc-assets/local/models/gta3.img/lodhangar1_01.dff", start: 87989774, end: 87993870 },
      { filename: "/vc-assets/local/models/gta3.img/lodhangar1_04.dff", start: 87993870, end: 87997966 },
      { filename: "/vc-assets/local/models/gta3.img/lodharoada2.dff", start: 87997966, end: 88002062 },
      { filename: "/vc-assets/local/models/gta3.img/lodharoada3.dff", start: 88002062, end: 88008206 },
      { filename: "/vc-assets/local/models/gta3.img/lodharoada4.dff", start: 88008206, end: 88010254 },
      { filename: "/vc-assets/local/models/gta3.img/lodharoada6.dff", start: 88010254, end: 88014350 },
      { filename: "/vc-assets/local/models/gta3.img/lodharoada8.dff", start: 88014350, end: 88018446 },
      { filename: "/vc-assets/local/models/gta3.img/lodharoada9.dff", start: 88018446, end: 88022542 },
      { filename: "/vc-assets/local/models/gta3.img/lodhavabit01.dff", start: 88022542, end: 88028686 },
      { filename: "/vc-assets/local/models/gta3.img/lodhavabit04.dff", start: 88028686, end: 88030734 },
      { filename: "/vc-assets/local/models/gta3.img/lodhavabit05.dff", start: 88030734, end: 88034830 },
      { filename: "/vc-assets/local/models/gta3.img/lodhavabit06.dff", start: 88034830, end: 88038926 },
      { filename: "/vc-assets/local/models/gta3.img/lodhavabit07.dff", start: 88038926, end: 88043022 },
      { filename: "/vc-assets/local/models/gta3.img/lodhavabit08.dff", start: 88043022, end: 88047118 },
      { filename: "/vc-assets/local/models/gta3.img/lodhavabit09.dff", start: 88047118, end: 88051214 },
      { filename: "/vc-assets/local/models/gta3.img/lodhavabit10.dff", start: 88051214, end: 88055310 },
      { filename: "/vc-assets/local/models/gta3.img/lodhavabit11.dff", start: 88055310, end: 88059406 },
      { filename: "/vc-assets/local/models/gta3.img/lodhavabit12.dff", start: 88059406, end: 88063502 },
      { filename: "/vc-assets/local/models/gta3.img/lodhavana.txd", start: 88063502, end: 88149518 },
      { filename: "/vc-assets/local/models/gta3.img/lodhavanabrg.txd", start: 88149518, end: 88153614 },
      { filename: "/vc-assets/local/models/gta3.img/lodhavbig.txd", start: 88153614, end: 88180238 },
      { filename: "/vc-assets/local/models/gta3.img/lodhavroad3.dff", start: 88180238, end: 88184334 },
      { filename: "/vc-assets/local/models/gta3.img/lodhawaste1.dff", start: 88184334, end: 88188430 },
      { filename: "/vc-assets/local/models/gta3.img/lodhawaste2.dff", start: 88188430, end: 88190478 },
      { filename: "/vc-assets/local/models/gta3.img/lodhbit04bgrd1.dff", start: 88190478, end: 88194574 },
      { filename: "/vc-assets/local/models/gta3.img/lodhbit04grd2.dff", start: 88194574, end: 88196622 },
      { filename: "/vc-assets/local/models/gta3.img/lodhbtjetty01.dff", start: 88196622, end: 88206862 },
      { filename: "/vc-assets/local/models/gta3.img/lodhbtjetty02.dff", start: 88206862, end: 88217102 },
      { filename: "/vc-assets/local/models/gta3.img/lodhbuild003.dff", start: 88217102, end: 88219150 },
      { filename: "/vc-assets/local/models/gta3.img/lodhbuild005.dff", start: 88219150, end: 88225294 },
      { filename: "/vc-assets/local/models/gta3.img/lodhbuild013.dff", start: 88225294, end: 88229390 },
      { filename: "/vc-assets/local/models/gta3.img/lodhbuild014.dff", start: 88229390, end: 88233486 },
      { filename: "/vc-assets/local/models/gta3.img/lodhbuild015.dff", start: 88233486, end: 88237582 },
      { filename: "/vc-assets/local/models/gta3.img/lodhbuild017.dff", start: 88237582, end: 88245774 },
      { filename: "/vc-assets/local/models/gta3.img/lodhbuild018.dff", start: 88245774, end: 88251918 },
      { filename: "/vc-assets/local/models/gta3.img/lodhbuild020.dff", start: 88251918, end: 88256014 },
      { filename: "/vc-assets/local/models/gta3.img/lodhbuild021.dff", start: 88256014, end: 88258062 },
      { filename: "/vc-assets/local/models/gta3.img/lodhbuild025.dff", start: 88258062, end: 88264206 },
      { filename: "/vc-assets/local/models/gta3.img/lodhbuild033.dff", start: 88264206, end: 88272398 },
      { filename: "/vc-assets/local/models/gta3.img/lodhbuild040.dff", start: 88272398, end: 88278542 },
      { filename: "/vc-assets/local/models/gta3.img/lodhbuild043.dff", start: 88278542, end: 88303118 },
      { filename: "/vc-assets/local/models/gta3.img/lodhbuild050.dff", start: 88303118, end: 88311310 },
      { filename: "/vc-assets/local/models/gta3.img/lodhbuild058.dff", start: 88311310, end: 88321550 },
      { filename: "/vc-assets/local/models/gta3.img/lodhbuild062.dff", start: 88321550, end: 88327694 },
      { filename: "/vc-assets/local/models/gta3.img/lodhbuild063.dff", start: 88327694, end: 88337934 },
      { filename: "/vc-assets/local/models/gta3.img/lodhbuild066.dff", start: 88337934, end: 88348174 },
      { filename: "/vc-assets/local/models/gta3.img/lodhbuild068.dff", start: 88348174, end: 88354318 },
      { filename: "/vc-assets/local/models/gta3.img/lodhbuild069.dff", start: 88354318, end: 88360462 },
      { filename: "/vc-assets/local/models/gta3.img/lodhbuild071.dff", start: 88360462, end: 88362510 },
      { filename: "/vc-assets/local/models/gta3.img/lodhbuild072.dff", start: 88362510, end: 88364558 },
      { filename: "/vc-assets/local/models/gta3.img/lodhbuild073.dff", start: 88364558, end: 88366606 },
      { filename: "/vc-assets/local/models/gta3.img/lodhbuild074.dff", start: 88366606, end: 88368654 },
      { filename: "/vc-assets/local/models/gta3.img/lodhbuild075.dff", start: 88368654, end: 88370702 },
      { filename: "/vc-assets/local/models/gta3.img/lodhbuild081.dff", start: 88370702, end: 88372750 },
      { filename: "/vc-assets/local/models/gta3.img/lodhbuild0812.dff", start: 88372750, end: 88376846 },
      { filename: "/vc-assets/local/models/gta3.img/lodhbuild111.dff", start: 88376846, end: 88378894 },
      { filename: "/vc-assets/local/models/gta3.img/lodhbuild112.dff", start: 88378894, end: 88387086 },
      { filename: "/vc-assets/local/models/gta3.img/lodhbuild114.dff", start: 88387086, end: 88389134 },
      { filename: "/vc-assets/local/models/gta3.img/lodhbuild116.dff", start: 88389134, end: 88391182 },
      { filename: "/vc-assets/local/models/gta3.img/lodhbuild119.dff", start: 88391182, end: 88393230 },
      { filename: "/vc-assets/local/models/gta3.img/lodhbuild120.dff", start: 88393230, end: 88395278 },
      { filename: "/vc-assets/local/models/gta3.img/lodhbuild121.dff", start: 88395278, end: 88397326 },
      { filename: "/vc-assets/local/models/gta3.img/lodhbuild184.dff", start: 88397326, end: 88407566 },
      { filename: "/vc-assets/local/models/gta3.img/lodhbuild187.dff", start: 88407566, end: 88415758 },
      { filename: "/vc-assets/local/models/gta3.img/lodhbuild192.dff", start: 88415758, end: 88417806 },
      { filename: "/vc-assets/local/models/gta3.img/lodhbuild195.dff", start: 88417806, end: 88419854 },
      { filename: "/vc-assets/local/models/gta3.img/lodhbuild198.dff", start: 88419854, end: 88428046 },
      { filename: "/vc-assets/local/models/gta3.img/lodhbuild203.dff", start: 88428046, end: 88432142 },
      { filename: "/vc-assets/local/models/gta3.img/lodhbuild213.dff", start: 88432142, end: 88434190 },
      { filename: "/vc-assets/local/models/gta3.img/lodhbuild214.dff", start: 88434190, end: 88436238 },
      { filename: "/vc-assets/local/models/gta3.img/lodhbuild215.dff", start: 88436238, end: 88438286 },
      { filename: "/vc-assets/local/models/gta3.img/lodhbuild216.dff", start: 88438286, end: 88440334 },
      { filename: "/vc-assets/local/models/gta3.img/lodhipment01.dff", start: 88440334, end: 88444430 },
      { filename: "/vc-assets/local/models/gta3.img/lodhipment03.dff", start: 88444430, end: 88452622 },
      { filename: "/vc-assets/local/models/gta3.img/lodhipment05.dff", start: 88452622, end: 88460814 },
      { filename: "/vc-assets/local/models/gta3.img/lodhit14.dff", start: 88460814, end: 88469006 },
      { filename: "/vc-assets/local/models/gta3.img/lodhitbuild1a.dff", start: 88469006, end: 88481294 },
      { filename: "/vc-assets/local/models/gta3.img/lodhitbuild1aa.dff", start: 88481294, end: 88487438 },
      { filename: "/vc-assets/local/models/gta3.img/lodhitsjm.dff", start: 88487438, end: 88499726 },
      { filename: "/vc-assets/local/models/gta3.img/lodhland_01.dff", start: 88499726, end: 88507918 },
      { filename: "/vc-assets/local/models/gta3.img/lodhnewsky1.dff", start: 88507918, end: 88518158 },
      { filename: "/vc-assets/local/models/gta3.img/lodhnewsky2.dff", start: 88518158, end: 88526350 },
      { filename: "/vc-assets/local/models/gta3.img/lodhnewsky3.dff", start: 88526350, end: 88536590 },
      { filename: "/vc-assets/local/models/gta3.img/lodhookerinn1.dff", start: 88536590, end: 88542734 },
      { filename: "/vc-assets/local/models/gta3.img/lodhoose.dff", start: 88542734, end: 88557070 },
      { filename: "/vc-assets/local/models/gta3.img/lodhotel.dff", start: 88557070, end: 88561166 },
      { filename: "/vc-assets/local/models/gta3.img/lodhotel10.dff", start: 88561166, end: 88581646 },
      { filename: "/vc-assets/local/models/gta3.img/lodhotel_windows.dff", start: 88581646, end: 88593934 },
      { filename: "/vc-assets/local/models/gta3.img/lodhotelgrnd.dff", start: 88593934, end: 88600078 },
      { filename: "/vc-assets/local/models/gta3.img/lodhpaynspray.dff", start: 88600078, end: 88606222 },
      { filename: "/vc-assets/local/models/gta3.img/lodhpshoutdet.dff", start: 88606222, end: 88616462 },
      { filename: "/vc-assets/local/models/gta3.img/lodhsebuild1.dff", start: 88616462, end: 88622606 },
      { filename: "/vc-assets/local/models/gta3.img/lodhtooceanrd1.dff", start: 88622606, end: 88626702 },
      { filename: "/vc-assets/local/models/gta3.img/lodhundermall1.dff", start: 88626702, end: 88632846 },
      { filename: "/vc-assets/local/models/gta3.img/lodhwbridge.dff", start: 88632846, end: 88645134 },
      { filename: "/vc-assets/local/models/gta3.img/lodi_exterior_front.dff", start: 88645134, end: 88647182 },
      { filename: "/vc-assets/local/models/gta3.img/lodiamiland049.dff", start: 88647182, end: 88651278 },
      { filename: "/vc-assets/local/models/gta3.img/lodiamiland050.dff", start: 88651278, end: 88655374 },
      { filename: "/vc-assets/local/models/gta3.img/lodiamiland057.dff", start: 88655374, end: 88659470 },
      { filename: "/vc-assets/local/models/gta3.img/lodicecream01.dff", start: 88659470, end: 88667662 },
      { filename: "/vc-assets/local/models/gta3.img/lodighsandgrs1.dff", start: 88667662, end: 88671758 },
      { filename: "/vc-assets/local/models/gta3.img/lodigste1mesh.dff", start: 88671758, end: 88673806 },
      { filename: "/vc-assets/local/models/gta3.img/lodina1.dff", start: 88673806, end: 88679950 },
      { filename: "/vc-assets/local/models/gta3.img/lodina2.dff", start: 88679950, end: 88686094 },
      { filename: "/vc-assets/local/models/gta3.img/lodina3.dff", start: 88686094, end: 88688142 },
      { filename: "/vc-assets/local/models/gta3.img/lodinhaiti.dff", start: 88688142, end: 88694286 },
      { filename: "/vc-assets/local/models/gta3.img/lodipad0.dff", start: 88694286, end: 88698382 },
      { filename: "/vc-assets/local/models/gta3.img/lodita1.dff", start: 88698382, end: 88702478 },
      { filename: "/vc-assets/local/models/gta3.img/loditcut.dff", start: 88702478, end: 88712718 },
      { filename: "/vc-assets/local/models/gta3.img/loditnewbt.dff", start: 88712718, end: 88731150 },
      { filename: "/vc-assets/local/models/gta3.img/loditsnip.dff", start: 88731150, end: 88737294 },
      { filename: "/vc-assets/local/models/gta3.img/loditwarhus.dff", start: 88737294, end: 88745486 },
      { filename: "/vc-assets/local/models/gta3.img/lodjumbo_01.dff", start: 88745486, end: 88753678 },
      { filename: "/vc-assets/local/models/gta3.img/lodk_camjones.dff", start: 88753678, end: 88759822 },
      { filename: "/vc-assets/local/models/gta3.img/lodk_grassarea.dff", start: 88759822, end: 88765966 },
      { filename: "/vc-assets/local/models/gta3.img/lodkcranescale0.dff", start: 88765966, end: 88782350 },
      { filename: "/vc-assets/local/models/gta3.img/lodkcranescale01.dff", start: 88782350, end: 88798734 },
      { filename: "/vc-assets/local/models/gta3.img/lodkfuel02.dff", start: 88798734, end: 88811022 },
      { filename: "/vc-assets/local/models/gta3.img/lodkhus.dff", start: 88811022, end: 88823310 },
      { filename: "/vc-assets/local/models/gta3.img/lodks10.dff", start: 88823310, end: 88841742 },
      { filename: "/vc-assets/local/models/gta3.img/lodks21.dff", start: 88841742, end: 88862222 },
      { filename: "/vc-assets/local/models/gta3.img/lodks28.dff", start: 88862222, end: 88868366 },
      { filename: "/vc-assets/local/models/gta3.img/lodks29.dff", start: 88868366, end: 88870414 },
      { filename: "/vc-assets/local/models/gta3.img/lodks30.dff", start: 88870414, end: 88888846 },
      { filename: "/vc-assets/local/models/gta3.img/lodks31.dff", start: 88888846, end: 88890894 },
      { filename: "/vc-assets/local/models/gta3.img/lodks32.dff", start: 88890894, end: 88892942 },
      { filename: "/vc-assets/local/models/gta3.img/lodks37.dff", start: 88892942, end: 88901134 },
      { filename: "/vc-assets/local/models/gta3.img/lodks40.dff", start: 88901134, end: 88905230 },
      { filename: "/vc-assets/local/models/gta3.img/lodks42.dff", start: 88905230, end: 88913422 },
      { filename: "/vc-assets/local/models/gta3.img/lodks43.dff", start: 88913422, end: 88921614 },
      { filename: "/vc-assets/local/models/gta3.img/lodks46.dff", start: 88921614, end: 88940046 },
      { filename: "/vc-assets/local/models/gta3.img/lodks47.dff", start: 88940046, end: 88948238 },
      { filename: "/vc-assets/local/models/gta3.img/lodks48.dff", start: 88948238, end: 88956430 },
      { filename: "/vc-assets/local/models/gta3.img/lodks49.dff", start: 88956430, end: 88964622 },
      { filename: "/vc-assets/local/models/gta3.img/lodks50.dff", start: 88964622, end: 88970766 },
      { filename: "/vc-assets/local/models/gta3.img/lodks51.dff", start: 88970766, end: 88978958 },
      { filename: "/vc-assets/local/models/gta3.img/lodks52.dff", start: 88978958, end: 88985102 },
      { filename: "/vc-assets/local/models/gta3.img/lodks53.dff", start: 88985102, end: 88993294 },
      { filename: "/vc-assets/local/models/gta3.img/lodks60.dff", start: 88993294, end: 88997390 },
      { filename: "/vc-assets/local/models/gta3.img/lodks61.dff", start: 88997390, end: 89003534 },
      { filename: "/vc-assets/local/models/gta3.img/lodks62.dff", start: 89003534, end: 89007630 },
      { filename: "/vc-assets/local/models/gta3.img/lodks85.dff", start: 89007630, end: 89011726 },
      { filename: "/vc-assets/local/models/gta3.img/lodks92.dff", start: 89011726, end: 89015822 },
      { filename: "/vc-assets/local/models/gta3.img/lodks93.dff", start: 89015822, end: 89019918 },
      { filename: "/vc-assets/local/models/gta3.img/lodks95.dff", start: 89019918, end: 89026062 },
      { filename: "/vc-assets/local/models/gta3.img/lodks96.dff", start: 89026062, end: 89030158 },
      { filename: "/vc-assets/local/models/gta3.img/lodksprops04.dff", start: 89030158, end: 89034254 },
      { filename: "/vc-assets/local/models/gta3.img/lodksprops10.dff", start: 89034254, end: 89040398 },
      { filename: "/vc-assets/local/models/gta3.img/lodksprops11.dff", start: 89040398, end: 89046542 },
      { filename: "/vc-assets/local/models/gta3.img/lodksprops14.dff", start: 89046542, end: 89050638 },
      { filename: "/vc-assets/local/models/gta3.img/lodksprops15.dff", start: 89050638, end: 89052686 },
      { filename: "/vc-assets/local/models/gta3.img/lodksware01.dff", start: 89052686, end: 89062926 },
      { filename: "/vc-assets/local/models/gta3.img/lodl2.dff", start: 89062926, end: 89067022 },
      { filename: "/vc-assets/local/models/gta3.img/lodlargebuild.dff", start: 89067022, end: 89073166 },
      { filename: "/vc-assets/local/models/gta3.img/lodld1.dff", start: 89073166, end: 89081358 },
      { filename: "/vc-assets/local/models/gta3.img/lodldingground40.dff", start: 89081358, end: 89087502 },
      { filename: "/vc-assets/local/models/gta3.img/lodldingground50.dff", start: 89087502, end: 89093646 },
      { filename: "/vc-assets/local/models/gta3.img/lodldingsite2.dff", start: 89093646, end: 89101838 },
      { filename: "/vc-assets/local/models/gta3.img/lodlhaitibuilding02.dff", start: 89101838, end: 89112078 },
      { filename: "/vc-assets/local/models/gta3.img/lodlhaitibuilding06.dff", start: 89112078, end: 89124366 },
      { filename: "/vc-assets/local/models/gta3.img/lodlhaitibuilding07.dff", start: 89124366, end: 89126414 },
      { filename: "/vc-assets/local/models/gta3.img/lodlhaitibuilding09.dff", start: 89126414, end: 89140750 },
      { filename: "/vc-assets/local/models/gta3.img/lodlhland.dff", start: 89140750, end: 89150990 },
      { filename: "/vc-assets/local/models/gta3.img/lodlightext.dff", start: 89150990, end: 89161230 },
      { filename: "/vc-assets/local/models/gta3.img/lodlleygb_nt.dff", start: 89161230, end: 89163278 },
      { filename: "/vc-assets/local/models/gta3.img/lodlleyground.dff", start: 89163278, end: 89165326 },
      { filename: "/vc-assets/local/models/gta3.img/lodlleyground2.dff", start: 89165326, end: 89167374 },
      { filename: "/vc-assets/local/models/gta3.img/lodlleyground4.dff", start: 89167374, end: 89169422 },
      { filename: "/vc-assets/local/models/gta3.img/lodlleyground5.dff", start: 89169422, end: 89171470 },
      { filename: "/vc-assets/local/models/gta3.img/lodmain_body.dff", start: 89171470, end: 89189902 },
      { filename: "/vc-assets/local/models/gta3.img/lodmainisl2b_01.dff", start: 89189902, end: 89193998 },
      { filename: "/vc-assets/local/models/gta3.img/lodmainisl4_01.dff", start: 89193998, end: 89204238 },
      { filename: "/vc-assets/local/models/gta3.img/lodmainisl5_01.dff", start: 89204238, end: 89216526 },
      { filename: "/vc-assets/local/models/gta3.img/lodmainisland1a_01.dff", start: 89216526, end: 89222670 },
      { filename: "/vc-assets/local/models/gta3.img/lodmainisland1b_01.dff", start: 89222670, end: 89230862 },
      { filename: "/vc-assets/local/models/gta3.img/lodmainisland2a_01.dff", start: 89230862, end: 89237006 },
      { filename: "/vc-assets/local/models/gta3.img/lodmainisland3a_01.dff", start: 89237006, end: 89249294 },
      { filename: "/vc-assets/local/models/gta3.img/lodmainisland3b_01.dff", start: 89249294, end: 89257486 },
      { filename: "/vc-assets/local/models/gta3.img/lodmainisland6a_01.dff", start: 89257486, end: 89265678 },
      { filename: "/vc-assets/local/models/gta3.img/lodmainisland6b_01.dff", start: 89265678, end: 89269774 },
      { filename: "/vc-assets/local/models/gta3.img/lodmajestic2c_dy.dff", start: 89269774, end: 89275918 },
      { filename: "/vc-assets/local/models/gta3.img/lodmajestic2c_nt.dff", start: 89275918, end: 89284110 },
      { filename: "/vc-assets/local/models/gta3.img/lodmalsign4.dff", start: 89284110, end: 89286158 },
      { filename: "/vc-assets/local/models/gta3.img/lodmalsign5.dff", start: 89286158, end: 89288206 },
      { filename: "/vc-assets/local/models/gta3.img/lodmiamilanda.dff", start: 89288206, end: 89294350 },
      { filename: "/vc-assets/local/models/gta3.img/lodmiland027a.dff", start: 89294350, end: 89306638 },
      { filename: "/vc-assets/local/models/gta3.img/lodmiland037.dff", start: 89306638, end: 89312782 },
      { filename: "/vc-assets/local/models/gta3.img/lodmiland039.dff", start: 89312782, end: 89314830 },
      { filename: "/vc-assets/local/models/gta3.img/lodmiland041.dff", start: 89314830, end: 89318926 },
      { filename: "/vc-assets/local/models/gta3.img/lodmiland170.dff", start: 89318926, end: 89323022 },
      { filename: "/vc-assets/local/models/gta3.img/lodmiland171.dff", start: 89323022, end: 89335310 },
      { filename: "/vc-assets/local/models/gta3.img/lodmiland172.dff", start: 89335310, end: 89343502 },
      { filename: "/vc-assets/local/models/gta3.img/lodmiland173.dff", start: 89343502, end: 89353742 },
      { filename: "/vc-assets/local/models/gta3.img/lodmiland174.dff", start: 89353742, end: 89361934 },
      { filename: "/vc-assets/local/models/gta3.img/lodmiland175.dff", start: 89361934, end: 89368078 },
      { filename: "/vc-assets/local/models/gta3.img/lodmiland176.dff", start: 89368078, end: 89370126 },
      { filename: "/vc-assets/local/models/gta3.img/lodmiland177.dff", start: 89370126, end: 89372174 },
      { filename: "/vc-assets/local/models/gta3.img/lodmiland178.dff", start: 89372174, end: 89374222 },
      { filename: "/vc-assets/local/models/gta3.img/lodmiland179.dff", start: 89374222, end: 89384462 },
      { filename: "/vc-assets/local/models/gta3.img/lodmiland180.dff", start: 89384462, end: 89392654 },
      { filename: "/vc-assets/local/models/gta3.img/lodmiland_kb01_nt.dff", start: 89392654, end: 89398798 },
      { filename: "/vc-assets/local/models/gta3.img/lodmiland_kb02.dff", start: 89398798, end: 89402894 },
      { filename: "/vc-assets/local/models/gta3.img/lodmiland_kb03.dff", start: 89402894, end: 89406990 },
      { filename: "/vc-assets/local/models/gta3.img/lodmiland_kb04.dff", start: 89406990, end: 89411086 },
      { filename: "/vc-assets/local/models/gta3.img/lodmiland_kb10.dff", start: 89411086, end: 89423374 },
      { filename: "/vc-assets/local/models/gta3.img/lodmiland_kb10b.dff", start: 89423374, end: 89427470 },
      { filename: "/vc-assets/local/models/gta3.img/lodmiland_kb11.dff", start: 89427470, end: 89433614 },
      { filename: "/vc-assets/local/models/gta3.img/lodmiland_kb11b.dff", start: 89433614, end: 89437710 },
      { filename: "/vc-assets/local/models/gta3.img/lodmiland_kb12.dff", start: 89437710, end: 89443854 },
      { filename: "/vc-assets/local/models/gta3.img/lodmiland_kb12b.dff", start: 89443854, end: 89447950 },
      { filename: "/vc-assets/local/models/gta3.img/lodmiland_kb13.dff", start: 89447950, end: 89456142 },
      { filename: "/vc-assets/local/models/gta3.img/lodmiland_ws04.dff", start: 89456142, end: 89460238 },
      { filename: "/vc-assets/local/models/gta3.img/lodmiland_ws04b.dff", start: 89460238, end: 89464334 },
      { filename: "/vc-assets/local/models/gta3.img/lodmiodnroadxa.dff", start: 89464334, end: 89468430 },
      { filename: "/vc-assets/local/models/gta3.img/lodmrgbase1.dff", start: 89468430, end: 89476622 },
      { filename: "/vc-assets/local/models/gta3.img/lodmrgbuild1.dff", start: 89476622, end: 89484814 },
      { filename: "/vc-assets/local/models/gta3.img/lodmrgbuild2.dff", start: 89484814, end: 89490958 },
      { filename: "/vc-assets/local/models/gta3.img/lodmrgtrees4.dff", start: 89490958, end: 89505294 },
      { filename: "/vc-assets/local/models/gta3.img/lodnbbridge1.dff", start: 89505294, end: 89521678 },
      { filename: "/vc-assets/local/models/gta3.img/lodnbchw.txd", start: 89521678, end: 89611790 },
      { filename: "/vc-assets/local/models/gta3.img/lodnbeach.txd", start: 89611790, end: 89759246 },
      { filename: "/vc-assets/local/models/gta3.img/lodnbeach07.dff", start: 89759246, end: 89761294 },
      { filename: "/vc-assets/local/models/gta3.img/lodnbeach08.dff", start: 89761294, end: 89763342 },
      { filename: "/vc-assets/local/models/gta3.img/lodnbeachbtbig.txd", start: 89763342, end: 89832974 },
      { filename: "/vc-assets/local/models/gta3.img/lodnbeachwbig.txd", start: 89832974, end: 89873934 },
      { filename: "/vc-assets/local/models/gta3.img/lodnbwroad01.dff", start: 89873934, end: 89875982 },
      { filename: "/vc-assets/local/models/gta3.img/lodnbwroad02.dff", start: 89875982, end: 89880078 },
      { filename: "/vc-assets/local/models/gta3.img/lodnbwroad03.dff", start: 89880078, end: 89882126 },
      { filename: "/vc-assets/local/models/gta3.img/lodnbwroad04.dff", start: 89882126, end: 89884174 },
      { filename: "/vc-assets/local/models/gta3.img/lodnbwroad05.dff", start: 89884174, end: 89886222 },
      { filename: "/vc-assets/local/models/gta3.img/lodnbwroad06.dff", start: 89886222, end: 89888270 },
      { filename: "/vc-assets/local/models/gta3.img/lodnbwroad07.dff", start: 89888270, end: 89892366 },
      { filename: "/vc-assets/local/models/gta3.img/lodnbwroad08.dff", start: 89892366, end: 89904654 },
      { filename: "/vc-assets/local/models/gta3.img/lodnd04.dff", start: 89904654, end: 89906702 },
      { filename: "/vc-assets/local/models/gta3.img/lodnebasea0.dff", start: 89906702, end: 89910798 },
      { filename: "/vc-assets/local/models/gta3.img/lodnetopa0.dff", start: 89910798, end: 89914894 },
      { filename: "/vc-assets/local/models/gta3.img/lodnewscafe_nt.dff", start: 89914894, end: 89921038 },
      { filename: "/vc-assets/local/models/gta3.img/lodngst2mesh.dff", start: 89921038, end: 89923086 },
      { filename: "/vc-assets/local/models/gta3.img/lodnorthbridge1.dff", start: 89923086, end: 89929230 },
      { filename: "/vc-assets/local/models/gta3.img/lodnorthisland1.dff", start: 89929230, end: 89935374 },
      { filename: "/vc-assets/local/models/gta3.img/lodnorthisland2.dff", start: 89935374, end: 89943566 },
      { filename: "/vc-assets/local/models/gta3.img/lodnorthisland3.dff", start: 89943566, end: 89949710 },
      { filename: "/vc-assets/local/models/gta3.img/lodnorthstar.dff", start: 89949710, end: 89976334 },
      { filename: "/vc-assets/local/models/gta3.img/lodnrthroad01.dff", start: 89976334, end: 89978382 },
      { filename: "/vc-assets/local/models/gta3.img/lodnrthroad02.dff", start: 89978382, end: 89980430 },
      { filename: "/vc-assets/local/models/gta3.img/lodnrthroad03.dff", start: 89980430, end: 89982478 },
      { filename: "/vc-assets/local/models/gta3.img/lodnrthroad04.dff", start: 89982478, end: 89986574 },
      { filename: "/vc-assets/local/models/gta3.img/lodnrthroad05.dff", start: 89986574, end: 89988622 },
      { filename: "/vc-assets/local/models/gta3.img/lodnrthroad06.dff", start: 89988622, end: 89990670 },
      { filename: "/vc-assets/local/models/gta3.img/lodnrthroad07.dff", start: 89990670, end: 89992718 },
      { filename: "/vc-assets/local/models/gta3.img/lodnrthroad08.dff", start: 89992718, end: 89994766 },
      { filename: "/vc-assets/local/models/gta3.img/lodnrthroad09.dff", start: 89994766, end: 89996814 },
      { filename: "/vc-assets/local/models/gta3.img/lodnrthroad10.dff", start: 89996814, end: 89998862 },
      { filename: "/vc-assets/local/models/gta3.img/lodnrthroad11.dff", start: 89998862, end: 90000910 },
      { filename: "/vc-assets/local/models/gta3.img/lodnrthroad12.dff", start: 90000910, end: 90002958 },
      { filename: "/vc-assets/local/models/gta3.img/lodnrthroad13.dff", start: 90002958, end: 90005006 },
      { filename: "/vc-assets/local/models/gta3.img/lodnrthroad14.dff", start: 90005006, end: 90007054 },
      { filename: "/vc-assets/local/models/gta3.img/lodnrthroad15.dff", start: 90007054, end: 90009102 },
      { filename: "/vc-assets/local/models/gta3.img/lodnrthroad16.dff", start: 90009102, end: 90011150 },
      { filename: "/vc-assets/local/models/gta3.img/lodnrthroad17.dff", start: 90011150, end: 90013198 },
      { filename: "/vc-assets/local/models/gta3.img/lodnrthroad18.dff", start: 90013198, end: 90015246 },
      { filename: "/vc-assets/local/models/gta3.img/lodnrthroad19.dff", start: 90015246, end: 90017294 },
      { filename: "/vc-assets/local/models/gta3.img/lodnrthroad20.dff", start: 90017294, end: 90019342 },
      { filename: "/vc-assets/local/models/gta3.img/lodnrthroad21.dff", start: 90019342, end: 90021390 },
      { filename: "/vc-assets/local/models/gta3.img/lodnrthroad22.dff", start: 90021390, end: 90023438 },
      { filename: "/vc-assets/local/models/gta3.img/lodnrthroad23.dff", start: 90023438, end: 90025486 },
      { filename: "/vc-assets/local/models/gta3.img/lodnrthroad24.dff", start: 90025486, end: 90027534 },
      { filename: "/vc-assets/local/models/gta3.img/lodnrthroad25.dff", start: 90027534, end: 90029582 },
      { filename: "/vc-assets/local/models/gta3.img/lodnrthroad26.dff", start: 90029582, end: 90031630 },
      { filename: "/vc-assets/local/models/gta3.img/lodnrthroad27.dff", start: 90031630, end: 90033678 },
      { filename: "/vc-assets/local/models/gta3.img/lodnrthroad28.dff", start: 90033678, end: 90035726 },
      { filename: "/vc-assets/local/models/gta3.img/lodntoon03.dff", start: 90035726, end: 90048014 },
      { filename: "/vc-assets/local/models/gta3.img/lodntoon04.dff", start: 90048014, end: 90058254 },
      { filename: "/vc-assets/local/models/gta3.img/lodntoon13.dff", start: 90058254, end: 90068494 },
      { filename: "/vc-assets/local/models/gta3.img/lodntoon18.dff", start: 90068494, end: 90076686 },
      { filename: "/vc-assets/local/models/gta3.img/lodntoon20.dff", start: 90076686, end: 90084878 },
      { filename: "/vc-assets/local/models/gta3.img/lodntoon21.dff", start: 90084878, end: 90091022 },
      { filename: "/vc-assets/local/models/gta3.img/lodntoon22.dff", start: 90091022, end: 90111502 },
      { filename: "/vc-assets/local/models/gta3.img/lodntoon23.dff", start: 90111502, end: 90131982 },
      { filename: "/vc-assets/local/models/gta3.img/lodntoon32.dff", start: 90131982, end: 90144270 },
      { filename: "/vc-assets/local/models/gta3.img/lodntoon34.dff", start: 90144270, end: 90148366 },
      { filename: "/vc-assets/local/models/gta3.img/lodntoon39.dff", start: 90148366, end: 90168846 },
      { filename: "/vc-assets/local/models/gta3.img/lodntoon49.dff", start: 90168846, end: 90172942 },
      { filename: "/vc-assets/local/models/gta3.img/lodntoon53.dff", start: 90172942, end: 90191374 },
      { filename: "/vc-assets/local/models/gta3.img/lodntoon54.dff", start: 90191374, end: 90199566 },
      { filename: "/vc-assets/local/models/gta3.img/lodntoon55.dff", start: 90199566, end: 90217998 },
      { filename: "/vc-assets/local/models/gta3.img/lodntoon56.dff", start: 90217998, end: 90236430 },
      { filename: "/vc-assets/local/models/gta3.img/lodntoon65.dff", start: 90236430, end: 90238478 },
      { filename: "/vc-assets/local/models/gta3.img/lodntoon66.dff", start: 90238478, end: 90240526 },
      { filename: "/vc-assets/local/models/gta3.img/lodntoon70.dff", start: 90240526, end: 90244622 },
      { filename: "/vc-assets/local/models/gta3.img/lodntoon72.dff", start: 90244622, end: 90248718 },
      { filename: "/vc-assets/local/models/gta3.img/lodntoon72b.dff", start: 90248718, end: 90250766 },
      { filename: "/vc-assets/local/models/gta3.img/lodntoon73.dff", start: 90250766, end: 90252814 },
      { filename: "/vc-assets/local/models/gta3.img/lodntoon73b.dff", start: 90252814, end: 90254862 },
      { filename: "/vc-assets/local/models/gta3.img/lodntoon74.dff", start: 90254862, end: 90256910 },
      { filename: "/vc-assets/local/models/gta3.img/lodntoon_newbit.dff", start: 90256910, end: 90265102 },
      { filename: "/vc-assets/local/models/gta3.img/lodntoon_shops.dff", start: 90265102, end: 90273294 },
      { filename: "/vc-assets/local/models/gta3.img/lodntoon_top02.dff", start: 90273294, end: 90281486 },
      { filename: "/vc-assets/local/models/gta3.img/lodntoon_top04.dff", start: 90281486, end: 90283534 },
      { filename: "/vc-assets/local/models/gta3.img/lodntoon_top05.dff", start: 90283534, end: 90285582 },
      { filename: "/vc-assets/local/models/gta3.img/lodntoon_top07.dff", start: 90285582, end: 90289678 },
      { filename: "/vc-assets/local/models/gta3.img/lodntoon_top08.dff", start: 90289678, end: 90306062 },
      { filename: "/vc-assets/local/models/gta3.img/lodntoon_top10.dff", start: 90306062, end: 90318350 },
      { filename: "/vc-assets/local/models/gta3.img/lodo_buildkb09.dff", start: 90318350, end: 90320398 },
      { filename: "/vc-assets/local/models/gta3.img/lodo_buildkb25.dff", start: 90320398, end: 90324494 },
      { filename: "/vc-assets/local/models/gta3.img/lodo_buildkb29_nt.dff", start: 90324494, end: 90326542 },
      { filename: "/vc-assets/local/models/gta3.img/lodo_buildkb_nt.dff", start: 90326542, end: 90328590 },
      { filename: "/vc-assets/local/models/gta3.img/lodo_copgrnd.dff", start: 90328590, end: 90332686 },
      { filename: "/vc-assets/local/models/gta3.img/lodo_polbuild.dff", start: 90332686, end: 90347022 },
      { filename: "/vc-assets/local/models/gta3.img/lodo_polgrnda10.dff", start: 90347022, end: 90359310 },
      { filename: "/vc-assets/local/models/gta3.img/lodo_polgrnda12.dff", start: 90359310, end: 90373646 },
      { filename: "/vc-assets/local/models/gta3.img/lodo_polgrnda13.dff", start: 90373646, end: 90379790 },
      { filename: "/vc-assets/local/models/gta3.img/lodo_polgrnda14.dff", start: 90379790, end: 90387982 },
      { filename: "/vc-assets/local/models/gta3.img/lodo_polgrnda16.dff", start: 90387982, end: 90396174 },
      { filename: "/vc-assets/local/models/gta3.img/lodo_polgrnda17.dff", start: 90396174, end: 90404366 },
      { filename: "/vc-assets/local/models/gta3.img/lodo_polgrnda7.dff", start: 90404366, end: 90416654 },
      { filename: "/vc-assets/local/models/gta3.img/lodo_polgrnda8.dff", start: 90416654, end: 90422798 },
      { filename: "/vc-assets/local/models/gta3.img/lodo_polgrnda9.dff", start: 90422798, end: 90437134 },
      { filename: "/vc-assets/local/models/gta3.img/lodoada1.dff", start: 90437134, end: 90441230 },
      { filename: "/vc-assets/local/models/gta3.img/lodoadc1.dff", start: 90441230, end: 90443278 },
      { filename: "/vc-assets/local/models/gta3.img/lodoadc2.dff", start: 90443278, end: 90445326 },
      { filename: "/vc-assets/local/models/gta3.img/lodoadc3.dff", start: 90445326, end: 90447374 },
      { filename: "/vc-assets/local/models/gta3.img/lodoadc4.dff", start: 90447374, end: 90449422 },
      { filename: "/vc-assets/local/models/gta3.img/lodoastsky1.dff", start: 90449422, end: 90453518 },
      { filename: "/vc-assets/local/models/gta3.img/lodoastsky2.dff", start: 90453518, end: 90457614 },
      { filename: "/vc-assets/local/models/gta3.img/lodoceanrdn1_dy.dff", start: 90457614, end: 90459662 },
      { filename: "/vc-assets/local/models/gta3.img/lodoceanrdn1_nt.dff", start: 90459662, end: 90461710 },
      { filename: "/vc-assets/local/models/gta3.img/lododrive.txd", start: 90461710, end: 90572302 },
      { filename: "/vc-assets/local/models/gta3.img/lododriven.txd", start: 90572302, end: 90713614 },
      { filename: "/vc-assets/local/models/gta3.img/lodoshp010.dff", start: 90713614, end: 90729998 },
      { filename: "/vc-assets/local/models/gta3.img/lodotel01.dff", start: 90729998, end: 90740238 },
      { filename: "/vc-assets/local/models/gta3.img/lodotel02.dff", start: 90740238, end: 90748430 },
      { filename: "/vc-assets/local/models/gta3.img/lodotel03.dff", start: 90748430, end: 90770958 },
      { filename: "/vc-assets/local/models/gta3.img/lodowsand1.dff", start: 90770958, end: 90773006 },
      { filename: "/vc-assets/local/models/gta3.img/lodowsand2.dff", start: 90773006, end: 90775054 },
      { filename: "/vc-assets/local/models/gta3.img/lodpad_grdn_2.dff", start: 90775054, end: 90787342 },
      { filename: "/vc-assets/local/models/gta3.img/lodpaynspray.dff", start: 90787342, end: 90791438 },
      { filename: "/vc-assets/local/models/gta3.img/lodpedbridge3.dff", start: 90791438, end: 90797582 },
      { filename: "/vc-assets/local/models/gta3.img/lodpelican2_nt.dff", start: 90797582, end: 90801678 },
      { filename: "/vc-assets/local/models/gta3.img/lodpelican_dy.dff", start: 90801678, end: 90805774 },
      { filename: "/vc-assets/local/models/gta3.img/lodpelican_nt.dff", start: 90805774, end: 90809870 },
      { filename: "/vc-assets/local/models/gta3.img/lodphils.dff", start: 90809870, end: 90832398 },
      { filename: "/vc-assets/local/models/gta3.img/lodpital.dff", start: 90832398, end: 90840590 },
      { filename: "/vc-assets/local/models/gta3.img/lodpizzaplace.dff", start: 90840590, end: 90844686 },
      { filename: "/vc-assets/local/models/gta3.img/lodport_carpark0.dff", start: 90844686, end: 90846734 },
      { filename: "/vc-assets/local/models/gta3.img/lodprintworks.dff", start: 90846734, end: 90859022 },
      { filename: "/vc-assets/local/models/gta3.img/lodracecotop.dff", start: 90859022, end: 90877454 },
      { filename: "/vc-assets/local/models/gta3.img/lodracecotop2.dff", start: 90877454, end: 90887694 },
      { filename: "/vc-assets/local/models/gta3.img/lodrbits05.dff", start: 90887694, end: 90895886 },
      { filename: "/vc-assets/local/models/gta3.img/lodrbits06.dff", start: 90895886, end: 90899982 },
      { filename: "/vc-assets/local/models/gta3.img/lodrbits13.dff", start: 90899982, end: 90904078 },
      { filename: "/vc-assets/local/models/gta3.img/lodrbits13b.dff", start: 90904078, end: 90906126 },
      { filename: "/vc-assets/local/models/gta3.img/lodrbits13c.dff", start: 90906126, end: 90908174 },
      { filename: "/vc-assets/local/models/gta3.img/lodrbits17.dff", start: 90908174, end: 90912270 },
      { filename: "/vc-assets/local/models/gta3.img/lodrbits22.dff", start: 90912270, end: 90916366 },
      { filename: "/vc-assets/local/models/gta3.img/lodrbits24.dff", start: 90916366, end: 90920462 },
      { filename: "/vc-assets/local/models/gta3.img/lodrbits45.dff", start: 90920462, end: 90924558 },
      { filename: "/vc-assets/local/models/gta3.img/lodrbits46.dff", start: 90924558, end: 90930702 },
      { filename: "/vc-assets/local/models/gta3.img/lodrbits49.dff", start: 90930702, end: 90934798 },
      { filename: "/vc-assets/local/models/gta3.img/lodrbits50.dff", start: 90934798, end: 90938894 },
      { filename: "/vc-assets/local/models/gta3.img/lodrbits51.dff", start: 90938894, end: 90942990 },
      { filename: "/vc-assets/local/models/gta3.img/lodrbits52.dff", start: 90942990, end: 90949134 },
      { filename: "/vc-assets/local/models/gta3.img/lodrbits54.dff", start: 90949134, end: 90955278 },
      { filename: "/vc-assets/local/models/gta3.img/lodrbits55.dff", start: 90955278, end: 90959374 },
      { filename: "/vc-assets/local/models/gta3.img/lodrbits56.dff", start: 90959374, end: 90965518 },
      { filename: "/vc-assets/local/models/gta3.img/lodrbits57.dff", start: 90965518, end: 90969614 },
      { filename: "/vc-assets/local/models/gta3.img/lodrbits58.dff", start: 90969614, end: 90975758 },
      { filename: "/vc-assets/local/models/gta3.img/lodrbits59.dff", start: 90975758, end: 90981902 },
      { filename: "/vc-assets/local/models/gta3.img/lodrbl02b.dff", start: 90981902, end: 90983950 },
      { filename: "/vc-assets/local/models/gta3.img/lodrblocks02.dff", start: 90983950, end: 90994190 },
      { filename: "/vc-assets/local/models/gta3.img/lodrblocks03.dff", start: 90994190, end: 91002382 },
      { filename: "/vc-assets/local/models/gta3.img/lodrblocks04.dff", start: 91002382, end: 91018766 },
      { filename: "/vc-assets/local/models/gta3.img/lodrbridge2.dff", start: 91018766, end: 91043342 },
      { filename: "/vc-assets/local/models/gta3.img/lodrdepot.dff", start: 91043342, end: 91051534 },
      { filename: "/vc-assets/local/models/gta3.img/lodrentrance02.dff", start: 91051534, end: 91057678 },
      { filename: "/vc-assets/local/models/gta3.img/lodrentrance1.dff", start: 91057678, end: 91063822 },
      { filename: "/vc-assets/local/models/gta3.img/lodrhouse.dff", start: 91063822, end: 91069966 },
      { filename: "/vc-assets/local/models/gta3.img/lodrisland_road1.dff", start: 91069966, end: 91074062 },
      { filename: "/vc-assets/local/models/gta3.img/lodrisland_road2.dff", start: 91074062, end: 91078158 },
      { filename: "/vc-assets/local/models/gta3.img/lodrisland_road3.dff", start: 91078158, end: 91080206 },
      { filename: "/vc-assets/local/models/gta3.img/lodrisland_road4.dff", start: 91080206, end: 91084302 },
      { filename: "/vc-assets/local/models/gta3.img/lodrisland_road6.dff", start: 91084302, end: 91086350 },
      { filename: "/vc-assets/local/models/gta3.img/lodrland01.dff", start: 91086350, end: 91098638 },
      { filename: "/vc-assets/local/models/gta3.img/lodrland02.dff", start: 91098638, end: 91106830 },
      { filename: "/vc-assets/local/models/gta3.img/lodrland03.dff", start: 91106830, end: 91112974 },
      { filename: "/vc-assets/local/models/gta3.img/lodrland04.dff", start: 91112974, end: 91117070 },
      { filename: "/vc-assets/local/models/gta3.img/lodrland05.dff", start: 91117070, end: 91123214 },
      { filename: "/vc-assets/local/models/gta3.img/lodrland06.dff", start: 91123214, end: 91133454 },
      { filename: "/vc-assets/local/models/gta3.img/lodrland07.dff", start: 91133454, end: 91137550 },
      { filename: "/vc-assets/local/models/gta3.img/lodrland08.dff", start: 91137550, end: 91143694 },
      { filename: "/vc-assets/local/models/gta3.img/lodrland10.dff", start: 91143694, end: 91149838 },
      { filename: "/vc-assets/local/models/gta3.img/lodrlandnew9.dff", start: 91149838, end: 91160078 },
      { filename: "/vc-assets/local/models/gta3.img/lodrnda1.dff", start: 91160078, end: 91162126 },
      { filename: "/vc-assets/local/models/gta3.img/lodroad01_nt.dff", start: 91162126, end: 91166222 },
      { filename: "/vc-assets/local/models/gta3.img/lodroad03od.dff", start: 91166222, end: 91168270 },
      { filename: "/vc-assets/local/models/gta3.img/lodroad04od_nt.dff", start: 91168270, end: 91172366 },
      { filename: "/vc-assets/local/models/gta3.img/lodroad05od.dff", start: 91172366, end: 91176462 },
      { filename: "/vc-assets/local/models/gta3.img/lodroad08_nt.dff", start: 91176462, end: 91178510 },
      { filename: "/vc-assets/local/models/gta3.img/lodroadab.dff", start: 91178510, end: 91180558 },
      { filename: "/vc-assets/local/models/gta3.img/lodroadnew.dff", start: 91180558, end: 91184654 },
      { filename: "/vc-assets/local/models/gta3.img/lodroadsect1.dff", start: 91184654, end: 91190798 },
      { filename: "/vc-assets/local/models/gta3.img/lodroadsect2a.dff", start: 91190798, end: 91196942 },
      { filename: "/vc-assets/local/models/gta3.img/lodroadsect2b.dff", start: 91196942, end: 91203086 },
      { filename: "/vc-assets/local/models/gta3.img/lodroadsect3.dff", start: 91203086, end: 91219470 },
      { filename: "/vc-assets/local/models/gta3.img/lodroadsect4.dff", start: 91219470, end: 91239950 },
      { filename: "/vc-assets/local/models/gta3.img/lodroadsect5.dff", start: 91239950, end: 91250190 },
      { filename: "/vc-assets/local/models/gta3.img/lodroadsigns1_02.dff", start: 91250190, end: 91254286 },
      { filename: "/vc-assets/local/models/gta3.img/lodroadsigns1_03.dff", start: 91254286, end: 91258382 },
      { filename: "/vc-assets/local/models/gta3.img/lodroadx.dff", start: 91258382, end: 91262478 },
      { filename: "/vc-assets/local/models/gta3.img/lodrtrees1.dff", start: 91262478, end: 91276814 },
      { filename: "/vc-assets/local/models/gta3.img/lodrtrees2.dff", start: 91276814, end: 91287054 },
      { filename: "/vc-assets/local/models/gta3.img/lodrtrees3.dff", start: 91287054, end: 91301390 },
      { filename: "/vc-assets/local/models/gta3.img/lodrtrees4.dff", start: 91301390, end: 91315726 },
      { filename: "/vc-assets/local/models/gta3.img/lodrtrees5.dff", start: 91315726, end: 91328014 },
      { filename: "/vc-assets/local/models/gta3.img/lodrwaterfrnt05.dff", start: 91328014, end: 91334158 },
      { filename: "/vc-assets/local/models/gta3.img/lodrwaterfrnt06.dff", start: 91334158, end: 91336206 },
      { filename: "/vc-assets/local/models/gta3.img/lodrwaterfrnt06b.dff", start: 91336206, end: 91340302 },
      { filename: "/vc-assets/local/models/gta3.img/lodrwaterfrnt07.dff", start: 91340302, end: 91342350 },
      { filename: "/vc-assets/local/models/gta3.img/lodrwaterfrnt07b.dff", start: 91342350, end: 91344398 },
      { filename: "/vc-assets/local/models/gta3.img/lodrwaterfrnt08.dff", start: 91344398, end: 91348494 },
      { filename: "/vc-assets/local/models/gta3.img/lodrwaterfrnt09.dff", start: 91348494, end: 91352590 },
      { filename: "/vc-assets/local/models/gta3.img/lodrwaterfrnt09b.dff", start: 91352590, end: 91354638 },
      { filename: "/vc-assets/local/models/gta3.img/lodrwaterfrnt10.dff", start: 91354638, end: 91358734 },
      { filename: "/vc-assets/local/models/gta3.img/lodrwaterfrnt11.dff", start: 91358734, end: 91362830 },
      { filename: "/vc-assets/local/models/gta3.img/lodrwaterfrnt12.dff", start: 91362830, end: 91366926 },
      { filename: "/vc-assets/local/models/gta3.img/lodsbrgestart_r_dt.dff", start: 91366926, end: 91383310 },
      { filename: "/vc-assets/local/models/gta3.img/lodsbrgestart_r_nt.dff", start: 91383310, end: 91399694 },
      { filename: "/vc-assets/local/models/gta3.img/lodsbrgestartf_dt.dff", start: 91399694, end: 91411982 },
      { filename: "/vc-assets/local/models/gta3.img/lodsbrgestartf_nt.dff", start: 91411982, end: 91424270 },
      { filename: "/vc-assets/local/models/gta3.img/lodsbridge07_dt.dff", start: 91424270, end: 91432462 },
      { filename: "/vc-assets/local/models/gta3.img/lodsbridge07_nt.dff", start: 91432462, end: 91440654 },
      { filename: "/vc-assets/local/models/gta3.img/lodsbridge1_dt.dff", start: 91440654, end: 91448846 },
      { filename: "/vc-assets/local/models/gta3.img/lodsbridge1_nt.dff", start: 91448846, end: 91457038 },
      { filename: "/vc-assets/local/models/gta3.img/lodsbridge2_dt.dff", start: 91457038, end: 91469326 },
      { filename: "/vc-assets/local/models/gta3.img/lodsbridge2_nt.dff", start: 91469326, end: 91481614 },
      { filename: "/vc-assets/local/models/gta3.img/lodsbridge3_dt.dff", start: 91481614, end: 91489806 },
      { filename: "/vc-assets/local/models/gta3.img/lodsbridge3_nt.dff", start: 91489806, end: 91497998 },
      { filename: "/vc-assets/local/models/gta3.img/lodsbridge4_dt.dff", start: 91497998, end: 91508238 },
      { filename: "/vc-assets/local/models/gta3.img/lodsbridge4_nt.dff", start: 91508238, end: 91518478 },
      { filename: "/vc-assets/local/models/gta3.img/lodsbridge5_dt.dff", start: 91518478, end: 91532814 },
      { filename: "/vc-assets/local/models/gta3.img/lodsbridge5_nt.dff", start: 91532814, end: 91547150 },
      { filename: "/vc-assets/local/models/gta3.img/lodsbridge6_dt.dff", start: 91547150, end: 91555342 },
      { filename: "/vc-assets/local/models/gta3.img/lodsbridge6_nt.dff", start: 91555342, end: 91563534 },
      { filename: "/vc-assets/local/models/gta3.img/lodsbridge_dt.dff", start: 91563534, end: 91575822 },
      { filename: "/vc-assets/local/models/gta3.img/lodsbridge_nt.dff", start: 91575822, end: 91586062 },
      { filename: "/vc-assets/local/models/gta3.img/lodscarland226.dff", start: 91586062, end: 91588110 },
      { filename: "/vc-assets/local/models/gta3.img/lodse_ext.dff", start: 91588110, end: 91592206 },
      { filename: "/vc-assets/local/models/gta3.img/lodse_pier.dff", start: 91592206, end: 91600398 },
      { filename: "/vc-assets/local/models/gta3.img/lodse_pierfence.dff", start: 91600398, end: 91604494 },
      { filename: "/vc-assets/local/models/gta3.img/lodseaplaland1.dff", start: 91604494, end: 91606542 },
      { filename: "/vc-assets/local/models/gta3.img/lodseaplanehanger1.dff", start: 91606542, end: 91612686 },
      { filename: "/vc-assets/local/models/gta3.img/lodsection.dff", start: 91612686, end: 91618830 },
      { filename: "/vc-assets/local/models/gta3.img/lodsho_ext1.dff", start: 91618830, end: 91622926 },
      { filename: "/vc-assets/local/models/gta3.img/lodshopfronts01.dff", start: 91622926, end: 91633166 },
      { filename: "/vc-assets/local/models/gta3.img/lodshopfronts01b.dff", start: 91633166, end: 91645454 },
      { filename: "/vc-assets/local/models/gta3.img/lodshopfronts02.dff", start: 91645454, end: 91651598 },
      { filename: "/vc-assets/local/models/gta3.img/lodshopfronts02b.dff", start: 91651598, end: 91659790 },
      { filename: "/vc-assets/local/models/gta3.img/lodshpfrnts1grd.dff", start: 91659790, end: 91663886 },
      { filename: "/vc-assets/local/models/gta3.img/lodshpfrts1bgrd.dff", start: 91663886, end: 91665934 },
      { filename: "/vc-assets/local/models/gta3.img/lodsion1_a.dff", start: 91665934, end: 91674126 },
      { filename: "/vc-assets/local/models/gta3.img/lodsion1_base.dff", start: 91674126, end: 91686414 },
      { filename: "/vc-assets/local/models/gta3.img/lodsion1b.dff", start: 91686414, end: 91694606 },
      { filename: "/vc-assets/local/models/gta3.img/lodsion1gardens.dff", start: 91694606, end: 91715086 },
      { filename: "/vc-assets/local/models/gta3.img/lodsion2_a.dff", start: 91715086, end: 91721230 },
      { filename: "/vc-assets/local/models/gta3.img/lodsion2_b.dff", start: 91721230, end: 91727374 },
      { filename: "/vc-assets/local/models/gta3.img/lodsion2c.dff", start: 91727374, end: 91733518 },
      { filename: "/vc-assets/local/models/gta3.img/lodsion3_b.dff", start: 91733518, end: 91739662 },
      { filename: "/vc-assets/local/models/gta3.img/lodsion3_base.dff", start: 91739662, end: 91760142 },
      { filename: "/vc-assets/local/models/gta3.img/lodsion3_c.dff", start: 91760142, end: 91766286 },
      { filename: "/vc-assets/local/models/gta3.img/lodsion3a.dff", start: 91766286, end: 91778574 },
      { filename: "/vc-assets/local/models/gta3.img/lodsion3gardens.dff", start: 91778574, end: 91797006 },
      { filename: "/vc-assets/local/models/gta3.img/lodsjmcrush.dff", start: 91797006, end: 91807246 },
      { filename: "/vc-assets/local/models/gta3.img/lodsmahangar2_01.dff", start: 91807246, end: 91811342 },
      { filename: "/vc-assets/local/models/gta3.img/lodsmahangar2_02.dff", start: 91811342, end: 91815438 },
      { filename: "/vc-assets/local/models/gta3.img/lodsmahangar2_03.dff", start: 91815438, end: 91819534 },
      { filename: "/vc-assets/local/models/gta3.img/lodsmahangar2_04.dff", start: 91819534, end: 91823630 },
      { filename: "/vc-assets/local/models/gta3.img/lodsmahangar2_05.dff", start: 91823630, end: 91827726 },
      { filename: "/vc-assets/local/models/gta3.img/lodsmahangar2_06.dff", start: 91827726, end: 91831822 },
      { filename: "/vc-assets/local/models/gta3.img/lodsmallhangars1_01.dff", start: 91831822, end: 91837966 },
      { filename: "/vc-assets/local/models/gta3.img/lodsmallhangars1_02.dff", start: 91837966, end: 91842062 },
      { filename: "/vc-assets/local/models/gta3.img/lodsmallhangars1_03.dff", start: 91842062, end: 91846158 },
      { filename: "/vc-assets/local/models/gta3.img/lodsmallisland1_01.dff", start: 91846158, end: 91848206 },
      { filename: "/vc-assets/local/models/gta3.img/lodsmallislebridge1.dff", start: 91848206, end: 91852302 },
      { filename: "/vc-assets/local/models/gta3.img/lodsmallradar1.dff", start: 91852302, end: 91858446 },
      { filename: "/vc-assets/local/models/gta3.img/lodsmallradar1_02.dff", start: 91858446, end: 91864590 },
      { filename: "/vc-assets/local/models/gta3.img/lodst_woodfence30.dff", start: 91864590, end: 91866638 },
      { filename: "/vc-assets/local/models/gta3.img/lodstadiumland_a.dff", start: 91866638, end: 91878926 },
      { filename: "/vc-assets/local/models/gta3.img/lodstadiumland_b.dff", start: 91878926, end: 91893262 },
      { filename: "/vc-assets/local/models/gta3.img/lodstadiumland_c.dff", start: 91893262, end: 91901454 },
      { filename: "/vc-assets/local/models/gta3.img/lodstadiumland_d.dff", start: 91901454, end: 91907598 },
      { filename: "/vc-assets/local/models/gta3.img/lodsthroad01.dff", start: 91907598, end: 91909646 },
      { filename: "/vc-assets/local/models/gta3.img/lodsthroad02.dff", start: 91909646, end: 91911694 },
      { filename: "/vc-assets/local/models/gta3.img/lodsthroad03.dff", start: 91911694, end: 91913742 },
      { filename: "/vc-assets/local/models/gta3.img/lodsthroad04.dff", start: 91913742, end: 91915790 },
      { filename: "/vc-assets/local/models/gta3.img/lodsthroad05.dff", start: 91915790, end: 91917838 },
      { filename: "/vc-assets/local/models/gta3.img/lodsthroad06.dff", start: 91917838, end: 91919886 },
      { filename: "/vc-assets/local/models/gta3.img/lodsthroad07.dff", start: 91919886, end: 91921934 },
      { filename: "/vc-assets/local/models/gta3.img/lodsthroad08.dff", start: 91921934, end: 91923982 },
      { filename: "/vc-assets/local/models/gta3.img/lodsthroad09.dff", start: 91923982, end: 91926030 },
      { filename: "/vc-assets/local/models/gta3.img/lodsthroad10.dff", start: 91926030, end: 91928078 },
      { filename: "/vc-assets/local/models/gta3.img/lodsthroad11.dff", start: 91928078, end: 91930126 },
      { filename: "/vc-assets/local/models/gta3.img/lodsthroad12.dff", start: 91930126, end: 91932174 },
      { filename: "/vc-assets/local/models/gta3.img/lodsthroad13.dff", start: 91932174, end: 91934222 },
      { filename: "/vc-assets/local/models/gta3.img/lodsthroad14.dff", start: 91934222, end: 91936270 },
      { filename: "/vc-assets/local/models/gta3.img/lodsthroad15.dff", start: 91936270, end: 91938318 },
      { filename: "/vc-assets/local/models/gta3.img/lodsthroad16.dff", start: 91938318, end: 91940366 },
      { filename: "/vc-assets/local/models/gta3.img/lodsthroad17.dff", start: 91940366, end: 91942414 },
      { filename: "/vc-assets/local/models/gta3.img/lodsthroad18.dff", start: 91942414, end: 91944462 },
      { filename: "/vc-assets/local/models/gta3.img/lodsthroad19.dff", start: 91944462, end: 91946510 },
      { filename: "/vc-assets/local/models/gta3.img/lodsthroad20.dff", start: 91946510, end: 91948558 },
      { filename: "/vc-assets/local/models/gta3.img/lodsthroad21.dff", start: 91948558, end: 91950606 },
      { filename: "/vc-assets/local/models/gta3.img/lodsthroad22.dff", start: 91950606, end: 91952654 },
      { filename: "/vc-assets/local/models/gta3.img/lodsthroad23.dff", start: 91952654, end: 91954702 },
      { filename: "/vc-assets/local/models/gta3.img/lodsthroad24.dff", start: 91954702, end: 91956750 },
      { filename: "/vc-assets/local/models/gta3.img/lodtaxifirm02.dff", start: 91956750, end: 91960846 },
      { filename: "/vc-assets/local/models/gta3.img/lodtbuildws14.dff", start: 91960846, end: 91966990 },
      { filename: "/vc-assets/local/models/gta3.img/lodtermaintfloor1.dff", start: 91966990, end: 91977230 },
      { filename: "/vc-assets/local/models/gta3.img/lodtermina_01.dff", start: 91977230, end: 91989518 },
      { filename: "/vc-assets/local/models/gta3.img/lodterminalb1.dff", start: 91989518, end: 91999758 },
      { filename: "/vc-assets/local/models/gta3.img/lodti1rd.dff", start: 91999758, end: 92007950 },
      { filename: "/vc-assets/local/models/gta3.img/lodtibuilds.dff", start: 92007950, end: 92016142 },
      { filename: "/vc-assets/local/models/gta3.img/lodticent.dff", start: 92016142, end: 92020238 },
      { filename: "/vc-assets/local/models/gta3.img/lodtides3_nt.dff", start: 92020238, end: 92028430 },
      { filename: "/vc-assets/local/models/gta3.img/lodtihut1.dff", start: 92028430, end: 92048910 },
      { filename: "/vc-assets/local/models/gta3.img/lodtihut2.dff", start: 92048910, end: 92067342 },
      { filename: "/vc-assets/local/models/gta3.img/lodtihut3.dff", start: 92067342, end: 92079630 },
      { filename: "/vc-assets/local/models/gta3.img/lodtimall.dff", start: 92079630, end: 92087822 },
      { filename: "/vc-assets/local/models/gta3.img/lodtiroadbuild.dff", start: 92087822, end: 92104206 },
      { filename: "/vc-assets/local/models/gta3.img/lodtiskyg.dff", start: 92104206, end: 92110350 },
      { filename: "/vc-assets/local/models/gta3.img/lodtiskyt.dff", start: 92110350, end: 92116494 },
      { filename: "/vc-assets/local/models/gta3.img/lodtistation.dff", start: 92116494, end: 92120590 },
      { filename: "/vc-assets/local/models/gta3.img/lodtistation01.dff", start: 92120590, end: 92124686 },
      { filename: "/vc-assets/local/models/gta3.img/lodtleha_hardware.dff", start: 92124686, end: 92128782 },
      { filename: "/vc-assets/local/models/gta3.img/lodtleha_police.dff", start: 92128782, end: 92136974 },
      { filename: "/vc-assets/local/models/gta3.img/lodtlehabroad.dff", start: 92136974, end: 92141070 },
      { filename: "/vc-assets/local/models/gta3.img/lodtlehacoast02.dff", start: 92141070, end: 92147214 },
      { filename: "/vc-assets/local/models/gta3.img/lodtlehacoast05.dff", start: 92147214, end: 92151310 },
      { filename: "/vc-assets/local/models/gta3.img/lodtlharoadgg2.dff", start: 92151310, end: 92155406 },
      { filename: "/vc-assets/local/models/gta3.img/lodtower.dff", start: 92155406, end: 92161550 },
      { filename: "/vc-assets/local/models/gta3.img/lodtower_01.dff", start: 92161550, end: 92169742 },
      { filename: "/vc-assets/local/models/gta3.img/lodtower_02.dff", start: 92169742, end: 92177934 },
      { filename: "/vc-assets/local/models/gta3.img/lodtower_03.dff", start: 92177934, end: 92186126 },
      { filename: "/vc-assets/local/models/gta3.img/lodtranspol1.dff", start: 92186126, end: 92190222 },
      { filename: "/vc-assets/local/models/gta3.img/lodtroada.dff", start: 92190222, end: 92192270 },
      { filename: "/vc-assets/local/models/gta3.img/lodtroadb.dff", start: 92192270, end: 92194318 },
      { filename: "/vc-assets/local/models/gta3.img/lodtship_structure0.dff", start: 92194318, end: 92216846 },
      { filename: "/vc-assets/local/models/gta3.img/loduild034.dff", start: 92216846, end: 92222990 },
      { filename: "/vc-assets/local/models/gta3.img/loduild1b.dff", start: 92222990, end: 92227086 },
      { filename: "/vc-assets/local/models/gta3.img/loduilding01.dff", start: 92227086, end: 92231182 },
      { filename: "/vc-assets/local/models/gta3.img/loduilding05.dff", start: 92231182, end: 92239374 },
      { filename: "/vc-assets/local/models/gta3.img/lodvroad1.dff", start: 92239374, end: 92241422 },
      { filename: "/vc-assets/local/models/gta3.img/lodvroad2.dff", start: 92241422, end: 92243470 },
      { filename: "/vc-assets/local/models/gta3.img/lodwalkway2.dff", start: 92243470, end: 92247566 },
      { filename: "/vc-assets/local/models/gta3.img/lodwall.dff", start: 92247566, end: 92251662 },
      { filename: "/vc-assets/local/models/gta3.img/lodwall2.dff", start: 92251662, end: 92253710 },
      { filename: "/vc-assets/local/models/gta3.img/lodwall3.dff", start: 92253710, end: 92255758 },
      { filename: "/vc-assets/local/models/gta3.img/lodwaretank.dff", start: 92255758, end: 92259854 },
      { filename: "/vc-assets/local/models/gta3.img/lodwashnbrdge.txd", start: 92259854, end: 92265998 },
      { filename: "/vc-assets/local/models/gta3.img/lodwashpaynspray.dff", start: 92265998, end: 92272142 },
      { filename: "/vc-assets/local/models/gta3.img/lodwashsth.txd", start: 92272142, end: 92366350 },
      { filename: "/vc-assets/local/models/gta3.img/lodwoodbridge1.dff", start: 92366350, end: 92370446 },
      { filename: "/vc-assets/local/models/gta3.img/lodworksramps.dff", start: 92370446, end: 92376590 },
      { filename: "/vc-assets/local/models/gta3.img/lodwshsth99.txd", start: 92376590, end: 92595726 },
      { filename: "/vc-assets/local/models/gta3.img/lodwsouth08.txd", start: 92595726, end: 92835342 },
      { filename: "/vc-assets/local/models/gta3.img/lodxrefhirise1.dff", start: 92835342, end: 92841486 },
      { filename: "/vc-assets/local/models/gta3.img/lodxrefhot.txd", start: 92841486, end: 92874254 },
      { filename: "/vc-assets/local/models/gta3.img/lodxrefhse1.dff", start: 92874254, end: 92878350 },
      { filename: "/vc-assets/local/models/gta3.img/lodxrefhse2.dff", start: 92878350, end: 92882446 },
      { filename: "/vc-assets/local/models/gta3.img/luggage.txd", start: 92882446, end: 92986894 },
      { filename: "/vc-assets/local/models/gta3.img/male01.dff", start: 92986894, end: 93058574 },
      { filename: "/vc-assets/local/models/gta3.img/male01.txd", start: 93058574, end: 93081102 },
      { filename: "/vc-assets/local/models/gta3.img/mall.col", start: 93081102, end: 93283854 },
      { filename: "/vc-assets/local/models/gta3.img/mallroof.txd", start: 93283854, end: 93285902 },
      { filename: "/vc-assets/local/models/gta3.img/manana.dff", start: 93285902, end: 93439502 },
      { filename: "/vc-assets/local/models/gta3.img/manana.txd", start: 93439502, end: 93484558 },
      { filename: "/vc-assets/local/models/gta3.img/mansion.col", start: 93484558, end: 93638158 },
      { filename: "/vc-assets/local/models/gta3.img/marquis.dff", start: 93638158, end: 93771278 },
      { filename: "/vc-assets/local/models/gta3.img/marquis.txd", start: 93771278, end: 93806094 },
      { filename: "/vc-assets/local/models/gta3.img/mbtbemp.dff", start: 93806094, end: 93826574 },
      { filename: "/vc-assets/local/models/gta3.img/mbtbemp.txd", start: 93826574, end: 93974030 },
      { filename: "/vc-assets/local/models/gta3.img/mc_ground3.dff", start: 93974030, end: 93984270 },
      { filename: "/vc-assets/local/models/gta3.img/mc_ground4.dff", start: 93984270, end: 93994510 },
      { filename: "/vc-assets/local/models/gta3.img/mc_ground5.dff", start: 93994510, end: 94002702 },
      { filename: "/vc-assets/local/models/gta3.img/mc_overlights1.dff", start: 94002702, end: 94008846 },
      { filename: "/vc-assets/local/models/gta3.img/mc_overlights2.dff", start: 94008846, end: 94021134 },
      { filename: "/vc-assets/local/models/gta3.img/mc_wall2.dff", start: 94021134, end: 94031374 },
      { filename: "/vc-assets/local/models/gta3.img/mc_wall3.dff", start: 94031374, end: 94043662 },
      { filename: "/vc-assets/local/models/gta3.img/mcompounda1.txd", start: 94043662, end: 94459406 },
      { filename: "/vc-assets/local/models/gta3.img/merced.dff", start: 94459406, end: 94737934 },
      { filename: "/vc-assets/local/models/gta3.img/merced.txd", start: 94737934, end: 94821902 },
      { filename: "/vc-assets/local/models/gta3.img/mesa.dff", start: 94821902, end: 95002126 },
      { filename: "/vc-assets/local/models/gta3.img/mesa.txd", start: 95002126, end: 95045134 },
      { filename: "/vc-assets/local/models/gta3.img/metal.txd", start: 95045134, end: 95065614 },
      { filename: "/vc-assets/local/models/gta3.img/miamiland_kb02.dff", start: 95065614, end: 95086094 },
      { filename: "/vc-assets/local/models/gta3.img/miamiland_kb03.dff", start: 95086094, end: 95090190 },
      { filename: "/vc-assets/local/models/gta3.img/miamiland_kb04.dff", start: 95090190, end: 95106574 },
      { filename: "/vc-assets/local/models/gta3.img/miamiland_kb11.dff", start: 95106574, end: 95125006 },
      { filename: "/vc-assets/local/models/gta3.img/miamiland_kb11b.dff", start: 95125006, end: 95133198 },
      { filename: "/vc-assets/local/models/gta3.img/miamiland_ws04.dff", start: 95133198, end: 95151630 },
      { filename: "/vc-assets/local/models/gta3.img/miamiland_ws04b.dff", start: 95151630, end: 95157774 },
      { filename: "/vc-assets/local/models/gta3.img/missile.dff", start: 95157774, end: 95163918 },
      { filename: "/vc-assets/local/models/gta3.img/missile.txd", start: 95163918, end: 95168014 },
      { filename: "/vc-assets/local/models/gta3.img/mitraffic.txd", start: 95168014, end: 95174158 },
      { filename: "/vc-assets/local/models/gta3.img/mob_detailsb.dff", start: 95174158, end: 95270414 },
      { filename: "/vc-assets/local/models/gta3.img/mob_door2.dff", start: 95270414, end: 95274510 },
      { filename: "/vc-assets/local/models/gta3.img/mob_door3.dff", start: 95274510, end: 95278606 },
      { filename: "/vc-assets/local/models/gta3.img/mob_mobroom2.dff", start: 95278606, end: 95438350 },
      { filename: "/vc-assets/local/models/gta3.img/money.dff", start: 95438350, end: 95440398 },
      { filename: "/vc-assets/local/models/gta3.img/moonbeam.dff", start: 95440398, end: 95618574 },
      { filename: "/vc-assets/local/models/gta3.img/moonbeam.txd", start: 95618574, end: 95663630 },
      { filename: "/vc-assets/local/models/gta3.img/mtraffic1.dff", start: 95663630, end: 95698446 },
      { filename: "/vc-assets/local/models/gta3.img/mule.dff", start: 95698446, end: 95852046 },
      { filename: "/vc-assets/local/models/gta3.img/mule.txd", start: 95852046, end: 95964686 },
      { filename: "/vc-assets/local/models/gta3.img/nairport.txd", start: 95964686, end: 96263694 },
      { filename: "/vc-assets/local/models/gta3.img/nbeach.col", start: 96263694, end: 96622094 },
      { filename: "/vc-assets/local/models/gta3.img/nbeach_lod.txd", start: 96622094, end: 96740878 },
      { filename: "/vc-assets/local/models/gta3.img/nbeachbt.col", start: 96740878, end: 97236494 },
      { filename: "/vc-assets/local/models/gta3.img/nbeachw.col", start: 97236494, end: 97498638 },
      { filename: "/vc-assets/local/models/gta3.img/nbw_grssypatch.txd", start: 97498638, end: 97502734 },
      { filename: "/vc-assets/local/models/gta3.img/new_bushtest.dff", start: 97502734, end: 97506830 },
      { filename: "/vc-assets/local/models/gta3.img/new_bushtest42.dff", start: 97506830, end: 97512974 },
      { filename: "/vc-assets/local/models/gta3.img/newashbuild1.txd", start: 97512974, end: 97947150 },
      { filename: "/vc-assets/local/models/gta3.img/nitestick.dff", start: 97947150, end: 97951246 },
      { filename: "/vc-assets/local/models/gta3.img/nitestick.txd", start: 97951246, end: 97957390 },
      { filename: "/vc-assets/local/models/gta3.img/noparkingsign1.dff", start: 97957390, end: 97961486 },
      { filename: "/vc-assets/local/models/gta3.img/northbuild.txd", start: 97961486, end: 98731534 },
      { filename: "/vc-assets/local/models/gta3.img/nrth1veg21.dff", start: 98731534, end: 98741774 },
      { filename: "/vc-assets/local/models/gta3.img/nrth1veg42.dff", start: 98741774, end: 98774542 },
      { filename: "/vc-assets/local/models/gta3.img/nrth3veg05.dff", start: 98774542, end: 98792974 },
      { filename: "/vc-assets/local/models/gta3.img/nrth3veg08.dff", start: 98792974, end: 98811406 },
      { filename: "/vc-assets/local/models/gta3.img/nrth3veg16.dff", start: 98811406, end: 98833934 },
      { filename: "/vc-assets/local/models/gta3.img/nrth3veg25.dff", start: 98833934, end: 98868750 },
      { filename: "/vc-assets/local/models/gta3.img/nrth3veg50.dff", start: 98868750, end: 98885134 },
      { filename: "/vc-assets/local/models/gta3.img/nrth3veg59.dff", start: 98885134, end: 98907662 },
      { filename: "/vc-assets/local/models/gta3.img/nrth4veg05.dff", start: 98907662, end: 98926094 },
      { filename: "/vc-assets/local/models/gta3.img/nrth4veg21.dff", start: 98926094, end: 98938382 },
      { filename: "/vc-assets/local/models/gta3.img/nrth4veg212.dff", start: 98938382, end: 98950670 },
      { filename: "/vc-assets/local/models/gta3.img/nrth7veg.dff", start: 98950670, end: 98979342 },
      { filename: "/vc-assets/local/models/gta3.img/nt_aircon1_01.dff", start: 98979342, end: 98985486 },
      { filename: "/vc-assets/local/models/gta3.img/nt_aircon1dbl.dff", start: 98985486, end: 98995726 },
      { filename: "/vc-assets/local/models/gta3.img/nt_aircon3_01.dff", start: 98995726, end: 98997774 },
      { filename: "/vc-assets/local/models/gta3.img/nt_bed1_01.dff", start: 98997774, end: 99059214 },
      { filename: "/vc-assets/local/models/gta3.img/nt_couch_1.dff", start: 99059214, end: 99073550 },
      { filename: "/vc-assets/local/models/gta3.img/nt_wassily1_02.dff", start: 99073550, end: 99173902 },
      { filename: "/vc-assets/local/models/gta3.img/oceandn.col", start: 99173902, end: 99464718 },
      { filename: "/vc-assets/local/models/gta3.img/oceandrv.col", start: 99464718, end: 99642894 },
      { filename: "/vc-assets/local/models/gta3.img/oceanic.dff", start: 99642894, end: 99804686 },
      { filename: "/vc-assets/local/models/gta3.img/oceanic.txd", start: 99804686, end: 99855886 },
      { filename: "/vc-assets/local/models/gta3.img/oceanrda03_dy.dff", start: 99855886, end: 99874318 },
      { filename: "/vc-assets/local/models/gta3.img/oceanrda03_nt.dff", start: 99874318, end: 99894798 },
      { filename: "/vc-assets/local/models/gta3.img/oceanrda04_dy.dff", start: 99894798, end: 99902990 },
      { filename: "/vc-assets/local/models/gta3.img/oceanrda04_nt.dff", start: 99902990, end: 99913230 },
      { filename: "/vc-assets/local/models/gta3.img/oceanrda05_nt.dff", start: 99913230, end: 99931662 },
      { filename: "/vc-assets/local/models/gta3.img/oceanrda06_nt.dff", start: 99931662, end: 99943950 },
      { filename: "/vc-assets/local/models/gta3.img/ocmiamistrip8.txd", start: 99943950, end: 100298254 },
      { filename: "/vc-assets/local/models/gta3.img/ocmiamistrip9.txd", start: 100298254, end: 101025294 },
      { filename: "/vc-assets/local/models/gta3.img/od_alleys3_01_dy.dff", start: 101025294, end: 101033486 },
      { filename: "/vc-assets/local/models/gta3.img/od_alleys3_01_nt.dff", start: 101033486, end: 101041678 },
      { filename: "/vc-assets/local/models/gta3.img/od_alleys3b_01_dy.dff", start: 101041678, end: 101051918 },
      { filename: "/vc-assets/local/models/gta3.img/od_alleys3b_01_nt.dff", start: 101051918, end: 101062158 },
      { filename: "/vc-assets/local/models/gta3.img/od_buildkb23_dy.dff", start: 101062158, end: 101074446 },
      { filename: "/vc-assets/local/models/gta3.img/od_buildkb23_nt.dff", start: 101074446, end: 101086734 },
      { filename: "/vc-assets/local/models/gta3.img/od_buildkb27_dy.dff", start: 101086734, end: 101131790 },
      { filename: "/vc-assets/local/models/gta3.img/od_buildkb27_nt.dff", start: 101131790, end: 101176846 },
      { filename: "/vc-assets/local/models/gta3.img/od_buildkb2_dy.dff", start: 101176846, end: 101219854 },
      { filename: "/vc-assets/local/models/gta3.img/od_buildkb2_nt.dff", start: 101219854, end: 101260814 },
      { filename: "/vc-assets/local/models/gta3.img/od_dirtshad4.dff", start: 101260814, end: 101273102 },
      { filename: "/vc-assets/local/models/gta3.img/od_hotels1.txd", start: 101273102, end: 101690894 },
      { filename: "/vc-assets/local/models/gta3.img/od_lightbeam.dff", start: 101690894, end: 101692942 },
      { filename: "/vc-assets/local/models/gta3.img/od_majestic2c_dy.dff", start: 101692942, end: 101740046 },
      { filename: "/vc-assets/local/models/gta3.img/od_majestic2c_nt.dff", start: 101740046, end: 101789198 },
      { filename: "/vc-assets/local/models/gta3.img/od_neona1.dff", start: 101789198, end: 101791246 },
      { filename: "/vc-assets/local/models/gta3.img/od_neonn.dff", start: 101791246, end: 101795342 },
      { filename: "/vc-assets/local/models/gta3.img/od_neons1.txd", start: 101795342, end: 101867022 },
      { filename: "/vc-assets/local/models/gta3.img/od_neons3b_nt.dff", start: 101867022, end: 101869070 },
      { filename: "/vc-assets/local/models/gta3.img/od_neonx1.dff", start: 101869070, end: 101873166 },
      { filename: "/vc-assets/local/models/gta3.img/odalleygb_dy.dff", start: 101873166, end: 101883406 },
      { filename: "/vc-assets/local/models/gta3.img/odalleygb_nt.dff", start: 101883406, end: 101893646 },
      { filename: "/vc-assets/local/models/gta3.img/odalleyground_dy.dff", start: 101893646, end: 101901838 },
      { filename: "/vc-assets/local/models/gta3.img/odalleyground_nt.dff", start: 101901838, end: 101910030 },
      { filename: "/vc-assets/local/models/gta3.img/oddoorway2.dff", start: 101910030, end: 101916174 },
      { filename: "/vc-assets/local/models/gta3.img/odhighsandgrs1.dff", start: 101916174, end: 101936654 },
      { filename: "/vc-assets/local/models/gta3.img/odlowsand1.dff", start: 101936654, end: 101938702 },
      { filename: "/vc-assets/local/models/gta3.img/odlowsand2.dff", start: 101938702, end: 101940750 },
      { filename: "/vc-assets/local/models/gta3.img/odneontest.dff", start: 101940750, end: 101942798 },
      { filename: "/vc-assets/local/models/gta3.img/odneontest.txd", start: 101942798, end: 102084110 },
      { filename: "/vc-assets/local/models/gta3.img/odnhotelspr.txd", start: 102084110, end: 102665742 },
      { filename: "/vc-assets/local/models/gta3.img/odnroad04od_nt.dff", start: 102665742, end: 102686222 },
      { filename: "/vc-assets/local/models/gta3.img/odnroad05od.dff", start: 102686222, end: 102694414 },
      { filename: "/vc-assets/local/models/gta3.img/odnroad08_dy.dff", start: 102694414, end: 102704654 },
      { filename: "/vc-assets/local/models/gta3.img/odnroad08_nt.dff", start: 102704654, end: 102716942 },
      { filename: "/vc-assets/local/models/gta3.img/package1.dff", start: 102716942, end: 102723086 },
      { filename: "/vc-assets/local/models/gta3.img/package1.txd", start: 102723086, end: 102727182 },
      { filename: "/vc-assets/local/models/gta3.img/packer.dff", start: 102727182, end: 102895118 },
      { filename: "/vc-assets/local/models/gta3.img/packer.txd", start: 102895118, end: 102946318 },
      { filename: "/vc-assets/local/models/gta3.img/pcj600.dff", start: 102946318, end: 103038478 },
      { filename: "/vc-assets/local/models/gta3.img/pcj600.txd", start: 103038478, end: 103069198 },
      { filename: "/vc-assets/local/models/gta3.img/peren.dff", start: 103069198, end: 103245326 },
      { filename: "/vc-assets/local/models/gta3.img/peren.txd", start: 103245326, end: 103290382 },
      { filename: "/vc-assets/local/models/gta3.img/pheonix.dff", start: 103290382, end: 103443982 },
      { filename: "/vc-assets/local/models/gta3.img/pheonix.txd", start: 103443982, end: 103489038 },
      { filename: "/vc-assets/local/models/gta3.img/plants01.dff", start: 103489038, end: 103503374 },
      { filename: "/vc-assets/local/models/gta3.img/player.dff", start: 103503374, end: 103591438 },
      { filename: "/vc-assets/local/models/gta3.img/player.txd", start: 103591438, end: 103636494 },
      { filename: "/vc-assets/local/models/gta3.img/playidles.ifp", start: 103636494, end: 103722510 },
      { filename: "/vc-assets/local/models/gta3.img/police.dff", start: 103722510, end: 103898638 },
      { filename: "/vc-assets/local/models/gta3.img/police.txd", start: 103898638, end: 103978510 },
      { filename: "/vc-assets/local/models/gta3.img/pony.dff", start: 103978510, end: 104148494 },
      { filename: "/vc-assets/local/models/gta3.img/pony.txd", start: 104148494, end: 104193550 },
      { filename: "/vc-assets/local/models/gta3.img/property_fsale.dff", start: 104193550, end: 104199694 },
      { filename: "/vc-assets/local/models/gta3.img/property_locked.dff", start: 104199694, end: 104205838 },
      { filename: "/vc-assets/local/models/gta3.img/radar32.txd", start: 104205838, end: 104216078 },
      { filename: "/vc-assets/local/models/gta3.img/radar33.txd", start: 104216078, end: 104226318 },
      { filename: "/vc-assets/local/models/gta3.img/radar35.txd", start: 104226318, end: 104236558 },
      { filename: "/vc-assets/local/models/gta3.img/radar36.txd", start: 104236558, end: 104246798 },
      { filename: "/vc-assets/local/models/gta3.img/radar37.txd", start: 104246798, end: 104257038 },
      { filename: "/vc-assets/local/models/gta3.img/radar40.txd", start: 104257038, end: 104267278 },
      { filename: "/vc-assets/local/models/gta3.img/radar41.txd", start: 104267278, end: 104277518 },
      { filename: "/vc-assets/local/models/gta3.img/radar43.txd", start: 104277518, end: 104287758 },
      { filename: "/vc-assets/local/models/gta3.img/radar44.txd", start: 104287758, end: 104297998 },
      { filename: "/vc-assets/local/models/gta3.img/radar45.txd", start: 104297998, end: 104308238 },
      { filename: "/vc-assets/local/models/gta3.img/radar48.txd", start: 104308238, end: 104318478 },
      { filename: "/vc-assets/local/models/gta3.img/radar49.txd", start: 104318478, end: 104328718 },
      { filename: "/vc-assets/local/models/gta3.img/radar50.txd", start: 104328718, end: 104338958 },
      { filename: "/vc-assets/local/models/gta3.img/radar51.txd", start: 104338958, end: 104349198 },
      { filename: "/vc-assets/local/models/gta3.img/radar52.txd", start: 104349198, end: 104359438 },
      { filename: "/vc-assets/local/models/gta3.img/radar53.txd", start: 104359438, end: 104369678 },
      { filename: "/vc-assets/local/models/gta3.img/radar56.txd", start: 104369678, end: 104379918 },
      { filename: "/vc-assets/local/models/gta3.img/radar57.txd", start: 104379918, end: 104390158 },
      { filename: "/vc-assets/local/models/gta3.img/radar58.txd", start: 104390158, end: 104400398 },
      { filename: "/vc-assets/local/models/gta3.img/radar59.txd", start: 104400398, end: 104410638 },
      { filename: "/vc-assets/local/models/gta3.img/rancher.dff", start: 104410638, end: 104580622 },
      { filename: "/vc-assets/local/models/gta3.img/rancher.txd", start: 104580622, end: 104625678 },
      { filename: "/vc-assets/local/models/gta3.img/reefer.dff", start: 104625678, end: 104736270 },
      { filename: "/vc-assets/local/models/gta3.img/reefer.txd", start: 104736270, end: 104787470 },
      { filename: "/vc-assets/local/models/gta3.img/regina.dff", start: 104787470, end: 104982030 },
      { filename: "/vc-assets/local/models/gta3.img/regina.txd", start: 104982030, end: 105027086 },
      { filename: "/vc-assets/local/models/gta3.img/rio.dff", start: 105027086, end: 105156110 },
      { filename: "/vc-assets/local/models/gta3.img/rio.txd", start: 105156110, end: 105192974 },
      { filename: "/vc-assets/local/models/gta3.img/rockpatch03.dff", start: 105192974, end: 105205262 },
      { filename: "/vc-assets/local/models/gta3.img/rocky.txd", start: 105205262, end: 105217550 },
      { filename: "/vc-assets/local/models/gta3.img/rumpo.dff", start: 105217550, end: 105393678 },
      { filename: "/vc-assets/local/models/gta3.img/rumpo.txd", start: 105393678, end: 105455118 },
      { filename: "/vc-assets/local/models/gta3.img/rustship_structure0.dff", start: 105455118, end: 105569806 },
      { filename: "/vc-assets/local/models/gta3.img/sabre.dff", start: 105569806, end: 105747982 },
      { filename: "/vc-assets/local/models/gta3.img/sabre.txd", start: 105747982, end: 105793038 },
      { filename: "/vc-assets/local/models/gta3.img/sanchez.dff", start: 105793038, end: 105887246 },
      { filename: "/vc-assets/local/models/gta3.img/sanchez.txd", start: 105887246, end: 105917966 },
      { filename: "/vc-assets/local/models/gta3.img/schair.dff", start: 105917966, end: 105928206 },
      { filename: "/vc-assets/local/models/gta3.img/schair.txd", start: 105928206, end: 105940494 },
      { filename: "/vc-assets/local/models/gta3.img/seabed.txd", start: 105940494, end: 106008078 },
      { filename: "/vc-assets/local/models/gta3.img/securica.dff", start: 106008078, end: 106155534 },
      { filename: "/vc-assets/local/models/gta3.img/securica.txd", start: 106155534, end: 106216974 },
      { filename: "/vc-assets/local/models/gta3.img/sentinel.dff", start: 106216974, end: 106389006 },
      { filename: "/vc-assets/local/models/gta3.img/sentinel.txd", start: 106389006, end: 106434062 },
      { filename: "/vc-assets/local/models/gta3.img/sentxs.dff", start: 106434062, end: 106616334 },
      { filename: "/vc-assets/local/models/gta3.img/sentxs.txd", start: 106616334, end: 106661390 },
      { filename: "/vc-assets/local/models/gta3.img/sfrenda.dff", start: 106661390, end: 106741262 },
      { filename: "/vc-assets/local/models/gta3.img/sfrenda.txd", start: 106741262, end: 106786318 },
      { filename: "/vc-assets/local/models/gta3.img/sfrendb.dff", start: 106786318, end: 106868238 },
      { filename: "/vc-assets/local/models/gta3.img/sfrendb.txd", start: 106868238, end: 106913294 },
      { filename: "/vc-assets/local/models/gta3.img/sgoona.dff", start: 106913294, end: 106987022 },
      { filename: "/vc-assets/local/models/gta3.img/sgoona.txd", start: 106987022, end: 107032078 },
      { filename: "/vc-assets/local/models/gta3.img/sgoonb.dff", start: 107032078, end: 107107854 },
      { filename: "/vc-assets/local/models/gta3.img/sgoonb.txd", start: 107107854, end: 107152910 },
      { filename: "/vc-assets/local/models/gta3.img/shared_beach.txd", start: 107152910, end: 107527694 },
      { filename: "/vc-assets/local/models/gta3.img/sharedalleyod.txd", start: 107527694, end: 107865614 },
      { filename: "/vc-assets/local/models/gta3.img/shark.dff", start: 107865614, end: 107877902 },
      { filename: "/vc-assets/local/models/gta3.img/shark.txd", start: 107877902, end: 107884046 },
      { filename: "/vc-assets/local/models/gta3.img/shotgun.ifp", start: 107884046, end: 107935246 },
      { filename: "/vc-assets/local/models/gta3.img/signs.txd", start: 107935246, end: 107978254 },
      { filename: "/vc-assets/local/models/gta3.img/speeder.dff", start: 107978254, end: 108064270 },
      { filename: "/vc-assets/local/models/gta3.img/speeder.txd", start: 108064270, end: 108103182 },
      { filename: "/vc-assets/local/models/gta3.img/stadint.col", start: 108103182, end: 108537358 },
      { filename: "/vc-assets/local/models/gta3.img/stallion.dff", start: 108537358, end: 108695054 },
      { filename: "/vc-assets/local/models/gta3.img/stallion.txd", start: 108695054, end: 108740110 },
      { filename: "/vc-assets/local/models/gta3.img/starisl.col", start: 108740110, end: 108987918 },
      { filename: "/vc-assets/local/models/gta3.img/stiltsville03.dff", start: 108987918, end: 109084174 },
      { filename: "/vc-assets/local/models/gta3.img/stiltsville05.dff", start: 109084174, end: 109248014 },
      { filename: "/vc-assets/local/models/gta3.img/stiltsville1.dff", start: 109248014, end: 109411854 },
      { filename: "/vc-assets/local/models/gta3.img/stilty.txd", start: 109411854, end: 109538830 },
      { filename: "/vc-assets/local/models/gta3.img/stinger.dff", start: 109538830, end: 109657614 },
      { filename: "/vc-assets/local/models/gta3.img/stinger.txd", start: 109657614, end: 109706766 },
      { filename: "/vc-assets/local/models/gta3.img/streetlamp1.dff", start: 109706766, end: 109712910 },
      { filename: "/vc-assets/local/models/gta3.img/streetlamp2.dff", start: 109712910, end: 109719054 },
      { filename: "/vc-assets/local/models/gta3.img/stripback.txd", start: 109719054, end: 110034446 },
      { filename: "/vc-assets/local/models/gta3.img/stripclb.col", start: 110034446, end: 110065166 },
      { filename: "/vc-assets/local/models/gta3.img/stripclbdrclsd.dff", start: 110065166, end: 110067214 },
      { filename: "/vc-assets/local/models/gta3.img/strpbckdrclsd.dff", start: 110067214, end: 110069262 },
      { filename: "/vc-assets/local/models/gta3.img/sub_floodlite.dff", start: 110069262, end: 110077454 },
      { filename: "/vc-assets/local/models/gta3.img/sunbathe.ifp", start: 110077454, end: 110136846 },
      { filename: "/vc-assets/local/models/gta3.img/svntray.dff", start: 110136846, end: 110142990 },
      { filename: "/vc-assets/local/models/gta3.img/svntray.txd", start: 110142990, end: 110155278 },
      { filename: "/vc-assets/local/models/gta3.img/swashlandb.txd", start: 110155278, end: 110630414 },
      { filename: "/vc-assets/local/models/gta3.img/taxi.dff", start: 110630414, end: 110798350 },
      { filename: "/vc-assets/local/models/gta3.img/taxi.txd", start: 110798350, end: 110849550 },
      { filename: "/vc-assets/local/models/gta3.img/telegraph.txd", start: 110849550, end: 110904846 },
      { filename: "/vc-assets/local/models/gta3.img/telgrphpole02.dff", start: 110904846, end: 110910990 },
      { filename: "/vc-assets/local/models/gta3.img/trash.dff", start: 110910990, end: 111068686 },
      { filename: "/vc-assets/local/models/gta3.img/trash.txd", start: 111068686, end: 111113742 },
      { filename: "/vc-assets/local/models/gta3.img/treeshad.txd", start: 111113742, end: 111148558 },
      { filename: "/vc-assets/local/models/gta3.img/treeshadairha05.dff", start: 111148558, end: 111160846 },
      { filename: "/vc-assets/local/models/gta3.img/treeshadairha06.dff", start: 111160846, end: 111166990 },
      { filename: "/vc-assets/local/models/gta3.img/treeshadairha07.dff", start: 111166990, end: 111173134 },
      { filename: "/vc-assets/local/models/gta3.img/treeshadwn01.dff", start: 111173134, end: 111195662 },
      { filename: "/vc-assets/local/models/gta3.img/treeshadwn02.dff", start: 111195662, end: 111203854 },
      { filename: "/vc-assets/local/models/gta3.img/treeshadwn03.dff", start: 111203854, end: 111209998 },
      { filename: "/vc-assets/local/models/gta3.img/turtle.dff", start: 111209998, end: 111230478 },
      { filename: "/vc-assets/local/models/gta3.img/turtle.txd", start: 111230478, end: 111240718 },
      { filename: "/vc-assets/local/models/gta3.img/uzi.dff", start: 111240718, end: 111263246 },
      { filename: "/vc-assets/local/models/gta3.img/uzi.ifp", start: 111263246, end: 111320590 },
      { filename: "/vc-assets/local/models/gta3.img/uzi.txd", start: 111320590, end: 111328782 },
      { filename: "/vc-assets/local/models/gta3.img/van.ifp", start: 111328782, end: 111408654 },
      { filename: "/vc-assets/local/models/gta3.img/veg_palm01.dff", start: 111408654, end: 111412750 },
      { filename: "/vc-assets/local/models/gta3.img/veg_palm02.dff", start: 111412750, end: 111416846 },
      { filename: "/vc-assets/local/models/gta3.img/veg_palm04.dff", start: 111416846, end: 111420942 },
      { filename: "/vc-assets/local/models/gta3.img/veg_palmbig14.dff", start: 111420942, end: 111427086 },
      { filename: "/vc-assets/local/models/gta3.img/veg_palmkbb11.dff", start: 111427086, end: 111431182 },
      { filename: "/vc-assets/local/models/gta3.img/veg_palwee01.dff", start: 111431182, end: 111435278 },
      { filename: "/vc-assets/local/models/gta3.img/virgo.dff", start: 111435278, end: 111611406 },
      { filename: "/vc-assets/local/models/gta3.img/virgo.txd", start: 111611406, end: 111658510 },
      { filename: "/vc-assets/local/models/gta3.img/walton.dff", start: 111658510, end: 111824398 },
      { filename: "/vc-assets/local/models/gta3.img/walton.txd", start: 111824398, end: 111869454 },
      { filename: "/vc-assets/local/models/gta3.img/wash_deco01.dff", start: 111869454, end: 111957518 },
      { filename: "/vc-assets/local/models/gta3.img/wash_deco012.dff", start: 111957518, end: 111986190 },
      { filename: "/vc-assets/local/models/gta3.img/wash_deco02.dff", start: 111986190, end: 112041486 },
      { filename: "/vc-assets/local/models/gta3.img/wash_deco022.dff", start: 112041486, end: 112053774 },
      { filename: "/vc-assets/local/models/gta3.img/wash_deco03.dff", start: 112053774, end: 112111118 },
      { filename: "/vc-assets/local/models/gta3.img/wash_deco032.dff", start: 112111118, end: 112117262 },
      { filename: "/vc-assets/local/models/gta3.img/wash_pizzaplace.dff", start: 112117262, end: 112133646 },
      { filename: "/vc-assets/local/models/gta3.img/washawning2b.dff", start: 112133646, end: 112147982 },
      { filename: "/vc-assets/local/models/gta3.img/washawninga1.dff", start: 112147982, end: 112162318 },
      { filename: "/vc-assets/local/models/gta3.img/washbballcrt.txd", start: 112162318, end: 112317966 },
      { filename: "/vc-assets/local/models/gta3.img/washbuild003.dff", start: 112317966, end: 112334350 },
      { filename: "/vc-assets/local/models/gta3.img/washbuild005.dff", start: 112334350, end: 112354830 },
      { filename: "/vc-assets/local/models/gta3.img/washbuild014.dff", start: 112354830, end: 112373262 },
      { filename: "/vc-assets/local/models/gta3.img/washbuild068.dff", start: 112373262, end: 112426510 },
      { filename: "/vc-assets/local/models/gta3.img/washbuild071.dff", start: 112426510, end: 112436750 },
      { filename: "/vc-assets/local/models/gta3.img/washbuild072.dff", start: 112436750, end: 112449038 },
      { filename: "/vc-assets/local/models/gta3.img/washbuild073.dff", start: 112449038, end: 112489998 },
      { filename: "/vc-assets/local/models/gta3.img/washbuild074.dff", start: 112489998, end: 112500238 },
      { filename: "/vc-assets/local/models/gta3.img/washbuild075.dff", start: 112500238, end: 112510478 },
      { filename: "/vc-assets/local/models/gta3.img/washbuild116.dff", start: 112510478, end: 112514574 },
      { filename: "/vc-assets/local/models/gta3.img/washbuild120.txd", start: 112514574, end: 113028622 },
      { filename: "/vc-assets/local/models/gta3.img/washbuild124.txd", start: 113028622, end: 113165838 },
      { filename: "/vc-assets/local/models/gta3.img/washbuild187.dff", start: 113165838, end: 113219086 },
      { filename: "/vc-assets/local/models/gta3.img/washbuild198.dff", start: 113219086, end: 113286670 },
      { filename: "/vc-assets/local/models/gta3.img/washcorn2.txd", start: 113286670, end: 113573390 },
      { filename: "/vc-assets/local/models/gta3.img/washing.dff", start: 113573390, end: 113739278 },
      { filename: "/vc-assets/local/models/gta3.img/washing.txd", start: 113739278, end: 113784334 },
      { filename: "/vc-assets/local/models/gta3.img/washintn.col", start: 113784334, end: 114060814 },
      { filename: "/vc-assets/local/models/gta3.img/washints.col", start: 114060814, end: 114370062 },
      { filename: "/vc-assets/local/models/gta3.img/washlandb.txd", start: 114370062, end: 114517518 },
      { filename: "/vc-assets/local/models/gta3.img/washmallnew.txd", start: 114517518, end: 115301902 },
      { filename: "/vc-assets/local/models/gta3.img/washmallpark.txd", start: 115301902, end: 115498510 },
      { filename: "/vc-assets/local/models/gta3.img/washmiamistrip2.txd", start: 115498510, end: 116067854 },
      { filename: "/vc-assets/local/models/gta3.img/washmiamistrip3.txd", start: 116067854, end: 116547086 },
      { filename: "/vc-assets/local/models/gta3.img/washmiamistrip4.txd", start: 116547086, end: 117097998 },
      { filename: "/vc-assets/local/models/gta3.img/washnewbuild1.txd", start: 117097998, end: 117347854 },
      { filename: "/vc-assets/local/models/gta3.img/washnewbuild2.txd", start: 117347854, end: 117702158 },
      { filename: "/vc-assets/local/models/gta3.img/washnewbuild21.txd", start: 117702158, end: 118015502 },
      { filename: "/vc-assets/local/models/gta3.img/washnewsky1.dff", start: 118015502, end: 118097422 },
      { filename: "/vc-assets/local/models/gta3.img/washnewsky2.dff", start: 118097422, end: 118121998 },
      { filename: "/vc-assets/local/models/gta3.img/washnewsky3.dff", start: 118121998, end: 118203918 },
      { filename: "/vc-assets/local/models/gta3.img/washnrthpstr1.txd", start: 118203918, end: 118251022 },
      { filename: "/vc-assets/local/models/gta3.img/washotelneon1.dff", start: 118251022, end: 118302222 },
      { filename: "/vc-assets/local/models/gta3.img/washpshoutdet.dff", start: 118302222, end: 118371854 },
      { filename: "/vc-assets/local/models/gta3.img/washpshoutveg.dff", start: 118371854, end: 118423054 },
      { filename: "/vc-assets/local/models/gta3.img/washsky1.txd", start: 118423054, end: 118791694 },
      { filename: "/vc-assets/local/models/gta3.img/washskyplant1.dff", start: 118791694, end: 118853134 },
      { filename: "/vc-assets/local/models/gta3.img/washskyplant2.dff", start: 118853134, end: 118914574 },
      { filename: "/vc-assets/local/models/gta3.img/washvegy241.dff", start: 118914574, end: 118945294 },
      { filename: "/vc-assets/local/models/gta3.img/washwater.txd", start: 118945294, end: 119012878 },
      { filename: "/vc-assets/local/models/gta3.img/wfogo.dff", start: 119012878, end: 119076366 },
      { filename: "/vc-assets/local/models/gta3.img/wfogo.txd", start: 119076366, end: 119098894 },
      { filename: "/vc-assets/local/models/gta3.img/wfost.dff", start: 119098894, end: 119166478 },
      { filename: "/vc-assets/local/models/gta3.img/wfost.txd", start: 119166478, end: 119189006 },
      { filename: "/vc-assets/local/models/gta3.img/wfotr.dff", start: 119189006, end: 119254542 },
      { filename: "/vc-assets/local/models/gta3.img/wfotr.txd", start: 119254542, end: 119277070 },
      { filename: "/vc-assets/local/models/gta3.img/wfybu.dff", start: 119277070, end: 119342606 },
      { filename: "/vc-assets/local/models/gta3.img/wfybu.txd", start: 119342606, end: 119365134 },
      { filename: "/vc-assets/local/models/gta3.img/wfypr.dff", start: 119365134, end: 119426574 },
      { filename: "/vc-assets/local/models/gta3.img/wfypr.txd", start: 119426574, end: 119449102 },
      { filename: "/vc-assets/local/models/gta3.img/wfyri.dff", start: 119449102, end: 119512590 },
      { filename: "/vc-assets/local/models/gta3.img/wfyri.txd", start: 119512590, end: 119535118 },
      { filename: "/vc-assets/local/models/gta3.img/wfysh.dff", start: 119535118, end: 119598606 },
      { filename: "/vc-assets/local/models/gta3.img/wfysh.txd", start: 119598606, end: 119621134 },
      { filename: "/vc-assets/local/models/gta3.img/wmobu.dff", start: 119621134, end: 119686670 },
      { filename: "/vc-assets/local/models/gta3.img/wmobu.txd", start: 119686670, end: 119705102 },
      { filename: "/vc-assets/local/models/gta3.img/wmori.dff", start: 119705102, end: 119770638 },
      { filename: "/vc-assets/local/models/gta3.img/wmori.txd", start: 119770638, end: 119793166 },
      { filename: "/vc-assets/local/models/gta3.img/wmost.dff", start: 119793166, end: 119873038 },
      { filename: "/vc-assets/local/models/gta3.img/wmost.txd", start: 119873038, end: 119895566 },
      { filename: "/vc-assets/local/models/gta3.img/wmotr.dff", start: 119895566, end: 119950862 },
      { filename: "/vc-assets/local/models/gta3.img/wmotr.txd", start: 119950862, end: 119973390 },
      { filename: "/vc-assets/local/models/gta3.img/wmybu.dff", start: 119973390, end: 120045070 },
      { filename: "/vc-assets/local/models/gta3.img/wmybu.txd", start: 120045070, end: 120067598 },
      { filename: "/vc-assets/local/models/gta3.img/wmycr.dff", start: 120067598, end: 120141326 },
      { filename: "/vc-assets/local/models/gta3.img/wmycr.txd", start: 120141326, end: 120163854 },
      { filename: "/vc-assets/local/models/gta3.img/wmypi.dff", start: 120163854, end: 120243726 },
      { filename: "/vc-assets/local/models/gta3.img/wmypi.txd", start: 120243726, end: 120266254 },
      { filename: "/vc-assets/local/models/gta3.img/wmyri.dff", start: 120266254, end: 120346126 },
      { filename: "/vc-assets/local/models/gta3.img/wmyri.txd", start: 120346126, end: 120368654 },
      { filename: "/vc-assets/local/models/gta3.img/wsh_roadswsh05.dff", start: 120368654, end: 120374798 },
      { filename: "/vc-assets/local/models/gta3.img/wshbldws26bit.dff", start: 120374798, end: 120391182 },
      { filename: "/vc-assets/local/models/gta3.img/wshbuil19wall.dff", start: 120391182, end: 120401422 },
      { filename: "/vc-assets/local/models/gta3.img/wshbuildws09.dff", start: 120401422, end: 120464910 },
      { filename: "/vc-assets/local/models/gta3.img/wshbuildws19.dff", start: 120464910, end: 120530446 },
      { filename: "/vc-assets/local/models/gta3.img/wshbuildws26.dff", start: 120530446, end: 120544782 },
      { filename: "/vc-assets/local/models/gta3.img/wshbuildws31.dff", start: 120544782, end: 120561166 },
      { filename: "/vc-assets/local/models/gta3.img/wshbuildws312.dff", start: 120561166, end: 120575502 },
      { filename: "/vc-assets/local/models/gta3.img/wshbuildws322.dff", start: 120575502, end: 120589838 },
      { filename: "/vc-assets/local/models/gta3.img/wshbuildws43.dff", start: 120589838, end: 120671758 },
      { filename: "/vc-assets/local/models/gta3.img/wshmalsign4.dff", start: 120671758, end: 120679950 },
      { filename: "/vc-assets/local/models/gta3.img/wshmoundlaw1.dff", start: 120679950, end: 120686094 },
      { filename: "/vc-assets/local/models/gta3.img/wshneon.txd", start: 120686094, end: 120692238 },
      { filename: "/vc-assets/local/models/gta3.img/wshnrthpstr07.dff", start: 120692238, end: 120694286 },
      { filename: "/vc-assets/local/models/gta3.img/wshnrthroad01.dff", start: 120694286, end: 120698382 },
      { filename: "/vc-assets/local/models/gta3.img/wshnrthroad02.dff", start: 120698382, end: 120704526 },
      { filename: "/vc-assets/local/models/gta3.img/wshnrthroad10.dff", start: 120704526, end: 120710670 },
      { filename: "/vc-assets/local/models/gta3.img/wshnrthroad11.dff", start: 120710670, end: 120718862 },
      { filename: "/vc-assets/local/models/gta3.img/wshnrthroad12.dff", start: 120718862, end: 120722958 },
      { filename: "/vc-assets/local/models/gta3.img/wshnrthroad13.dff", start: 120722958, end: 120729102 },
      { filename: "/vc-assets/local/models/gta3.img/wshnrthroad14.dff", start: 120729102, end: 120735246 },
      { filename: "/vc-assets/local/models/gta3.img/wshnrthroad18.dff", start: 120735246, end: 120739342 },
      { filename: "/vc-assets/local/models/gta3.img/wshnrthroad19.dff", start: 120739342, end: 120743438 },
      { filename: "/vc-assets/local/models/gta3.img/wshnrthroad21.dff", start: 120743438, end: 120749582 },
      { filename: "/vc-assets/local/models/gta3.img/wshnrthroad22.dff", start: 120749582, end: 120753678 },
      { filename: "/vc-assets/local/models/gta3.img/wshnrthroad24.dff", start: 120753678, end: 120757774 },
      { filename: "/vc-assets/local/models/gta3.img/wshnrthroad26.dff", start: 120757774, end: 120763918 },
      { filename: "/vc-assets/local/models/gta3.img/wshnrthroad27.dff", start: 120763918, end: 120768014 },
      { filename: "/vc-assets/local/models/gta3.img/wshscarland226.dff", start: 120768014, end: 120794638 },
      { filename: "/vc-assets/local/models/gta3.img/wshsthroad05.dff", start: 120794638, end: 120798734 },
      { filename: "/vc-assets/local/models/gta3.img/wshsthroad16.dff", start: 120798734, end: 120806926 },
      { filename: "/vc-assets/local/models/gta3.img/wshtelgrph.txd", start: 120806926, end: 120827406 },
      { filename: "/vc-assets/local/models/gta3.img/wshtelgrphcabl03.dff", start: 120827406, end: 120835598 },
      { filename: "/vc-assets/local/models/gta3.img/wshtelgrphcabl04.dff", start: 120835598, end: 120843790 },
      { filename: "/vc-assets/local/models/gta3.img/wshtelgrphcabl05.dff", start: 120843790, end: 120851982 },
      { filename: "/vc-assets/local/models/gta3.img/wshxreflod.txd", start: 120851982, end: 120872462 },
      { filename: "/vc-assets/local/models/gta3.img/xod_majestic_dy.dff", start: 120872462, end: 120927758 },
      { filename: "/vc-assets/local/models/gta3.img/xod_majestic_nt.dff", start: 120927758, end: 120974862 },
      { filename: "/vc-assets/local/models/gta3.img/xod_starlite_dy.dff", start: 120974862, end: 121017870 },
      { filename: "/vc-assets/local/models/gta3.img/xod_starlite_nt.dff", start: 121017870, end: 121052686 },
      { filename: "/vc-assets/local/models/gta3.img/xrefhotels.txd", start: 121052686, end: 121296398 },
      { filename: "/vc-assets/local/models/gta3.img/yacht.col", start: 121296398, end: 121323022 },
      { filename: "/vc-assets/local/models/gta3.img/yacht_lod.txd", start: 121323022, end: 121329166 },
      { filename: "/vc-assets/local/models/gta3.img/yankee.dff", start: 121329166, end: 121497102 },
      { filename: "/vc-assets/local/models/gta3.img/yankee.txd", start: 121497102, end: 121615886 },
      { filename: "/vc-assets/local/models/hud.txd", start: 121615886, end: 121723062 },
      { filename: "/vc-assets/local/models/intro.txd", start: 121723062, end: 121807798 },
      { filename: "/vc-assets/local/models/misc.txd", start: 121807798, end: 121831774 },
      { filename: "/vc-assets/local/models/nswbtns.txd", start: 121831774, end: 122360198 },
      { filename: "/vc-assets/local/models/particle.txd", start: 122360198, end: 125028270 },
      { filename: "/vc-assets/local/models/ps3btns.txd", start: 125028270, end: 125556694 },
      { filename: "/vc-assets/local/models/x360btns.txd", start: 125556694, end: 126085118 },
      { filename: "/vc-assets/local/mp3/mp3report.txt", start: 126085118, end: 126085290 },
      { filename: "/vc-assets/local/mss/mp3dec.asi", start: 126085290, end: 126211242 },
      { filename: "/vc-assets/local/mss/mssa3d.m3d", start: 126211242, end: 126262442 },
      { filename: "/vc-assets/local/mss/mssa3d2.m3d", start: 126262442, end: 126323370 },
      { filename: "/vc-assets/local/mss/mssds3dh.m3d", start: 126323370, end: 126374058 },
      { filename: "/vc-assets/local/mss/mssds3ds.m3d", start: 126374058, end: 126424746 },
      { filename: "/vc-assets/local/mss/msseax.m3d", start: 126424746, end: 126478506 },
      { filename: "/vc-assets/local/mss/msseax3.m3d", start: 126478506, end: 126551210 },
      { filename: "/vc-assets/local/mss/mssfast.m3d", start: 126551210, end: 126614186 },
      { filename: "/vc-assets/local/mss/mssrsx.m3d", start: 126614186, end: 126966954 },
      { filename: "/vc-assets/local/mss/reverb3.flt", start: 126966954, end: 127023786 },
      { filename: "/vc-assets/local/readme.txt", start: 127023786, end: 127041644 },
      { filename: "/vc-assets/local/revc.ini", start: 127041644, end: 127044284 },
      { filename: "/vc-assets/local/skins/texture_guide.jpg", start: 127044284, end: 127132423 },
      { filename: "/vc-assets/local/text/american.gxt", start: 127132423, end: 127556557 },
      { filename: "/vc-assets/local/text/french.gxt", start: 127556557, end: 128026689 },
      { filename: "/vc-assets/local/text/german.gxt", start: 128026689, end: 128488719 },
      { filename: "/vc-assets/local/text/italian.gxt", start: 128488719, end: 128947805 },
      { filename: "/vc-assets/local/text/russian.gxt", start: 128947805, end: 129368409 },
      { filename: "/vc-assets/local/text/spanish.gxt", start: 129368409, end: 129823823 },
      { filename: "/vc-assets/local/txd/intro1.txd", start: 129823823, end: 130087159 },
      { filename: "/vc-assets/local/txd/intro2.txd", start: 130087159, end: 130350495 },
      { filename: "/vc-assets/local/txd/intro3.txd", start: 130350495, end: 130613831 },
      { filename: "/vc-assets/local/txd/intro4.txd", start: 130613831, end: 130877167 },
      { filename: "/vc-assets/local/txd/loadsc0.txd", start: 130877167, end: 131140503 },
      { filename: "/vc-assets/local/txd/loadsc1.txd", start: 131140503, end: 131403839 },
      { filename: "/vc-assets/local/txd/loadsc10.txd", start: 131403839, end: 131667175 },
      { filename: "/vc-assets/local/txd/loadsc11.txd", start: 131667175, end: 131930511 },
      { filename: "/vc-assets/local/txd/loadsc12.txd", start: 131930511, end: 132193847 },
      { filename: "/vc-assets/local/txd/loadsc13.txd", start: 132193847, end: 132457183 },
      { filename: "/vc-assets/local/txd/loadsc2.txd", start: 132457183, end: 132720519 },
      { filename: "/vc-assets/local/txd/loadsc3.txd", start: 132720519, end: 132983855 },
      { filename: "/vc-assets/local/txd/loadsc4.txd", start: 132983855, end: 133247191 },
      { filename: "/vc-assets/local/txd/loadsc5.txd", start: 133247191, end: 133510527 },
      { filename: "/vc-assets/local/txd/loadsc6.txd", start: 133510527, end: 133773863 },
      { filename: "/vc-assets/local/txd/loadsc7.txd", start: 133773863, end: 134037199 },
      { filename: "/vc-assets/local/txd/loadsc8.txd", start: 134037199, end: 134300535 },
      { filename: "/vc-assets/local/txd/loadsc9.txd", start: 134300535, end: 134563871 },
      { filename: "/vc-assets/local/txd/news.txd", start: 134563871, end: 134827207 },
      { filename: "/vc-assets/local/txd/outro.txd", start: 134827207, end: 135090543 },
      { filename: "/vc-assets/local/txd/splash1.txd", start: 135090543, end: 135222807 },
      { filename: "/vc-assets/local/txd/splash2.txd", start: 135222807, end: 135355071 },
      { filename: "/vc-assets/local/txd/splash3.txd", start: 135355071, end: 135355111 }
    ],
    remote_package_size: 135355111
  });
})();
var arguments_ = [];
var thisProgram = "./this.program";
var quit_ = (status, toThrow) => {
  throw toThrow;
};
var _scriptName = globalThis.document?.currentScript?.src;
if (typeof __filename != "undefined") {
  _scriptName = __filename;
} else if (ENVIRONMENT_IS_WORKER) {
  _scriptName = self.location.href;
}
var scriptDirectory = "";
function locateFile(path) {
  if (Module["locateFile"]) {
    return Module["locateFile"](path, scriptDirectory);
  }
  return scriptDirectory + path;
}
var readAsync, readBinary;
if (ENVIRONMENT_IS_NODE) {
  var fs = require("fs");
  scriptDirectory = __dirname + "/";
  readBinary = (filename) => {
    filename = isFileURI(filename) ? new URL(filename) : filename;
    var ret = fs.readFileSync(filename);
    return ret;
  };
  readAsync = async (filename, binary = true) => {
    filename = isFileURI(filename) ? new URL(filename) : filename;
    var ret = fs.readFileSync(filename, binary ? undefined : "utf8");
    return ret;
  };
  if (process.argv.length > 1) {
    thisProgram = process.argv[1].replace(/\\/g, "/");
  }
  arguments_ = process.argv.slice(2);
  if (typeof module != "undefined") {
    module["exports"] = Module;
  }
  quit_ = (status, toThrow) => {
    process.exitCode = status;
    throw toThrow;
  };
} else if (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER) {
  try {
    scriptDirectory = new URL(".", _scriptName).href;
  } catch {}
  {
    if (ENVIRONMENT_IS_WORKER) {
      readBinary = (url) => {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", url, false);
        xhr.responseType = "arraybuffer";
        xhr.send(null);
        return new Uint8Array(xhr.response);
      };
    }
    readAsync = async (url) => {
      if (isFileURI(url)) {
        return new Promise((resolve, reject) => {
          var xhr = new XMLHttpRequest();
          xhr.open("GET", url, true);
          xhr.responseType = "arraybuffer";
          xhr.onload = () => {
            if (xhr.status == 200 || (xhr.status == 0 && xhr.response)) {
              resolve(xhr.response);
              return;
            }
            reject(xhr.status);
          };
          xhr.onerror = reject;
          xhr.send(null);
        });
      }
      var response = await fetch(url, { credentials: "same-origin" });
      if (response.ok) {
        return response.arrayBuffer();
      }
      throw new Error(response.status + " : " + response.url);
    };
  }
} else {
}
var out = console.log.bind(console);
var err = console.error.bind(console);
var wasmBinary;
var ABORT = false;
var EXITSTATUS;
var isFileURI = (filename) => filename.startsWith("file://");
var HEAP8, HEAPU8, HEAP16, HEAPU16, HEAP32, HEAPU32, HEAPF32, HEAPF64;
var HEAP64, HEAPU64;
var runtimeInitialized = false;
function updateMemoryViews() {
  var b = wasmMemory.buffer;
  HEAP8 = new Int8Array(b);
  HEAP16 = new Int16Array(b);
  HEAPU8 = new Uint8Array(b);
  HEAPU16 = new Uint16Array(b);
  HEAP32 = new Int32Array(b);
  HEAPU32 = new Uint32Array(b);
  HEAPF32 = new Float32Array(b);
  HEAPF64 = new Float64Array(b);
  HEAP64 = new BigInt64Array(b);
  HEAPU64 = new BigUint64Array(b);
}
function preRun() {
  if (Module["preRun"]) {
    if (typeof Module["preRun"] == "function") Module["preRun"] = [Module["preRun"]];
    while (Module["preRun"].length) {
      addOnPreRun(Module["preRun"].shift());
    }
  }
  callRuntimeCallbacks(onPreRuns);
}
function initRuntime() {
  runtimeInitialized = true;
  if (!Module["noFSInit"] && !FS.initialized) FS.init();
  TTY.init();
  wasmExports["xk"]();
  FS.ignorePermissions = false;
}
function preMain() {}
function postRun() {
  if (Module["postRun"]) {
    if (typeof Module["postRun"] == "function") Module["postRun"] = [Module["postRun"]];
    while (Module["postRun"].length) {
      addOnPostRun(Module["postRun"].shift());
    }
  }
  callRuntimeCallbacks(onPostRuns);
}
abort = function (what) {
  Module["onAbort"]?.(what);
  what = "Aborted(" + what + ")";
  err(what);
  ABORT = true;
  what += ". Build with -sASSERTIONS for more info.";
  var e = new WebAssembly.RuntimeError(what);
  throw e;
};
var wasmBinaryFile;
function findWasmBinary() {
  return locateFile("index.wasm");
}
function getBinarySync(file) {
  if (file == wasmBinaryFile && wasmBinary) {
    return new Uint8Array(wasmBinary);
  }
  if (readBinary) {
    return readBinary(file);
  }
  throw "both async and sync fetching of the wasm failed";
}
async function getWasmBinary(binaryFile) {
  if (!wasmBinary) {
    try {
      var response = await readAsync(binaryFile);
      return new Uint8Array(response);
    } catch {}
  }
  return getBinarySync(binaryFile);
}
async function instantiateArrayBuffer(binaryFile, imports) {
  try {
    var binary = await getWasmBinary(binaryFile);
    var instance = await WebAssembly.instantiate(binary, imports);
    return instance;
  } catch (reason) {
    err(`failed to asynchronously prepare wasm: ${reason}`);
    abort(reason);
  }
}
async function instantiateAsync(binary, binaryFile, imports) {
  if (!binary && !isFileURI(binaryFile) && !ENVIRONMENT_IS_NODE) {
    try {
      var response = fetch(binaryFile, { credentials: "same-origin" });
      var instantiationResult = await WebAssembly.instantiateStreaming(response, imports);
      return instantiationResult;
    } catch (reason) {
      err(`wasm streaming compile failed: ${reason}`);
      err("falling back to ArrayBuffer instantiation");
    }
  }
  return instantiateArrayBuffer(binaryFile, imports);
}
function getWasmImports() {
  var imports = { a: wasmImports };
  return imports;
}
async function createWasm() {
  function receiveInstance(instance, module) {
    wasmExports = instance.exports;
    assignWasmExports(wasmExports);
    updateMemoryViews();
    removeRunDependency("wasm-instantiate");
    return wasmExports;
  }
  addRunDependency("wasm-instantiate");
  function receiveInstantiationResult(result) {
    return receiveInstance(result["instance"]);
  }
  var info = getWasmImports();
  if (Module["instantiateWasm"]) {
    return new Promise((resolve, reject) => {
      Module["instantiateWasm"](info, (inst, mod) => {
        resolve(receiveInstance(inst, mod));
      });
    });
  }
  wasmBinaryFile ??= findWasmBinary();
  var result = await instantiateAsync(wasmBinary, wasmBinaryFile, info);
  var exports = receiveInstantiationResult(result);
  return exports;
}
class ExitStatus {
  name = "ExitStatus";
  constructor(status) {
    this.message = `Program terminated with exit(${status})`;
    this.status = status;
  }
}
var callRuntimeCallbacks = (callbacks) => {
  while (callbacks.length > 0) {
    callbacks.shift()(Module);
  }
};
var onPostRuns = [];
var addOnPostRun = (cb) => onPostRuns.push(cb);
var onPreRuns = [];
var addOnPreRun = (cb) => onPreRuns.push(cb);
var runDependencies = 0;
var dependenciesFulfilled = null;
var removeRunDependency = (id) => {
  runDependencies--;
  Module["monitorRunDependencies"]?.(runDependencies);
  if (runDependencies == 0) {
    if (dependenciesFulfilled) {
      var callback = dependenciesFulfilled;
      dependenciesFulfilled = null;
      callback();
    }
  }
};
var addRunDependency = (id) => {
  runDependencies++;
  Module["monitorRunDependencies"]?.(runDependencies);
};
var noExitRuntime = true;
function setValue(ptr, value, type = "i8") {
  if (type.endsWith("*")) type = "*";
  switch (type) {
    case "i1":
      HEAP8[ptr] = value;
      break;
    case "i8":
      HEAP8[ptr] = value;
      break;
    case "i16":
      HEAP16[ptr >> 1] = value;
      break;
    case "i32":
      HEAP32[ptr >> 2] = value;
      break;
    case "i64":
      HEAP64[ptr >> 3] = BigInt(value);
      break;
    case "float":
      HEAPF32[ptr >> 2] = value;
      break;
    case "double":
      HEAPF64[ptr >> 3] = value;
      break;
    case "*":
      HEAPU32[ptr >> 2] = value;
      break;
    default:
      abort(`invalid type for setValue: ${type}`);
  }
}
var stackRestore = (val) => __emscripten_stack_restore(val);
var stackSave = () => _emscripten_stack_get_current();
var exceptionCaught = [];
var uncaughtExceptionCount = 0;
var ___cxa_begin_catch = (ptr) => {
  var info = new ExceptionInfo(ptr);
  if (!info.get_caught()) {
    info.set_caught(true);
    uncaughtExceptionCount--;
  }
  info.set_rethrown(false);
  exceptionCaught.push(info);
  ___cxa_increment_exception_refcount(ptr);
  return ___cxa_get_exception_ptr(ptr);
};
var exceptionLast = 0;
var ___cxa_end_catch = () => {
  _setThrew(0, 0);
  var info = exceptionCaught.pop();
  ___cxa_decrement_exception_refcount(info.excPtr);
  exceptionLast = 0;
};
class ExceptionInfo {
  constructor(excPtr) {
    this.excPtr = excPtr;
    this.ptr = excPtr - 24;
  }
  set_type(type) {
    HEAPU32[(this.ptr + 4) >> 2] = type;
  }
  get_type() {
    return HEAPU32[(this.ptr + 4) >> 2];
  }
  set_destructor(destructor) {
    HEAPU32[(this.ptr + 8) >> 2] = destructor;
  }
  get_destructor() {
    return HEAPU32[(this.ptr + 8) >> 2];
  }
  set_caught(caught) {
    caught = caught ? 1 : 0;
    HEAP8[this.ptr + 12] = caught;
  }
  get_caught() {
    return HEAP8[this.ptr + 12] != 0;
  }
  set_rethrown(rethrown) {
    rethrown = rethrown ? 1 : 0;
    HEAP8[this.ptr + 13] = rethrown;
  }
  get_rethrown() {
    return HEAP8[this.ptr + 13] != 0;
  }
  init(type, destructor) {
    this.set_adjusted_ptr(0);
    this.set_type(type);
    this.set_destructor(destructor);
  }
  set_adjusted_ptr(adjustedPtr) {
    HEAPU32[(this.ptr + 16) >> 2] = adjustedPtr;
  }
  get_adjusted_ptr() {
    return HEAPU32[(this.ptr + 16) >> 2];
  }
}
var setTempRet0 = (val) => __emscripten_tempret_set(val);
var findMatchingCatch = (args) => {
  var thrown = exceptionLast;
  if (!thrown) {
    setTempRet0(0);
    return 0;
  }
  var info = new ExceptionInfo(thrown);
  info.set_adjusted_ptr(thrown);
  var thrownType = info.get_type();
  if (!thrownType) {
    setTempRet0(0);
    return thrown;
  }
  for (var caughtType of args) {
    if (caughtType === 0 || caughtType === thrownType) {
      break;
    }
    var adjusted_ptr_addr = info.ptr + 16;
    if (___cxa_can_catch(caughtType, thrownType, adjusted_ptr_addr)) {
      setTempRet0(caughtType);
      return thrown;
    }
  }
  setTempRet0(thrownType);
  return thrown;
};
var ___cxa_find_matching_catch_2 = () => findMatchingCatch([]);
var ___cxa_find_matching_catch_3 = (arg0) => findMatchingCatch([arg0]);
var ___cxa_rethrow = () => {
  var info = exceptionCaught.pop();
  if (!info) {
    abort("no exception to throw");
  }
  var ptr = info.excPtr;
  if (!info.get_rethrown()) {
    exceptionCaught.push(info);
    info.set_rethrown(true);
    info.set_caught(false);
    uncaughtExceptionCount++;
  }
  exceptionLast = ptr;
  throw exceptionLast;
};
var ___cxa_throw = (ptr, type, destructor) => {
  var info = new ExceptionInfo(ptr);
  info.init(type, destructor);
  exceptionLast = ptr;
  uncaughtExceptionCount++;
  throw exceptionLast;
};
var ___cxa_uncaught_exceptions = () => uncaughtExceptionCount;
var ___resumeException = (ptr) => {
  if (!exceptionLast) {
    exceptionLast = ptr;
  }
  throw exceptionLast;
};
var PATH = {
  isAbs: (path) => path.charAt(0) === "/",
  splitPath: (filename) => {
    var splitPathRe = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
    return splitPathRe.exec(filename).slice(1);
  },
  normalizeArray: (parts, allowAboveRoot) => {
    var up = 0;
    for (var i = parts.length - 1; i >= 0; i--) {
      var last = parts[i];
      if (last === ".") {
        parts.splice(i, 1);
      } else if (last === "..") {
        parts.splice(i, 1);
        up++;
      } else if (up) {
        parts.splice(i, 1);
        up--;
      }
    }
    if (allowAboveRoot) {
      for (; up; up--) {
        parts.unshift("..");
      }
    }
    return parts;
  },
  normalize: (path) => {
    var isAbsolute = PATH.isAbs(path),
      trailingSlash = path.slice(-1) === "/";
    path = PATH.normalizeArray(
      path.split("/").filter((p) => !!p),
      !isAbsolute
    ).join("/");
    if (!path && !isAbsolute) {
      path = ".";
    }
    if (path && trailingSlash) {
      path += "/";
    }
    return (isAbsolute ? "/" : "") + path;
  },
  dirname: (path) => {
    var result = PATH.splitPath(path),
      root = result[0],
      dir = result[1];
    if (!root && !dir) {
      return ".";
    }
    if (dir) {
      dir = dir.slice(0, -1);
    }
    return root + dir;
  },
  basename: (path) => path && path.match(/([^\/]+|\/)\/*$/)[1],
  join: (...paths) => PATH.normalize(paths.join("/")),
  join2: (l, r) => PATH.normalize(l + "/" + r)
};
var initRandomFill = () => {
  if (ENVIRONMENT_IS_NODE) {
    var nodeCrypto = require("crypto");
    return (view) => nodeCrypto.randomFillSync(view);
  }
  return (view) => crypto.getRandomValues(view);
};
var randomFill = (view) => {
  (randomFill = initRandomFill())(view);
};
var PATH_FS = {
  resolve: (...args) => {
    var resolvedPath = "",
      resolvedAbsolute = false;
    for (var i = args.length - 1; i >= -1 && !resolvedAbsolute; i--) {
      var path = i >= 0 ? args[i] : FS.cwd();
      if (typeof path != "string") {
        throw new TypeError("Arguments to path.resolve must be strings");
      } else if (!path) {
        return "";
      }
      resolvedPath = path + "/" + resolvedPath;
      resolvedAbsolute = PATH.isAbs(path);
    }
    resolvedPath = PATH.normalizeArray(
      resolvedPath.split("/").filter((p) => !!p),
      !resolvedAbsolute
    ).join("/");
    return (resolvedAbsolute ? "/" : "") + resolvedPath || ".";
  },
  relative: (from, to) => {
    from = PATH_FS.resolve(from).slice(1);
    to = PATH_FS.resolve(to).slice(1);
    function trim(arr) {
      var start = 0;
      for (; start < arr.length; start++) {
        if (arr[start] !== "") break;
      }
      var end = arr.length - 1;
      for (; end >= 0; end--) {
        if (arr[end] !== "") break;
      }
      if (start > end) return [];
      return arr.slice(start, end - start + 1);
    }
    var fromParts = trim(from.split("/"));
    var toParts = trim(to.split("/"));
    var length = Math.min(fromParts.length, toParts.length);
    var samePartsLength = length;
    for (var i = 0; i < length; i++) {
      if (fromParts[i] !== toParts[i]) {
        samePartsLength = i;
        break;
      }
    }
    var outputParts = [];
    for (var i = samePartsLength; i < fromParts.length; i++) {
      outputParts.push("..");
    }
    outputParts = outputParts.concat(toParts.slice(samePartsLength));
    return outputParts.join("/");
  }
};
var UTF8Decoder = new TextDecoder();
var findStringEnd = (heapOrArray, idx, maxBytesToRead, ignoreNul) => {
  var maxIdx = idx + maxBytesToRead;
  if (ignoreNul) return maxIdx;
  while (heapOrArray[idx] && !(idx >= maxIdx)) ++idx;
  return idx;
};
var UTF8ArrayToString = (heapOrArray, idx = 0, maxBytesToRead, ignoreNul) => {
  var endPtr = findStringEnd(heapOrArray, idx, maxBytesToRead, ignoreNul);
  return UTF8Decoder.decode(
    heapOrArray.buffer ? heapOrArray.subarray(idx, endPtr) : new Uint8Array(heapOrArray.slice(idx, endPtr))
  );
};
var FS_stdin_getChar_buffer = [];
var lengthBytesUTF8 = (str) => {
  var len = 0;
  for (var i = 0; i < str.length; ++i) {
    var c = str.charCodeAt(i);
    if (c <= 127) {
      len++;
    } else if (c <= 2047) {
      len += 2;
    } else if (c >= 55296 && c <= 57343) {
      len += 4;
      ++i;
    } else {
      len += 3;
    }
  }
  return len;
};
var stringToUTF8Array = (str, heap, outIdx, maxBytesToWrite) => {
  if (!(maxBytesToWrite > 0)) return 0;
  var startIdx = outIdx;
  var endIdx = outIdx + maxBytesToWrite - 1;
  for (var i = 0; i < str.length; ++i) {
    var u = str.codePointAt(i);
    if (u <= 127) {
      if (outIdx >= endIdx) break;
      heap[outIdx++] = u;
    } else if (u <= 2047) {
      if (outIdx + 1 >= endIdx) break;
      heap[outIdx++] = 192 | (u >> 6);
      heap[outIdx++] = 128 | (u & 63);
    } else if (u <= 65535) {
      if (outIdx + 2 >= endIdx) break;
      heap[outIdx++] = 224 | (u >> 12);
      heap[outIdx++] = 128 | ((u >> 6) & 63);
      heap[outIdx++] = 128 | (u & 63);
    } else {
      if (outIdx + 3 >= endIdx) break;
      heap[outIdx++] = 240 | (u >> 18);
      heap[outIdx++] = 128 | ((u >> 12) & 63);
      heap[outIdx++] = 128 | ((u >> 6) & 63);
      heap[outIdx++] = 128 | (u & 63);
      i++;
    }
  }
  heap[outIdx] = 0;
  return outIdx - startIdx;
};
var intArrayFromString = (stringy, dontAddNull, length) => {
  var len = length > 0 ? length : lengthBytesUTF8(stringy) + 1;
  var u8array = new Array(len);
  var numBytesWritten = stringToUTF8Array(stringy, u8array, 0, u8array.length);
  if (dontAddNull) u8array.length = numBytesWritten;
  return u8array;
};
var FS_stdin_getChar = () => {
  if (!FS_stdin_getChar_buffer.length) {
    var result = null;
    if (ENVIRONMENT_IS_NODE) {
      var BUFSIZE = 256;
      var buf = Buffer.alloc(BUFSIZE);
      var bytesRead = 0;
      var fd = process.stdin.fd;
      try {
        bytesRead = fs.readSync(fd, buf, 0, BUFSIZE);
      } catch (e) {
        if (e.toString().includes("EOF")) bytesRead = 0;
        else throw e;
      }
      if (bytesRead > 0) {
        result = buf.slice(0, bytesRead).toString("utf-8");
      }
    } else if (globalThis.window?.prompt) {
      result = window.prompt("Input: ");
      if (result !== null) {
        result += "\n";
      }
    } else {
    }
    if (!result) {
      return null;
    }
    FS_stdin_getChar_buffer = intArrayFromString(result, true);
  }
  return FS_stdin_getChar_buffer.shift();
};
var TTY = {
  ttys: [],
  init() {},
  shutdown() {},
  register(dev, ops) {
    TTY.ttys[dev] = { input: [], output: [], ops };
    FS.registerDevice(dev, TTY.stream_ops);
  },
  stream_ops: {
    open(stream) {
      var tty = TTY.ttys[stream.node.rdev];
      if (!tty) {
        throw new FS.ErrnoError(43);
      }
      stream.tty = tty;
      stream.seekable = false;
    },
    close(stream) {
      stream.tty.ops.fsync(stream.tty);
    },
    fsync(stream) {
      stream.tty.ops.fsync(stream.tty);
    },
    read(stream, buffer, offset, length, pos) {
      if (!stream.tty || !stream.tty.ops.get_char) {
        throw new FS.ErrnoError(60);
      }
      var bytesRead = 0;
      for (var i = 0; i < length; i++) {
        var result;
        try {
          result = stream.tty.ops.get_char(stream.tty);
        } catch (e) {
          throw new FS.ErrnoError(29);
        }
        if (result === undefined && bytesRead === 0) {
          throw new FS.ErrnoError(6);
        }
        if (result === null || result === undefined) break;
        bytesRead++;
        buffer[offset + i] = result;
      }
      if (bytesRead) {
        stream.node.atime = Date.now();
      }
      return bytesRead;
    },
    write(stream, buffer, offset, length, pos) {
      if (!stream.tty || !stream.tty.ops.put_char) {
        throw new FS.ErrnoError(60);
      }
      try {
        for (var i = 0; i < length; i++) {
          stream.tty.ops.put_char(stream.tty, buffer[offset + i]);
        }
      } catch (e) {
        throw new FS.ErrnoError(29);
      }
      if (length) {
        stream.node.mtime = stream.node.ctime = Date.now();
      }
      return i;
    }
  },
  default_tty_ops: {
    get_char(tty) {
      return FS_stdin_getChar();
    },
    put_char(tty, val) {
      if (val === null || val === 10) {
        out(UTF8ArrayToString(tty.output));
        tty.output = [];
      } else {
        if (val != 0) tty.output.push(val);
      }
    },
    fsync(tty) {
      if (tty.output?.length > 0) {
        out(UTF8ArrayToString(tty.output));
        tty.output = [];
      }
    },
    ioctl_tcgets(tty) {
      return {
        c_iflag: 25856,
        c_oflag: 5,
        c_cflag: 191,
        c_lflag: 35387,
        c_cc: [
          3, 28, 127, 21, 4, 0, 1, 0, 17, 19, 26, 0, 18, 15, 23, 22, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
        ]
      };
    },
    ioctl_tcsets(tty, optional_actions, data) {
      return 0;
    },
    ioctl_tiocgwinsz(tty) {
      return [24, 80];
    }
  },
  default_tty1_ops: {
    put_char(tty, val) {
      if (val === null || val === 10) {
        err(UTF8ArrayToString(tty.output));
        tty.output = [];
      } else {
        if (val != 0) tty.output.push(val);
      }
    },
    fsync(tty) {
      if (tty.output?.length > 0) {
        err(UTF8ArrayToString(tty.output));
        tty.output = [];
      }
    }
  }
};
var mmapAlloc = (size) => {
  abort();
};
var MEMFS = {
  ops_table: null,
  mount(mount) {
    return MEMFS.createNode(null, "/", 16895, 0);
  },
  createNode(parent, name, mode, dev) {
    if (FS.isBlkdev(mode) || FS.isFIFO(mode)) {
      throw new FS.ErrnoError(63);
    }
    MEMFS.ops_table ||= {
      dir: {
        node: {
          getattr: MEMFS.node_ops.getattr,
          setattr: MEMFS.node_ops.setattr,
          lookup: MEMFS.node_ops.lookup,
          mknod: MEMFS.node_ops.mknod,
          rename: MEMFS.node_ops.rename,
          unlink: MEMFS.node_ops.unlink,
          rmdir: MEMFS.node_ops.rmdir,
          readdir: MEMFS.node_ops.readdir,
          symlink: MEMFS.node_ops.symlink
        },
        stream: { llseek: MEMFS.stream_ops.llseek }
      },
      file: {
        node: { getattr: MEMFS.node_ops.getattr, setattr: MEMFS.node_ops.setattr },
        stream: {
          llseek: MEMFS.stream_ops.llseek,
          read: MEMFS.stream_ops.read,
          write: MEMFS.stream_ops.write,
          mmap: MEMFS.stream_ops.mmap,
          msync: MEMFS.stream_ops.msync
        }
      },
      link: {
        node: { getattr: MEMFS.node_ops.getattr, setattr: MEMFS.node_ops.setattr, readlink: MEMFS.node_ops.readlink },
        stream: {}
      },
      chrdev: {
        node: { getattr: MEMFS.node_ops.getattr, setattr: MEMFS.node_ops.setattr },
        stream: FS.chrdev_stream_ops
      }
    };
    var node = FS.createNode(parent, name, mode, dev);
    if (FS.isDir(node.mode)) {
      node.node_ops = MEMFS.ops_table.dir.node;
      node.stream_ops = MEMFS.ops_table.dir.stream;
      node.contents = {};
    } else if (FS.isFile(node.mode)) {
      node.node_ops = MEMFS.ops_table.file.node;
      node.stream_ops = MEMFS.ops_table.file.stream;
      node.usedBytes = 0;
      node.contents = null;
    } else if (FS.isLink(node.mode)) {
      node.node_ops = MEMFS.ops_table.link.node;
      node.stream_ops = MEMFS.ops_table.link.stream;
    } else if (FS.isChrdev(node.mode)) {
      node.node_ops = MEMFS.ops_table.chrdev.node;
      node.stream_ops = MEMFS.ops_table.chrdev.stream;
    }
    node.atime = node.mtime = node.ctime = Date.now();
    if (parent) {
      parent.contents[name] = node;
      parent.atime = parent.mtime = parent.ctime = node.atime;
    }
    return node;
  },
  getFileDataAsTypedArray(node) {
    if (!node.contents) return new Uint8Array(0);
    if (node.contents.subarray) return node.contents.subarray(0, node.usedBytes);
    return new Uint8Array(node.contents);
  },
  expandFileStorage(node, newCapacity) {
    var prevCapacity = node.contents ? node.contents.length : 0;
    if (prevCapacity >= newCapacity) return;
    var CAPACITY_DOUBLING_MAX = 1024 * 1024;
    newCapacity = Math.max(newCapacity, (prevCapacity * (prevCapacity < CAPACITY_DOUBLING_MAX ? 2 : 1.125)) >>> 0);
    if (prevCapacity != 0) newCapacity = Math.max(newCapacity, 256);
    var oldContents = node.contents;
    node.contents = new Uint8Array(newCapacity);
    if (node.usedBytes > 0) node.contents.set(oldContents.subarray(0, node.usedBytes), 0);
  },
  resizeFileStorage(node, newSize) {
    if (node.usedBytes == newSize) return;
    if (newSize == 0) {
      node.contents = null;
      node.usedBytes = 0;
    } else {
      var oldContents = node.contents;
      node.contents = new Uint8Array(newSize);
      if (oldContents) {
        node.contents.set(oldContents.subarray(0, Math.min(newSize, node.usedBytes)));
      }
      node.usedBytes = newSize;
    }
  },
  node_ops: {
    getattr(node) {
      var attr = {};
      attr.dev = FS.isChrdev(node.mode) ? node.id : 1;
      attr.ino = node.id;
      attr.mode = node.mode;
      attr.nlink = 1;
      attr.uid = 0;
      attr.gid = 0;
      attr.rdev = node.rdev;
      if (FS.isDir(node.mode)) {
        attr.size = 4096;
      } else if (FS.isFile(node.mode)) {
        attr.size = node.usedBytes;
      } else if (FS.isLink(node.mode)) {
        attr.size = node.link.length;
      } else {
        attr.size = 0;
      }
      attr.atime = new Date(node.atime);
      attr.mtime = new Date(node.mtime);
      attr.ctime = new Date(node.ctime);
      attr.blksize = 4096;
      attr.blocks = Math.ceil(attr.size / attr.blksize);
      return attr;
    },
    setattr(node, attr) {
      for (const key of ["mode", "atime", "mtime", "ctime"]) {
        if (attr[key] != null) {
          node[key] = attr[key];
        }
      }
      if (attr.size !== undefined) {
        MEMFS.resizeFileStorage(node, attr.size);
      }
    },
    lookup(parent, name) {
      if (!MEMFS.doesNotExistError) {
        MEMFS.doesNotExistError = new FS.ErrnoError(44);
        MEMFS.doesNotExistError.stack = "<generic error, no stack>";
      }
      throw MEMFS.doesNotExistError;
    },
    mknod(parent, name, mode, dev) {
      return MEMFS.createNode(parent, name, mode, dev);
    },
    rename(old_node, new_dir, new_name) {
      var new_node;
      try {
        new_node = FS.lookupNode(new_dir, new_name);
      } catch (e) {}
      if (new_node) {
        if (FS.isDir(old_node.mode)) {
          for (var i in new_node.contents) {
            throw new FS.ErrnoError(55);
          }
        }
        FS.hashRemoveNode(new_node);
      }
      delete old_node.parent.contents[old_node.name];
      new_dir.contents[new_name] = old_node;
      old_node.name = new_name;
      new_dir.ctime = new_dir.mtime = old_node.parent.ctime = old_node.parent.mtime = Date.now();
    },
    unlink(parent, name) {
      delete parent.contents[name];
      parent.ctime = parent.mtime = Date.now();
    },
    rmdir(parent, name) {
      var node = FS.lookupNode(parent, name);
      for (var i in node.contents) {
        throw new FS.ErrnoError(55);
      }
      delete parent.contents[name];
      parent.ctime = parent.mtime = Date.now();
    },
    readdir(node) {
      return [".", "..", ...Object.keys(node.contents)];
    },
    symlink(parent, newname, oldpath) {
      var node = MEMFS.createNode(parent, newname, 511 | 40960, 0);
      node.link = oldpath;
      return node;
    },
    readlink(node) {
      if (!FS.isLink(node.mode)) {
        throw new FS.ErrnoError(28);
      }
      return node.link;
    }
  },
  stream_ops: {
    read(stream, buffer, offset, length, position) {
      var contents = stream.node.contents;
      if (position >= stream.node.usedBytes) return 0;
      var size = Math.min(stream.node.usedBytes - position, length);
      if (size > 8 && contents.subarray) {
        buffer.set(contents.subarray(position, position + size), offset);
      } else {
        for (var i = 0; i < size; i++) buffer[offset + i] = contents[position + i];
      }
      return size;
    },
    write(stream, buffer, offset, length, position, canOwn) {
      if (buffer.buffer === HEAP8.buffer) {
        canOwn = false;
      }
      if (!length) return 0;
      var node = stream.node;
      node.mtime = node.ctime = Date.now();
      if (buffer.subarray && (!node.contents || node.contents.subarray)) {
        if (canOwn) {
          node.contents = buffer.subarray(offset, offset + length);
          node.usedBytes = length;
          return length;
        } else if (node.usedBytes === 0 && position === 0) {
          node.contents = buffer.slice(offset, offset + length);
          node.usedBytes = length;
          return length;
        } else if (position + length <= node.usedBytes) {
          node.contents.set(buffer.subarray(offset, offset + length), position);
          return length;
        }
      }
      MEMFS.expandFileStorage(node, position + length);
      if (node.contents.subarray && buffer.subarray) {
        node.contents.set(buffer.subarray(offset, offset + length), position);
      } else {
        for (var i = 0; i < length; i++) {
          node.contents[position + i] = buffer[offset + i];
        }
      }
      node.usedBytes = Math.max(node.usedBytes, position + length);
      return length;
    },
    llseek(stream, offset, whence) {
      var position = offset;
      if (whence === 1) {
        position += stream.position;
      } else if (whence === 2) {
        if (FS.isFile(stream.node.mode)) {
          position += stream.node.usedBytes;
        }
      }
      if (position < 0) {
        throw new FS.ErrnoError(28);
      }
      return position;
    },
    mmap(stream, length, position, prot, flags) {
      if (!FS.isFile(stream.node.mode)) {
        throw new FS.ErrnoError(43);
      }
      var ptr;
      var allocated;
      var contents = stream.node.contents;
      if (!(flags & 2) && contents && contents.buffer === HEAP8.buffer) {
        allocated = false;
        ptr = contents.byteOffset;
      } else {
        allocated = true;
        ptr = mmapAlloc(length);
        if (!ptr) {
          throw new FS.ErrnoError(48);
        }
        if (contents) {
          if (position > 0 || position + length < contents.length) {
            if (contents.subarray) {
              contents = contents.subarray(position, position + length);
            } else {
              contents = Array.prototype.slice.call(contents, position, position + length);
            }
          }
          HEAP8.set(contents, ptr);
        }
      }
      return { ptr, allocated };
    },
    msync(stream, buffer, offset, length, mmapFlags) {
      MEMFS.stream_ops.write(stream, buffer, 0, length, offset, false);
      return 0;
    }
  }
};
var FS_modeStringToFlags = (str) => {
  var flagModes = { r: 0, "r+": 2, w: 512 | 64 | 1, "w+": 512 | 64 | 2, a: 1024 | 64 | 1, "a+": 1024 | 64 | 2 };
  var flags = flagModes[str];
  if (typeof flags == "undefined") {
    throw new Error(`Unknown file open mode: ${str}`);
  }
  return flags;
};
var FS_getMode = (canRead, canWrite) => {
  var mode = 0;
  if (canRead) mode |= 292 | 73;
  if (canWrite) mode |= 146;
  return mode;
};
var IDBFS = {
  dbs: {},
  indexedDB: () => indexedDB,
  DB_VERSION: 21,
  DB_STORE_NAME: "FILE_DATA",
  queuePersist: (mount) => {
    function onPersistComplete() {
      if (mount.idbPersistState === "again") startPersist();
      else mount.idbPersistState = 0;
    }
    function startPersist() {
      mount.idbPersistState = "idb";
      IDBFS.syncfs(mount, false, onPersistComplete);
    }
    if (!mount.idbPersistState) {
      mount.idbPersistState = setTimeout(startPersist, 0);
    } else if (mount.idbPersistState === "idb") {
      mount.idbPersistState = "again";
    }
  },
  mount: (mount) => {
    var mnt = MEMFS.mount(mount);
    if (mount?.opts?.autoPersist) {
      mount.idbPersistState = 0;
      var memfs_node_ops = mnt.node_ops;
      mnt.node_ops = { ...mnt.node_ops };
      mnt.node_ops.mknod = (parent, name, mode, dev) => {
        var node = memfs_node_ops.mknod(parent, name, mode, dev);
        node.node_ops = mnt.node_ops;
        node.idbfs_mount = mnt.mount;
        node.memfs_stream_ops = node.stream_ops;
        node.stream_ops = { ...node.stream_ops };
        node.stream_ops.write = (stream, buffer, offset, length, position, canOwn) => {
          stream.node.isModified = true;
          return node.memfs_stream_ops.write(stream, buffer, offset, length, position, canOwn);
        };
        node.stream_ops.close = (stream) => {
          var n = stream.node;
          if (n.isModified) {
            IDBFS.queuePersist(n.idbfs_mount);
            n.isModified = false;
          }
          if (n.memfs_stream_ops.close) return n.memfs_stream_ops.close(stream);
        };
        IDBFS.queuePersist(mnt.mount);
        return node;
      };
      mnt.node_ops.rmdir = (...args) => (IDBFS.queuePersist(mnt.mount), memfs_node_ops.rmdir(...args));
      mnt.node_ops.symlink = (...args) => (IDBFS.queuePersist(mnt.mount), memfs_node_ops.symlink(...args));
      mnt.node_ops.unlink = (...args) => (IDBFS.queuePersist(mnt.mount), memfs_node_ops.unlink(...args));
      mnt.node_ops.rename = (...args) => (IDBFS.queuePersist(mnt.mount), memfs_node_ops.rename(...args));
    }
    return mnt;
  },
  syncfs: (mount, populate, callback) => {
    const fn = (callback) => {
      IDBFS.getLocalSet(mount, (err, local) => {
        if (err) return callback(err);
        IDBFS.getRemoteSet(mount, (err, remote) => {
          if (err) return callback(err);
          var src = populate ? remote : local;
          var dst = populate ? local : remote;
          IDBFS.reconcile(src, dst, callback);
        });
      });
    };

    if (window.syncfs !== undefined) window.syncfs(IDBFS, mount, populate, callback, fn);
    else fn(callback);
  },
  quit: () => {
    for (var value of Object.values(IDBFS.dbs)) {
      value.close();
    }
    IDBFS.dbs = {};
  },
  getDB: (name, callback) => {
    var db = IDBFS.dbs[name];
    if (db) {
      return callback(null, db);
    }
    var req;
    try {
      req = IDBFS.indexedDB().open(name, IDBFS.DB_VERSION);
    } catch (e) {
      return callback(e);
    }
    if (!req) {
      return callback("Unable to connect to IndexedDB");
    }
    req.onupgradeneeded = (e) => {
      var db = e.target.result;
      var transaction = e.target.transaction;
      var fileStore;
      if (db.objectStoreNames.contains(IDBFS.DB_STORE_NAME)) {
        fileStore = transaction.objectStore(IDBFS.DB_STORE_NAME);
      } else {
        fileStore = db.createObjectStore(IDBFS.DB_STORE_NAME);
      }
      if (!fileStore.indexNames.contains("timestamp")) {
        fileStore.createIndex("timestamp", "timestamp", { unique: false });
      }
    };
    req.onsuccess = () => {
      db = req.result;
      IDBFS.dbs[name] = db;
      callback(null, db);
    };
    req.onerror = (e) => {
      callback(e.target.error);
      e.preventDefault();
    };
  },
  getLocalSet: (mount, callback) => {
    var entries = {};
    function isRealDir(p) {
      return p !== "." && p !== "..";
    }
    function toAbsolute(root) {
      return (p) => PATH.join2(root, p);
    }
    var check = FS.readdir(mount.mountpoint).filter(isRealDir).map(toAbsolute(mount.mountpoint));
    while (check.length) {
      var path = check.pop();
      var stat;
      try {
        stat = FS.stat(path);
      } catch (e) {
        return callback(e);
      }
      if (FS.isDir(stat.mode)) {
        check.push(...FS.readdir(path).filter(isRealDir).map(toAbsolute(path)));
      }
      entries[path] = { timestamp: stat.mtime };
    }
    return callback(null, { type: "local", entries });
  },
  getRemoteSet: (mount, callback) => {
    var entries = {};
    IDBFS.getDB(mount.mountpoint, (err, db) => {
      if (err) return callback(err);
      try {
        var transaction = db.transaction([IDBFS.DB_STORE_NAME], "readonly");
        transaction.onerror = (e) => {
          callback(e.target.error);
          e.preventDefault();
        };
        var store = transaction.objectStore(IDBFS.DB_STORE_NAME);
        var index = store.index("timestamp");
        index.openKeyCursor().onsuccess = (event) => {
          var cursor = event.target.result;
          if (!cursor) {
            return callback(null, { type: "remote", db, entries });
          }
          entries[cursor.primaryKey] = { timestamp: cursor.key };
          cursor.continue();
        };
      } catch (e) {
        return callback(e);
      }
    });
  },
  loadLocalEntry: (path, callback) => {
    var stat, node;
    try {
      var lookup = FS.lookupPath(path);
      node = lookup.node;
      stat = FS.stat(path);
    } catch (e) {
      return callback(e);
    }
    if (FS.isDir(stat.mode)) {
      return callback(null, { timestamp: stat.mtime, mode: stat.mode });
    } else if (FS.isFile(stat.mode)) {
      node.contents = MEMFS.getFileDataAsTypedArray(node);
      return callback(null, { timestamp: stat.mtime, mode: stat.mode, contents: node.contents });
    } else {
      return callback(new Error("node type not supported"));
    }
  },
  storeLocalEntry: (path, entry, callback) => {
    try {
      if (FS.isDir(entry["mode"])) {
        FS.mkdirTree(path, entry["mode"]);
      } else if (FS.isFile(entry["mode"])) {
        FS.writeFile(path, entry["contents"], { canOwn: true });
      } else {
        return callback(new Error("node type not supported"));
      }
      FS.chmod(path, entry["mode"]);
      FS.utime(path, entry["timestamp"], entry["timestamp"]);
    } catch (e) {
      return callback(e);
    }
    callback(null);
  },
  removeLocalEntry: (path, callback) => {
    try {
      var stat = FS.stat(path);
      if (FS.isDir(stat.mode)) {
        FS.rmdir(path);
      } else if (FS.isFile(stat.mode)) {
        FS.unlink(path);
      }
    } catch (e) {
      return callback(e);
    }
    callback(null);
  },
  loadRemoteEntry: (store, path, callback) => {
    var req = store.get(path);
    req.onsuccess = (event) => callback(null, event.target.result);
    req.onerror = (e) => {
      callback(e.target.error);
      e.preventDefault();
    };
  },
  storeRemoteEntry: (store, path, entry, callback) => {
    try {
      var req = store.put(entry, path);
    } catch (e) {
      callback(e);
      return;
    }
    req.onsuccess = (event) => callback();
    req.onerror = (e) => {
      callback(e.target.error);
      e.preventDefault();
    };
  },
  removeRemoteEntry: (store, path, callback) => {
    var req = store.delete(path);
    req.onsuccess = (event) => callback();
    req.onerror = (e) => {
      callback(e.target.error);
      e.preventDefault();
    };
  },
  reconcile: (src, dst, callback) => {
    var total = 0;
    var create = [];
    for (var [key, e] of Object.entries(src.entries)) {
      var e2 = dst.entries[key];
      if (!e2 || e["timestamp"].getTime() != e2["timestamp"].getTime()) {
        create.push(key);
        total++;
      }
    }
    var remove = [];
    for (var key of Object.keys(dst.entries)) {
      if (!src.entries[key]) {
        remove.push(key);
        total++;
      }
    }
    if (!total) {
      return callback(null);
    }
    var errored = false;
    var db = src.type === "remote" ? src.db : dst.db;
    var transaction = db.transaction([IDBFS.DB_STORE_NAME], "readwrite");
    var store = transaction.objectStore(IDBFS.DB_STORE_NAME);
    function done(err) {
      if (err && !errored) {
        errored = true;
        return callback(err);
      }
    }
    transaction.onerror = transaction.onabort = (e) => {
      done(e.target.error);
      e.preventDefault();
    };
    transaction.oncomplete = (e) => {
      if (!errored) {
        callback(null);
      }
    };
    for (const path of create.sort()) {
      if (dst.type === "local") {
        IDBFS.loadRemoteEntry(store, path, (err, entry) => {
          if (err) return done(err);
          IDBFS.storeLocalEntry(path, entry, done);
        });
      } else {
        IDBFS.loadLocalEntry(path, (err, entry) => {
          if (err) return done(err);
          IDBFS.storeRemoteEntry(store, path, entry, done);
        });
      }
    }
    for (var path of remove.sort().reverse()) {
      if (dst.type === "local") {
        IDBFS.removeLocalEntry(path, done);
      } else {
        IDBFS.removeRemoteEntry(store, path, done);
      }
    }
  }
};
var asyncLoad = async (url) => {
  var arrayBuffer = await readAsync(url);
  return new Uint8Array(arrayBuffer);
};
var FS_createDataFile = (...args) => FS.createDataFile(...args);
var getUniqueRunDependency = (id) => id;
var preloadPlugins = [];
var FS_handledByPreloadPlugin = async (byteArray, fullname) => {
  if (typeof Browser != "undefined") Browser.init();
  for (var plugin of preloadPlugins) {
    if (plugin["canHandle"](fullname)) {
      return plugin["handle"](byteArray, fullname);
    }
  }
  return byteArray;
};
var FS_preloadFile = async (parent, name, url, canRead, canWrite, dontCreateFile, canOwn, preFinish) => {
  var fullname = name ? PATH_FS.resolve(PATH.join2(parent, name)) : parent;
  var dep = getUniqueRunDependency(`cp ${fullname}`);
  addRunDependency(dep);
  try {
    var byteArray = url;
    if (typeof url == "string") {
      byteArray = await asyncLoad(url);
    }
    byteArray = await FS_handledByPreloadPlugin(byteArray, fullname);
    preFinish?.();
    if (!dontCreateFile) {
      FS_createDataFile(parent, name, byteArray, canRead, canWrite, canOwn);
    }
  } finally {
    removeRunDependency(dep);
  }
};
var FS_createPreloadedFile = (
  parent,
  name,
  url,
  canRead,
  canWrite,
  onload,
  onerror,
  dontCreateFile,
  canOwn,
  preFinish
) => {
  FS_preloadFile(parent, name, url, canRead, canWrite, dontCreateFile, canOwn, preFinish).then(onload).catch(onerror);
};
var FS = {
  root: null,
  mounts: [],
  devices: {},
  streams: [],
  nextInode: 1,
  nameTable: null,
  currentPath: "/",
  initialized: false,
  ignorePermissions: true,
  filesystems: null,
  syncFSRequests: 0,
  readFiles: {},
  ErrnoError: class {
    name = "ErrnoError";
    constructor(errno) {
      this.errno = errno;
    }
  },
  FSStream: class {
    shared = {};
    get object() {
      return this.node;
    }
    set object(val) {
      this.node = val;
    }
    get isRead() {
      return (this.flags & 2097155) !== 1;
    }
    get isWrite() {
      return (this.flags & 2097155) !== 0;
    }
    get isAppend() {
      return this.flags & 1024;
    }
    get flags() {
      return this.shared.flags;
    }
    set flags(val) {
      this.shared.flags = val;
    }
    get position() {
      return this.shared.position;
    }
    set position(val) {
      this.shared.position = val;
    }
  },
  FSNode: class {
    node_ops = {};
    stream_ops = {};
    readMode = 292 | 73;
    writeMode = 146;
    mounted = null;
    constructor(parent, name, mode, rdev) {
      if (!parent) {
        parent = this;
      }
      this.parent = parent;
      this.mount = parent.mount;
      this.id = FS.nextInode++;
      this.name = name;
      this.mode = mode;
      this.rdev = rdev;
      this.atime = this.mtime = this.ctime = Date.now();
    }
    get read() {
      return (this.mode & this.readMode) === this.readMode;
    }
    set read(val) {
      val ? (this.mode |= this.readMode) : (this.mode &= ~this.readMode);
    }
    get write() {
      return (this.mode & this.writeMode) === this.writeMode;
    }
    set write(val) {
      val ? (this.mode |= this.writeMode) : (this.mode &= ~this.writeMode);
    }
    get isFolder() {
      return FS.isDir(this.mode);
    }
    get isDevice() {
      return FS.isChrdev(this.mode);
    }
  },
  lookupPath(path, opts = {}) {
    if (!path) {
      throw new FS.ErrnoError(44);
    }
    opts.follow_mount ??= true;
    if (!PATH.isAbs(path)) {
      path = FS.cwd() + "/" + path;
    }
    linkloop: for (var nlinks = 0; nlinks < 40; nlinks++) {
      var parts = path.split("/").filter((p) => !!p);
      var current = FS.root;
      var current_path = "/";
      for (var i = 0; i < parts.length; i++) {
        var islast = i === parts.length - 1;
        if (islast && opts.parent) {
          break;
        }
        if (parts[i] === ".") {
          continue;
        }
        if (parts[i] === "..") {
          current_path = PATH.dirname(current_path);
          if (FS.isRoot(current)) {
            path = current_path + "/" + parts.slice(i + 1).join("/");
            nlinks--;
            continue linkloop;
          } else {
            current = current.parent;
          }
          continue;
        }
        current_path = PATH.join2(current_path, parts[i]);
        try {
          current = FS.lookupNode(current, parts[i]);
        } catch (e) {
          if (e?.errno === 44 && islast && opts.noent_okay) {
            return { path: current_path };
          }
          throw e;
        }
        if (FS.isMountpoint(current) && (!islast || opts.follow_mount)) {
          current = current.mounted.root;
        }
        if (FS.isLink(current.mode) && (!islast || opts.follow)) {
          if (!current.node_ops.readlink) {
            throw new FS.ErrnoError(52);
          }
          var link = current.node_ops.readlink(current);
          if (!PATH.isAbs(link)) {
            link = PATH.dirname(current_path) + "/" + link;
          }
          path = link + "/" + parts.slice(i + 1).join("/");
          continue linkloop;
        }
      }
      return { path: current_path, node: current };
    }
    throw new FS.ErrnoError(32);
  },
  getPath(node) {
    var path;
    while (true) {
      if (FS.isRoot(node)) {
        var mount = node.mount.mountpoint;
        if (!path) return mount;
        return mount[mount.length - 1] !== "/" ? `${mount}/${path}` : mount + path;
      }
      path = path ? `${node.name}/${path}` : node.name;
      node = node.parent;
    }
  },
  hashName(parentid, name) {
    var hash = 0;
    name = name.toLowerCase();
    for (var i = 0; i < name.length; i++) {
      hash = ((hash << 5) - hash + name.charCodeAt(i)) | 0;
    }
    return ((parentid + hash) >>> 0) % FS.nameTable.length;
  },
  hashAddNode(node) {
    var hash = FS.hashName(node.parent.id, node.name);
    node.name_next = FS.nameTable[hash];
    FS.nameTable[hash] = node;
  },
  hashRemoveNode(node) {
    var hash = FS.hashName(node.parent.id, node.name);
    if (FS.nameTable[hash] === node) {
      FS.nameTable[hash] = node.name_next;
    } else {
      var current = FS.nameTable[hash];
      while (current) {
        if (current.name_next === node) {
          current.name_next = node.name_next;
          break;
        }
        current = current.name_next;
      }
    }
  },
  lookupNode(parent, name) {
    var errCode = FS.mayLookup(parent);
    if (errCode) {
      throw new FS.ErrnoError(errCode);
    }
    var hash = FS.hashName(parent.id, name);
    name = name.toLowerCase();
    for (var node = FS.nameTable[hash]; node; node = node.name_next) {
      var nodeName = node.name;
      nodeName = nodeName.toLowerCase();
      if (node.parent.id === parent.id && nodeName === name) {
        return node;
      }
    }
    return FS.lookup(parent, name);
  },
  createNode(parent, name, mode, rdev) {
    var node = new FS.FSNode(parent, name, mode, rdev);
    FS.hashAddNode(node);
    return node;
  },
  destroyNode(node) {
    FS.hashRemoveNode(node);
  },
  isRoot(node) {
    return node === node.parent;
  },
  isMountpoint(node) {
    return !!node.mounted;
  },
  isFile(mode) {
    return (mode & 61440) === 32768;
  },
  isDir(mode) {
    return (mode & 61440) === 16384;
  },
  isLink(mode) {
    return (mode & 61440) === 40960;
  },
  isChrdev(mode) {
    return (mode & 61440) === 8192;
  },
  isBlkdev(mode) {
    return (mode & 61440) === 24576;
  },
  isFIFO(mode) {
    return (mode & 61440) === 4096;
  },
  isSocket(mode) {
    return (mode & 49152) === 49152;
  },
  flagsToPermissionString(flag) {
    var perms = ["r", "w", "rw"][flag & 3];
    if (flag & 512) {
      perms += "w";
    }
    return perms;
  },
  nodePermissions(node, perms) {
    if (FS.ignorePermissions) {
      return 0;
    }
    if (perms.includes("r") && !(node.mode & 292)) {
      return 2;
    } else if (perms.includes("w") && !(node.mode & 146)) {
      return 2;
    } else if (perms.includes("x") && !(node.mode & 73)) {
      return 2;
    }
    return 0;
  },
  mayLookup(dir) {
    if (!FS.isDir(dir.mode)) return 54;
    var errCode = FS.nodePermissions(dir, "x");
    if (errCode) return errCode;
    if (!dir.node_ops.lookup) return 2;
    return 0;
  },
  mayCreate(dir, name) {
    if (!FS.isDir(dir.mode)) {
      return 54;
    }
    try {
      var node = FS.lookupNode(dir, name);
      return 20;
    } catch (e) {}
    return FS.nodePermissions(dir, "wx");
  },
  mayDelete(dir, name, isdir) {
    var node;
    try {
      node = FS.lookupNode(dir, name);
    } catch (e) {
      return e.errno;
    }
    var errCode = FS.nodePermissions(dir, "wx");
    if (errCode) {
      return errCode;
    }
    if (isdir) {
      if (!FS.isDir(node.mode)) {
        return 54;
      }
      if (FS.isRoot(node) || FS.getPath(node) === FS.cwd()) {
        return 10;
      }
    } else {
      if (FS.isDir(node.mode)) {
        return 31;
      }
    }
    return 0;
  },
  mayOpen(node, flags) {
    if (!node) {
      return 44;
    }
    if (FS.isLink(node.mode)) {
      return 32;
    } else if (FS.isDir(node.mode)) {
      if (FS.flagsToPermissionString(flags) !== "r" || flags & (512 | 64)) {
        return 31;
      }
    }
    return FS.nodePermissions(node, FS.flagsToPermissionString(flags));
  },
  checkOpExists(op, err) {
    if (!op) {
      throw new FS.ErrnoError(err);
    }
    return op;
  },
  MAX_OPEN_FDS: 4096,
  nextfd() {
    for (var fd = 0; fd <= FS.MAX_OPEN_FDS; fd++) {
      if (!FS.streams[fd]) {
        return fd;
      }
    }
    throw new FS.ErrnoError(33);
  },
  getStreamChecked(fd) {
    var stream = FS.getStream(fd);
    if (!stream) {
      throw new FS.ErrnoError(8);
    }
    return stream;
  },
  getStream: (fd) => FS.streams[fd],
  createStream(stream, fd = -1) {
    stream = Object.assign(new FS.FSStream(), stream);
    if (fd == -1) {
      fd = FS.nextfd();
    }
    stream.fd = fd;
    FS.streams[fd] = stream;
    return stream;
  },
  closeStream(fd) {
    FS.streams[fd] = null;
  },
  dupStream(origStream, fd = -1) {
    var stream = FS.createStream(origStream, fd);
    stream.stream_ops?.dup?.(stream);
    return stream;
  },
  doSetAttr(stream, node, attr) {
    var setattr = stream?.stream_ops.setattr;
    var arg = setattr ? stream : node;
    setattr ??= node.node_ops.setattr;
    FS.checkOpExists(setattr, 63);
    setattr(arg, attr);
  },
  chrdev_stream_ops: {
    open(stream) {
      var device = FS.getDevice(stream.node.rdev);
      stream.stream_ops = device.stream_ops;
      stream.stream_ops.open?.(stream);
    },
    llseek() {
      throw new FS.ErrnoError(70);
    }
  },
  major: (dev) => dev >> 8,
  minor: (dev) => dev & 255,
  makedev: (ma, mi) => (ma << 8) | mi,
  registerDevice(dev, ops) {
    FS.devices[dev] = { stream_ops: ops };
  },
  getDevice: (dev) => FS.devices[dev],
  getMounts(mount) {
    var mounts = [];
    var check = [mount];
    while (check.length) {
      var m = check.pop();
      mounts.push(m);
      check.push(...m.mounts);
    }
    return mounts;
  },
  syncfs(populate, callback) {
    if (typeof populate == "function") {
      callback = populate;
      populate = false;
    }
    FS.syncFSRequests++;
    if (FS.syncFSRequests > 1) {
      err(`warning: ${FS.syncFSRequests} FS.syncfs operations in flight at once, probably just doing extra work`);
    }
    var mounts = FS.getMounts(FS.root.mount);
    var completed = 0;
    function doCallback(errCode) {
      FS.syncFSRequests--;
      return callback(errCode);
    }
    function done(errCode) {
      if (errCode) {
        if (!done.errored) {
          done.errored = true;
          return doCallback(errCode);
        }
        return;
      }
      if (++completed >= mounts.length) {
        doCallback(null);
      }
    }
    for (var mount of mounts) {
      if (mount.type.syncfs) {
        mount.type.syncfs(mount, populate, done);
      } else {
        done(null);
      }
    }
  },
  mount(type, opts, mountpoint) {
    var root = mountpoint === "/";
    var pseudo = !mountpoint;
    var node;
    if (root && FS.root) {
      throw new FS.ErrnoError(10);
    } else if (!root && !pseudo) {
      var lookup = FS.lookupPath(mountpoint, { follow_mount: false });
      mountpoint = lookup.path;
      node = lookup.node;
      if (FS.isMountpoint(node)) {
        throw new FS.ErrnoError(10);
      }
      if (!FS.isDir(node.mode)) {
        throw new FS.ErrnoError(54);
      }
    }
    var mount = { type, opts, mountpoint, mounts: [] };
    var mountRoot = type.mount(mount);
    mountRoot.mount = mount;
    mount.root = mountRoot;
    if (root) {
      FS.root = mountRoot;
    } else if (node) {
      node.mounted = mount;
      if (node.mount) {
        node.mount.mounts.push(mount);
      }
    }
    return mountRoot;
  },
  unmount(mountpoint) {
    var lookup = FS.lookupPath(mountpoint, { follow_mount: false });
    if (!FS.isMountpoint(lookup.node)) {
      throw new FS.ErrnoError(28);
    }
    var node = lookup.node;
    var mount = node.mounted;
    var mounts = FS.getMounts(mount);
    for (var [hash, current] of Object.entries(FS.nameTable)) {
      while (current) {
        var next = current.name_next;
        if (mounts.includes(current.mount)) {
          FS.destroyNode(current);
        }
        current = next;
      }
    }
    node.mounted = null;
    var idx = node.mount.mounts.indexOf(mount);
    node.mount.mounts.splice(idx, 1);
  },
  lookup(parent, name) {
    return parent.node_ops.lookup(parent, name);
  },
  mknod(path, mode, dev) {
    var lookup = FS.lookupPath(path, { parent: true });
    var parent = lookup.node;
    var name = PATH.basename(path);
    if (!name) {
      throw new FS.ErrnoError(28);
    }
    if (name === "." || name === "..") {
      throw new FS.ErrnoError(20);
    }
    var errCode = FS.mayCreate(parent, name);
    if (errCode) {
      throw new FS.ErrnoError(errCode);
    }
    if (!parent.node_ops.mknod) {
      throw new FS.ErrnoError(63);
    }
    return parent.node_ops.mknod(parent, name, mode, dev);
  },
  statfs(path) {
    return FS.statfsNode(FS.lookupPath(path, { follow: true }).node);
  },
  statfsStream(stream) {
    return FS.statfsNode(stream.node);
  },
  statfsNode(node) {
    var rtn = {
      bsize: 4096,
      frsize: 4096,
      blocks: 1e6,
      bfree: 5e5,
      bavail: 5e5,
      files: FS.nextInode,
      ffree: FS.nextInode - 1,
      fsid: 42,
      flags: 2,
      namelen: 255
    };
    if (node.node_ops.statfs) {
      Object.assign(rtn, node.node_ops.statfs(node.mount.opts.root));
    }
    return rtn;
  },
  create(path, mode = 438) {
    mode &= 4095;
    mode |= 32768;
    return FS.mknod(path, mode, 0);
  },
  mkdir(path, mode = 511) {
    mode &= 511 | 512;
    mode |= 16384;
    return FS.mknod(path, mode, 0);
  },
  mkdirTree(path, mode) {
    var dirs = path.split("/");
    var d = "";
    for (var dir of dirs) {
      if (!dir) continue;
      if (d || PATH.isAbs(path)) d += "/";
      d += dir;
      try {
        FS.mkdir(d, mode);
      } catch (e) {
        if (e.errno != 20) throw e;
      }
    }
  },
  mkdev(path, mode, dev) {
    if (typeof dev == "undefined") {
      dev = mode;
      mode = 438;
    }
    mode |= 8192;
    return FS.mknod(path, mode, dev);
  },
  symlink(oldpath, newpath) {
    if (!PATH_FS.resolve(oldpath)) {
      throw new FS.ErrnoError(44);
    }
    var lookup = FS.lookupPath(newpath, { parent: true });
    var parent = lookup.node;
    if (!parent) {
      throw new FS.ErrnoError(44);
    }
    var newname = PATH.basename(newpath);
    var errCode = FS.mayCreate(parent, newname);
    if (errCode) {
      throw new FS.ErrnoError(errCode);
    }
    if (!parent.node_ops.symlink) {
      throw new FS.ErrnoError(63);
    }
    return parent.node_ops.symlink(parent, newname, oldpath);
  },
  rename(old_path, new_path) {
    var old_dirname = PATH.dirname(old_path);
    var new_dirname = PATH.dirname(new_path);
    var old_name = PATH.basename(old_path);
    var new_name = PATH.basename(new_path);
    var lookup, old_dir, new_dir;
    lookup = FS.lookupPath(old_path, { parent: true });
    old_dir = lookup.node;
    lookup = FS.lookupPath(new_path, { parent: true });
    new_dir = lookup.node;
    if (!old_dir || !new_dir) throw new FS.ErrnoError(44);
    if (old_dir.mount !== new_dir.mount) {
      throw new FS.ErrnoError(75);
    }
    var old_node = FS.lookupNode(old_dir, old_name);
    var relative = PATH_FS.relative(old_path, new_dirname);
    if (relative.charAt(0) !== ".") {
      throw new FS.ErrnoError(28);
    }
    relative = PATH_FS.relative(new_path, old_dirname);
    if (relative.charAt(0) !== ".") {
      throw new FS.ErrnoError(55);
    }
    var new_node;
    try {
      new_node = FS.lookupNode(new_dir, new_name);
    } catch (e) {}
    if (old_node === new_node) {
      return;
    }
    var isdir = FS.isDir(old_node.mode);
    var errCode = FS.mayDelete(old_dir, old_name, isdir);
    if (errCode) {
      throw new FS.ErrnoError(errCode);
    }
    errCode = new_node ? FS.mayDelete(new_dir, new_name, isdir) : FS.mayCreate(new_dir, new_name);
    if (errCode) {
      throw new FS.ErrnoError(errCode);
    }
    if (!old_dir.node_ops.rename) {
      throw new FS.ErrnoError(63);
    }
    if (FS.isMountpoint(old_node) || (new_node && FS.isMountpoint(new_node))) {
      throw new FS.ErrnoError(10);
    }
    if (new_dir !== old_dir) {
      errCode = FS.nodePermissions(old_dir, "w");
      if (errCode) {
        throw new FS.ErrnoError(errCode);
      }
    }
    FS.hashRemoveNode(old_node);
    try {
      old_dir.node_ops.rename(old_node, new_dir, new_name);
      old_node.parent = new_dir;
    } catch (e) {
      throw e;
    } finally {
      FS.hashAddNode(old_node);
    }
  },
  rmdir(path) {
    var lookup = FS.lookupPath(path, { parent: true });
    var parent = lookup.node;
    var name = PATH.basename(path);
    var node = FS.lookupNode(parent, name);
    var errCode = FS.mayDelete(parent, name, true);
    if (errCode) {
      throw new FS.ErrnoError(errCode);
    }
    if (!parent.node_ops.rmdir) {
      throw new FS.ErrnoError(63);
    }
    if (FS.isMountpoint(node)) {
      throw new FS.ErrnoError(10);
    }
    parent.node_ops.rmdir(parent, name);
    FS.destroyNode(node);
  },
  readdir(path) {
    var lookup = FS.lookupPath(path, { follow: true });
    var node = lookup.node;
    var readdir = FS.checkOpExists(node.node_ops.readdir, 54);
    return readdir(node);
  },
  unlink(path) {
    var lookup = FS.lookupPath(path, { parent: true });
    var parent = lookup.node;
    if (!parent) {
      throw new FS.ErrnoError(44);
    }
    var name = PATH.basename(path);
    var node = FS.lookupNode(parent, name);
    var errCode = FS.mayDelete(parent, name, false);
    if (errCode) {
      throw new FS.ErrnoError(errCode);
    }
    if (!parent.node_ops.unlink) {
      throw new FS.ErrnoError(63);
    }
    if (FS.isMountpoint(node)) {
      throw new FS.ErrnoError(10);
    }
    parent.node_ops.unlink(parent, name);
    FS.destroyNode(node);
  },
  readlink(path) {
    var lookup = FS.lookupPath(path);
    var link = lookup.node;
    if (!link) {
      throw new FS.ErrnoError(44);
    }
    if (!link.node_ops.readlink) {
      throw new FS.ErrnoError(28);
    }
    return link.node_ops.readlink(link);
  },
  stat(path, dontFollow) {
    var lookup = FS.lookupPath(path, { follow: !dontFollow });
    var node = lookup.node;
    var getattr = FS.checkOpExists(node.node_ops.getattr, 63);
    return getattr(node);
  },
  fstat(fd) {
    var stream = FS.getStreamChecked(fd);
    var node = stream.node;
    var getattr = stream.stream_ops.getattr;
    var arg = getattr ? stream : node;
    getattr ??= node.node_ops.getattr;
    FS.checkOpExists(getattr, 63);
    return getattr(arg);
  },
  lstat(path) {
    return FS.stat(path, true);
  },
  doChmod(stream, node, mode, dontFollow) {
    FS.doSetAttr(stream, node, { mode: (mode & 4095) | (node.mode & ~4095), ctime: Date.now(), dontFollow });
  },
  chmod(path, mode, dontFollow) {
    var node;
    if (typeof path == "string") {
      var lookup = FS.lookupPath(path, { follow: !dontFollow });
      node = lookup.node;
    } else {
      node = path;
    }
    FS.doChmod(null, node, mode, dontFollow);
  },
  lchmod(path, mode) {
    FS.chmod(path, mode, true);
  },
  fchmod(fd, mode) {
    var stream = FS.getStreamChecked(fd);
    FS.doChmod(stream, stream.node, mode, false);
  },
  doChown(stream, node, dontFollow) {
    FS.doSetAttr(stream, node, { timestamp: Date.now(), dontFollow });
  },
  chown(path, uid, gid, dontFollow) {
    var node;
    if (typeof path == "string") {
      var lookup = FS.lookupPath(path, { follow: !dontFollow });
      node = lookup.node;
    } else {
      node = path;
    }
    FS.doChown(null, node, dontFollow);
  },
  lchown(path, uid, gid) {
    FS.chown(path, uid, gid, true);
  },
  fchown(fd, uid, gid) {
    var stream = FS.getStreamChecked(fd);
    FS.doChown(stream, stream.node, false);
  },
  doTruncate(stream, node, len) {
    if (FS.isDir(node.mode)) {
      throw new FS.ErrnoError(31);
    }
    if (!FS.isFile(node.mode)) {
      throw new FS.ErrnoError(28);
    }
    var errCode = FS.nodePermissions(node, "w");
    if (errCode) {
      throw new FS.ErrnoError(errCode);
    }
    FS.doSetAttr(stream, node, { size: len, timestamp: Date.now() });
  },
  truncate(path, len) {
    if (len < 0) {
      throw new FS.ErrnoError(28);
    }
    var node;
    if (typeof path == "string") {
      var lookup = FS.lookupPath(path, { follow: true });
      node = lookup.node;
    } else {
      node = path;
    }
    FS.doTruncate(null, node, len);
  },
  ftruncate(fd, len) {
    var stream = FS.getStreamChecked(fd);
    if (len < 0 || (stream.flags & 2097155) === 0) {
      throw new FS.ErrnoError(28);
    }
    FS.doTruncate(stream, stream.node, len);
  },
  utime(path, atime, mtime) {
    var lookup = FS.lookupPath(path, { follow: true });
    var node = lookup.node;
    var setattr = FS.checkOpExists(node.node_ops.setattr, 63);
    setattr(node, { atime, mtime });
  },
  open(path, flags, mode = 438) {
    if (path === "") {
      throw new FS.ErrnoError(44);
    }
    flags = typeof flags == "string" ? FS_modeStringToFlags(flags) : flags;
    if (flags & 64) {
      mode = (mode & 4095) | 32768;
    } else {
      mode = 0;
    }
    var node;
    var isDirPath;
    if (typeof path == "object") {
      node = path;
    } else {
      isDirPath = path.endsWith("/");
      var lookup = FS.lookupPath(path, { follow: !(flags & 131072), noent_okay: true });
      node = lookup.node;
      path = lookup.path;
    }
    var created = false;
    if (flags & 64) {
      if (node) {
        if (flags & 128) {
          throw new FS.ErrnoError(20);
        }
      } else if (isDirPath) {
        throw new FS.ErrnoError(31);
      } else {
        node = FS.mknod(path, mode | 511, 0);
        created = true;
      }
    }
    if (!node) {
      throw new FS.ErrnoError(44);
    }
    if (FS.isChrdev(node.mode)) {
      flags &= ~512;
    }
    if (flags & 65536 && !FS.isDir(node.mode)) {
      throw new FS.ErrnoError(54);
    }
    if (!created) {
      var errCode = FS.mayOpen(node, flags);
      if (errCode) {
        throw new FS.ErrnoError(errCode);
      }
    }
    if (flags & 512 && !created) {
      FS.truncate(node, 0);
    }
    flags &= ~(128 | 512 | 131072);
    var stream = FS.createStream({
      node,
      path: FS.getPath(node),
      flags,
      seekable: true,
      position: 0,
      stream_ops: node.stream_ops,
      ungotten: [],
      error: false
    });
    if (stream.stream_ops.open) {
      stream.stream_ops.open(stream);
    }
    if (created) {
      FS.chmod(node, mode & 511);
    }
    if (Module["logReadFiles"] && !(flags & 1)) {
      if (!(path in FS.readFiles)) {
        FS.readFiles[path] = 1;
      }
    }
    return stream;
  },
  close(stream) {
    if (FS.isClosed(stream)) {
      throw new FS.ErrnoError(8);
    }
    if (stream.getdents) stream.getdents = null;
    try {
      if (stream.stream_ops.close) {
        stream.stream_ops.close(stream);
      }
    } catch (e) {
      throw e;
    } finally {
      FS.closeStream(stream.fd);
    }
    stream.fd = null;
  },
  isClosed(stream) {
    return stream.fd === null;
  },
  llseek(stream, offset, whence) {
    if (FS.isClosed(stream)) {
      throw new FS.ErrnoError(8);
    }
    if (!stream.seekable || !stream.stream_ops.llseek) {
      throw new FS.ErrnoError(70);
    }
    if (whence != 0 && whence != 1 && whence != 2) {
      throw new FS.ErrnoError(28);
    }
    stream.position = stream.stream_ops.llseek(stream, offset, whence);
    stream.ungotten = [];
    return stream.position;
  },
  read(stream, buffer, offset, length, position) {
    if (length < 0 || position < 0) {
      throw new FS.ErrnoError(28);
    }
    if (FS.isClosed(stream)) {
      throw new FS.ErrnoError(8);
    }
    if ((stream.flags & 2097155) === 1) {
      throw new FS.ErrnoError(8);
    }
    if (FS.isDir(stream.node.mode)) {
      throw new FS.ErrnoError(31);
    }
    if (!stream.stream_ops.read) {
      throw new FS.ErrnoError(28);
    }
    var seeking = typeof position != "undefined";
    if (!seeking) {
      position = stream.position;
    } else if (!stream.seekable) {
      throw new FS.ErrnoError(70);
    }
    var bytesRead = stream.stream_ops.read(stream, buffer, offset, length, position);
    if (!seeking) stream.position += bytesRead;
    return bytesRead;
  },
  write(stream, buffer, offset, length, position, canOwn) {
    if (length < 0 || position < 0) {
      throw new FS.ErrnoError(28);
    }
    if (FS.isClosed(stream)) {
      throw new FS.ErrnoError(8);
    }
    if ((stream.flags & 2097155) === 0) {
      throw new FS.ErrnoError(8);
    }
    if (FS.isDir(stream.node.mode)) {
      throw new FS.ErrnoError(31);
    }
    if (!stream.stream_ops.write) {
      throw new FS.ErrnoError(28);
    }
    if (stream.seekable && stream.flags & 1024) {
      FS.llseek(stream, 0, 2);
    }
    var seeking = typeof position != "undefined";
    if (!seeking) {
      position = stream.position;
    } else if (!stream.seekable) {
      throw new FS.ErrnoError(70);
    }
    var bytesWritten = stream.stream_ops.write(stream, buffer, offset, length, position, canOwn);
    if (!seeking) stream.position += bytesWritten;
    return bytesWritten;
  },
  mmap(stream, length, position, prot, flags) {
    if ((prot & 2) !== 0 && (flags & 2) === 0 && (stream.flags & 2097155) !== 2) {
      throw new FS.ErrnoError(2);
    }
    if ((stream.flags & 2097155) === 1) {
      throw new FS.ErrnoError(2);
    }
    if (!stream.stream_ops.mmap) {
      throw new FS.ErrnoError(43);
    }
    if (!length) {
      throw new FS.ErrnoError(28);
    }
    return stream.stream_ops.mmap(stream, length, position, prot, flags);
  },
  msync(stream, buffer, offset, length, mmapFlags) {
    if (!stream.stream_ops.msync) {
      return 0;
    }
    return stream.stream_ops.msync(stream, buffer, offset, length, mmapFlags);
  },
  ioctl(stream, cmd, arg) {
    if (!stream.stream_ops.ioctl) {
      throw new FS.ErrnoError(59);
    }
    return stream.stream_ops.ioctl(stream, cmd, arg);
  },
  readFile(path, opts = {}) {
    opts.flags = opts.flags || 0;
    opts.encoding = opts.encoding || "binary";
    if (opts.encoding !== "utf8" && opts.encoding !== "binary") {
      abort(`Invalid encoding type "${opts.encoding}"`);
    }
    var stream = FS.open(path, opts.flags);
    var stat = FS.stat(path);
    var length = stat.size;
    var buf = new Uint8Array(length);
    FS.read(stream, buf, 0, length, 0);
    if (opts.encoding === "utf8") {
      buf = UTF8ArrayToString(buf);
    }
    FS.close(stream);
    return buf;
  },
  writeFile(path, data, opts = {}) {
    opts.flags = opts.flags || 577;
    var stream = FS.open(path, opts.flags, opts.mode);
    if (typeof data == "string") {
      data = new Uint8Array(intArrayFromString(data, true));
    }
    if (ArrayBuffer.isView(data)) {
      FS.write(stream, data, 0, data.byteLength, undefined, opts.canOwn);
    } else {
      abort("Unsupported data type");
    }
    FS.close(stream);
  },
  cwd: () => FS.currentPath,
  chdir(path) {
    var lookup = FS.lookupPath(path, { follow: true });
    if (lookup.node === null) {
      throw new FS.ErrnoError(44);
    }
    if (!FS.isDir(lookup.node.mode)) {
      throw new FS.ErrnoError(54);
    }
    var errCode = FS.nodePermissions(lookup.node, "x");
    if (errCode) {
      throw new FS.ErrnoError(errCode);
    }
    FS.currentPath = lookup.path;
  },
  createDefaultDirectories() {
    FS.mkdir("/tmp");
    FS.mkdir("/home");
    FS.mkdir("/home/web_user");
  },
  createDefaultDevices() {
    FS.mkdir("/dev");
    FS.registerDevice(FS.makedev(1, 3), {
      read: () => 0,
      write: (stream, buffer, offset, length, pos) => length,
      llseek: () => 0
    });
    FS.mkdev("/dev/null", FS.makedev(1, 3));
    TTY.register(FS.makedev(5, 0), TTY.default_tty_ops);
    TTY.register(FS.makedev(6, 0), TTY.default_tty1_ops);
    FS.mkdev("/dev/tty", FS.makedev(5, 0));
    FS.mkdev("/dev/tty1", FS.makedev(6, 0));
    var randomBuffer = new Uint8Array(1024),
      randomLeft = 0;
    var randomByte = () => {
      if (randomLeft === 0) {
        randomFill(randomBuffer);
        randomLeft = randomBuffer.byteLength;
      }
      return randomBuffer[--randomLeft];
    };
    FS.createDevice("/dev", "random", randomByte);
    FS.createDevice("/dev", "urandom", randomByte);
    FS.mkdir("/dev/shm");
    FS.mkdir("/dev/shm/tmp");
  },
  createSpecialDirectories() {
    FS.mkdir("/proc");
    var proc_self = FS.mkdir("/proc/self");
    FS.mkdir("/proc/self/fd");
    FS.mount(
      {
        mount() {
          var node = FS.createNode(proc_self, "fd", 16895, 73);
          node.stream_ops = { llseek: MEMFS.stream_ops.llseek };
          node.node_ops = {
            lookup(parent, name) {
              var fd = +name;
              var stream = FS.getStreamChecked(fd);
              var ret = {
                parent: null,
                mount: { mountpoint: "fake" },
                node_ops: { readlink: () => stream.path },
                id: fd + 1
              };
              ret.parent = ret;
              return ret;
            },
            readdir() {
              return Array.from(FS.streams.entries())
                .filter(([k, v]) => v)
                .map(([k, v]) => k.toString());
            }
          };
          return node;
        }
      },
      {},
      "/proc/self/fd"
    );
  },
  createStandardStreams(input, output, error) {
    if (input) {
      FS.createDevice("/dev", "stdin", input);
    } else {
      FS.symlink("/dev/tty", "/dev/stdin");
    }
    if (output) {
      FS.createDevice("/dev", "stdout", null, output);
    } else {
      FS.symlink("/dev/tty", "/dev/stdout");
    }
    if (error) {
      FS.createDevice("/dev", "stderr", null, error);
    } else {
      FS.symlink("/dev/tty1", "/dev/stderr");
    }
    var stdin = FS.open("/dev/stdin", 0);
    var stdout = FS.open("/dev/stdout", 1);
    var stderr = FS.open("/dev/stderr", 1);
  },
  staticInit() {
    FS.nameTable = new Array(4096);
    FS.mount(MEMFS, {}, "/");
    FS.createDefaultDirectories();
    FS.createDefaultDevices();
    FS.createSpecialDirectories();
    FS.filesystems = { MEMFS, IDBFS };
  },
  init(input, output, error) {
    FS.initialized = true;
    input ??= Module["stdin"];
    output ??= Module["stdout"];
    error ??= Module["stderr"];
    FS.createStandardStreams(input, output, error);
  },
  quit() {
    FS.initialized = false;
    for (var stream of FS.streams) {
      if (stream) {
        FS.close(stream);
      }
    }
  },
  findObject(path, dontResolveLastLink) {
    var ret = FS.analyzePath(path, dontResolveLastLink);
    if (!ret.exists) {
      return null;
    }
    return ret.object;
  },
  analyzePath(path, dontResolveLastLink) {
    try {
      var lookup = FS.lookupPath(path, { follow: !dontResolveLastLink });
      path = lookup.path;
    } catch (e) {}
    var ret = {
      isRoot: false,
      exists: false,
      error: 0,
      name: null,
      path: null,
      object: null,
      parentExists: false,
      parentPath: null,
      parentObject: null
    };
    try {
      var lookup = FS.lookupPath(path, { parent: true });
      ret.parentExists = true;
      ret.parentPath = lookup.path;
      ret.parentObject = lookup.node;
      ret.name = PATH.basename(path);
      lookup = FS.lookupPath(path, { follow: !dontResolveLastLink });
      ret.exists = true;
      ret.path = lookup.path;
      ret.object = lookup.node;
      ret.name = lookup.node.name;
      ret.isRoot = lookup.path === "/";
    } catch (e) {
      ret.error = e.errno;
    }
    return ret;
  },
  createPath(parent, path, canRead, canWrite) {
    parent = typeof parent == "string" ? parent : FS.getPath(parent);
    var parts = path.split("/").reverse();
    while (parts.length) {
      var part = parts.pop();
      if (!part) continue;
      var current = PATH.join2(parent, part);
      try {
        FS.mkdir(current);
      } catch (e) {
        if (e.errno != 20) throw e;
      }
      parent = current;
    }
    return current;
  },
  createFile(parent, name, properties, canRead, canWrite) {
    var path = PATH.join2(typeof parent == "string" ? parent : FS.getPath(parent), name);
    var mode = FS_getMode(canRead, canWrite);
    return FS.create(path, mode);
  },
  createDataFile(parent, name, data, canRead, canWrite, canOwn) {
    var path = name;
    if (parent) {
      parent = typeof parent == "string" ? parent : FS.getPath(parent);
      path = name ? PATH.join2(parent, name) : parent;
    }
    var mode = FS_getMode(canRead, canWrite);
    var node = FS.create(path, mode);
    if (data) {
      if (typeof data == "string") {
        var arr = new Array(data.length);
        for (var i = 0, len = data.length; i < len; ++i) arr[i] = data.charCodeAt(i);
        data = arr;
      }
      FS.chmod(node, mode | 146);
      var stream = FS.open(node, 577);
      FS.write(stream, data, 0, data.length, 0, canOwn);
      FS.close(stream);
      FS.chmod(node, mode);
    }
  },
  createDevice(parent, name, input, output) {
    var path = PATH.join2(typeof parent == "string" ? parent : FS.getPath(parent), name);
    var mode = FS_getMode(!!input, !!output);
    FS.createDevice.major ??= 64;
    var dev = FS.makedev(FS.createDevice.major++, 0);
    FS.registerDevice(dev, {
      open(stream) {
        stream.seekable = false;
      },
      close(stream) {
        if (output?.buffer?.length) {
          output(10);
        }
      },
      read(stream, buffer, offset, length, pos) {
        var bytesRead = 0;
        for (var i = 0; i < length; i++) {
          var result;
          try {
            result = input();
          } catch (e) {
            throw new FS.ErrnoError(29);
          }
          if (result === undefined && bytesRead === 0) {
            throw new FS.ErrnoError(6);
          }
          if (result === null || result === undefined) break;
          bytesRead++;
          buffer[offset + i] = result;
        }
        if (bytesRead) {
          stream.node.atime = Date.now();
        }
        return bytesRead;
      },
      write(stream, buffer, offset, length, pos) {
        for (var i = 0; i < length; i++) {
          try {
            output(buffer[offset + i]);
          } catch (e) {
            throw new FS.ErrnoError(29);
          }
        }
        if (length) {
          stream.node.mtime = stream.node.ctime = Date.now();
        }
        return i;
      }
    });
    return FS.mkdev(path, mode, dev);
  },
  forceLoadFile(obj) {
    if (obj.isDevice || obj.isFolder || obj.link || obj.contents) return true;
    if (globalThis.XMLHttpRequest) {
      abort(
        "Lazy loading should have been performed (contents set) in createLazyFile, but it was not. Lazy loading only works in web workers. Use --embed-file or --preload-file in emcc on the main thread."
      );
    } else {
      try {
        obj.contents = readBinary(obj.url);
      } catch (e) {
        throw new FS.ErrnoError(29);
      }
    }
  },
  createLazyFile(parent, name, url, canRead, canWrite) {
    class LazyUint8Array {
      lengthKnown = false;
      chunks = [];
      get(idx) {
        if (idx > this.length - 1 || idx < 0) {
          return undefined;
        }
        var chunkOffset = idx % this.chunkSize;
        var chunkNum = (idx / this.chunkSize) | 0;
        return this.getter(chunkNum)[chunkOffset];
      }
      setDataGetter(getter) {
        this.getter = getter;
      }
      cacheLength() {
        var xhr = new XMLHttpRequest();
        xhr.open("HEAD", url, false);
        xhr.send(null);
        if (!((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304))
          abort("Couldn't load " + url + ". Status: " + xhr.status);
        var datalength = Number(xhr.getResponseHeader("Content-length"));
        var header;
        var hasByteServing = (header = xhr.getResponseHeader("Accept-Ranges")) && header === "bytes";
        var usesGzip = (header = xhr.getResponseHeader("Content-Encoding")) && header === "gzip";
        var chunkSize = 1024 * 1024;
        if (!hasByteServing) chunkSize = datalength;
        var doXHR = (from, to) => {
          if (from > to) abort("invalid range (" + from + ", " + to + ") or no bytes requested!");
          if (to > datalength - 1) abort("only " + datalength + " bytes available! programmer error!");
          var xhr = new XMLHttpRequest();
          xhr.open("GET", url, false);
          if (datalength !== chunkSize) xhr.setRequestHeader("Range", "bytes=" + from + "-" + to);
          xhr.responseType = "arraybuffer";
          if (xhr.overrideMimeType) {
            xhr.overrideMimeType("text/plain; charset=x-user-defined");
          }
          xhr.send(null);
          if (!((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304))
            abort("Couldn't load " + url + ". Status: " + xhr.status);
          if (xhr.response !== undefined) {
            return new Uint8Array(xhr.response || []);
          }
          return intArrayFromString(xhr.responseText || "", true);
        };
        var lazyArray = this;
        lazyArray.setDataGetter((chunkNum) => {
          var start = chunkNum * chunkSize;
          var end = (chunkNum + 1) * chunkSize - 1;
          end = Math.min(end, datalength - 1);
          if (typeof lazyArray.chunks[chunkNum] == "undefined") {
            lazyArray.chunks[chunkNum] = doXHR(start, end);
          }
          if (typeof lazyArray.chunks[chunkNum] == "undefined") abort("doXHR failed!");
          return lazyArray.chunks[chunkNum];
        });
        if (usesGzip || !datalength) {
          chunkSize = datalength = 1;
          datalength = this.getter(0).length;
          chunkSize = datalength;
          out("LazyFiles on gzip forces download of the whole file when length is accessed");
        }
        this._length = datalength;
        this._chunkSize = chunkSize;
        this.lengthKnown = true;
      }
      get length() {
        if (!this.lengthKnown) {
          this.cacheLength();
        }
        return this._length;
      }
      get chunkSize() {
        if (!this.lengthKnown) {
          this.cacheLength();
        }
        return this._chunkSize;
      }
    }
    if (globalThis.XMLHttpRequest) {
      if (!ENVIRONMENT_IS_WORKER)
        abort(
          "Cannot do synchronous binary XHRs outside webworkers in modern browsers. Use --embed-file or --preload-file in emcc"
        );
      var lazyArray = new LazyUint8Array();
      var properties = { isDevice: false, contents: lazyArray };
    } else {
      var properties = { isDevice: false, url };
    }
    var node = FS.createFile(parent, name, properties, canRead, canWrite);
    if (properties.contents) {
      node.contents = properties.contents;
    } else if (properties.url) {
      node.contents = null;
      node.url = properties.url;
    }
    Object.defineProperties(node, {
      usedBytes: {
        get: function () {
          return this.contents.length;
        }
      }
    });
    var stream_ops = {};
    for (const [key, fn] of Object.entries(node.stream_ops)) {
      stream_ops[key] = (...args) => {
        FS.forceLoadFile(node);
        return fn(...args);
      };
    }
    function writeChunks(stream, buffer, offset, length, position) {
      var contents = stream.node.contents;
      if (position >= contents.length) return 0;
      var size = Math.min(contents.length - position, length);
      if (contents.slice) {
        for (var i = 0; i < size; i++) {
          buffer[offset + i] = contents[position + i];
        }
      } else {
        for (var i = 0; i < size; i++) {
          buffer[offset + i] = contents.get(position + i);
        }
      }
      return size;
    }
    stream_ops.read = (stream, buffer, offset, length, position) => {
      FS.forceLoadFile(node);
      return writeChunks(stream, buffer, offset, length, position);
    };
    stream_ops.mmap = (stream, length, position, prot, flags) => {
      FS.forceLoadFile(node);
      var ptr = mmapAlloc(length);
      if (!ptr) {
        throw new FS.ErrnoError(48);
      }
      writeChunks(stream, HEAP8, ptr, length, position);
      return { ptr, allocated: true };
    };
    node.stream_ops = stream_ops;
    return node;
  }
};
var UTF8ToString = (ptr, maxBytesToRead, ignoreNul) => {
  if (!ptr) return "";
  var end = findStringEnd(HEAPU8, ptr, maxBytesToRead, ignoreNul);
  return UTF8Decoder.decode(HEAPU8.subarray(ptr, end));
};
var SYSCALLS = {
  DEFAULT_POLLMASK: 5,
  calculateAt(dirfd, path, allowEmpty) {
    if (PATH.isAbs(path)) {
      return path;
    }
    var dir;
    if (dirfd === -100) {
      dir = FS.cwd();
    } else {
      var dirstream = SYSCALLS.getStreamFromFD(dirfd);
      dir = dirstream.path;
    }
    if (path.length == 0) {
      if (!allowEmpty) {
        throw new FS.ErrnoError(44);
      }
      return dir;
    }
    return dir + "/" + path;
  },
  writeStat(buf, stat) {
    HEAPU32[buf >> 2] = stat.dev;
    HEAPU32[(buf + 4) >> 2] = stat.mode;
    HEAPU32[(buf + 8) >> 2] = stat.nlink;
    HEAPU32[(buf + 12) >> 2] = stat.uid;
    HEAPU32[(buf + 16) >> 2] = stat.gid;
    HEAPU32[(buf + 20) >> 2] = stat.rdev;
    HEAP64[(buf + 24) >> 3] = BigInt(stat.size);
    HEAP32[(buf + 32) >> 2] = 4096;
    HEAP32[(buf + 36) >> 2] = stat.blocks;
    var atime = stat.atime.getTime();
    var mtime = stat.mtime.getTime();
    var ctime = stat.ctime.getTime();
    HEAP64[(buf + 40) >> 3] = BigInt(Math.floor(atime / 1e3));
    HEAPU32[(buf + 48) >> 2] = (atime % 1e3) * 1e3 * 1e3;
    HEAP64[(buf + 56) >> 3] = BigInt(Math.floor(mtime / 1e3));
    HEAPU32[(buf + 64) >> 2] = (mtime % 1e3) * 1e3 * 1e3;
    HEAP64[(buf + 72) >> 3] = BigInt(Math.floor(ctime / 1e3));
    HEAPU32[(buf + 80) >> 2] = (ctime % 1e3) * 1e3 * 1e3;
    HEAP64[(buf + 88) >> 3] = BigInt(stat.ino);
    return 0;
  },
  writeStatFs(buf, stats) {
    HEAPU32[(buf + 4) >> 2] = stats.bsize;
    HEAPU32[(buf + 60) >> 2] = stats.bsize;
    HEAP64[(buf + 8) >> 3] = BigInt(stats.blocks);
    HEAP64[(buf + 16) >> 3] = BigInt(stats.bfree);
    HEAP64[(buf + 24) >> 3] = BigInt(stats.bavail);
    HEAP64[(buf + 32) >> 3] = BigInt(stats.files);
    HEAP64[(buf + 40) >> 3] = BigInt(stats.ffree);
    HEAPU32[(buf + 48) >> 2] = stats.fsid;
    HEAPU32[(buf + 64) >> 2] = stats.flags;
    HEAPU32[(buf + 56) >> 2] = stats.namelen;
  },
  doMsync(addr, stream, len, flags, offset) {
    if (!FS.isFile(stream.node.mode)) {
      throw new FS.ErrnoError(43);
    }
    if (flags & 2) {
      return 0;
    }
    var buffer = HEAPU8.slice(addr, addr + len);
    FS.msync(stream, buffer, offset, len, flags);
  },
  getStreamFromFD(fd) {
    var stream = FS.getStreamChecked(fd);
    return stream;
  },
  varargs: undefined,
  getStr(ptr) {
    var ret = UTF8ToString(ptr);
    return ret;
  }
};
var ___syscall__newselect = function (nfds, readfds, writefds, exceptfds, timeout) {
  try {
    var total = 0;
    var srcReadLow = readfds ? HEAP32[readfds >> 2] : 0,
      srcReadHigh = readfds ? HEAP32[(readfds + 4) >> 2] : 0;
    var srcWriteLow = writefds ? HEAP32[writefds >> 2] : 0,
      srcWriteHigh = writefds ? HEAP32[(writefds + 4) >> 2] : 0;
    var srcExceptLow = exceptfds ? HEAP32[exceptfds >> 2] : 0,
      srcExceptHigh = exceptfds ? HEAP32[(exceptfds + 4) >> 2] : 0;
    var dstReadLow = 0,
      dstReadHigh = 0;
    var dstWriteLow = 0,
      dstWriteHigh = 0;
    var dstExceptLow = 0,
      dstExceptHigh = 0;
    var allLow =
      (readfds ? HEAP32[readfds >> 2] : 0) |
      (writefds ? HEAP32[writefds >> 2] : 0) |
      (exceptfds ? HEAP32[exceptfds >> 2] : 0);
    var allHigh =
      (readfds ? HEAP32[(readfds + 4) >> 2] : 0) |
      (writefds ? HEAP32[(writefds + 4) >> 2] : 0) |
      (exceptfds ? HEAP32[(exceptfds + 4) >> 2] : 0);
    var check = (fd, low, high, val) => (fd < 32 ? low & val : high & val);
    for (var fd = 0; fd < nfds; fd++) {
      var mask = 1 << (fd % 32);
      if (!check(fd, allLow, allHigh, mask)) {
        continue;
      }
      var stream = SYSCALLS.getStreamFromFD(fd);
      var flags = SYSCALLS.DEFAULT_POLLMASK;
      if (stream.stream_ops.poll) {
        var timeoutInMillis = -1;
        if (timeout) {
          var tv_sec = readfds ? HEAP32[timeout >> 2] : 0,
            tv_usec = readfds ? HEAP32[(timeout + 4) >> 2] : 0;
          timeoutInMillis = (tv_sec + tv_usec / 1e6) * 1e3;
        }
        flags = stream.stream_ops.poll(stream, timeoutInMillis);
      }
      if (flags & 1 && check(fd, srcReadLow, srcReadHigh, mask)) {
        fd < 32 ? (dstReadLow = dstReadLow | mask) : (dstReadHigh = dstReadHigh | mask);
        total++;
      }
      if (flags & 4 && check(fd, srcWriteLow, srcWriteHigh, mask)) {
        fd < 32 ? (dstWriteLow = dstWriteLow | mask) : (dstWriteHigh = dstWriteHigh | mask);
        total++;
      }
      if (flags & 2 && check(fd, srcExceptLow, srcExceptHigh, mask)) {
        fd < 32 ? (dstExceptLow = dstExceptLow | mask) : (dstExceptHigh = dstExceptHigh | mask);
        total++;
      }
    }
    if (readfds) {
      HEAP32[readfds >> 2] = dstReadLow;
      HEAP32[(readfds + 4) >> 2] = dstReadHigh;
    }
    if (writefds) {
      HEAP32[writefds >> 2] = dstWriteLow;
      HEAP32[(writefds + 4) >> 2] = dstWriteHigh;
    }
    if (exceptfds) {
      HEAP32[exceptfds >> 2] = dstExceptLow;
      HEAP32[(exceptfds + 4) >> 2] = dstExceptHigh;
    }
    return total;
  } catch (e) {
    if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
    return -e.errno;
  }
};
function ___syscall_chdir(path) {
  try {
    path = SYSCALLS.getStr(path);
    FS.chdir(path);
    return 0;
  } catch (e) {
    if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
    return -e.errno;
  }
}
function ___syscall_faccessat(dirfd, path, amode, flags) {
  try {
    path = SYSCALLS.getStr(path);
    path = SYSCALLS.calculateAt(dirfd, path);
    if (amode & ~7) {
      return -28;
    }
    var lookup = FS.lookupPath(path, { follow: true });
    var node = lookup.node;
    if (!node) {
      return -44;
    }
    var perms = "";
    if (amode & 4) perms += "r";
    if (amode & 2) perms += "w";
    if (amode & 1) perms += "x";
    if (perms && FS.nodePermissions(node, perms)) {
      return -2;
    }
    return 0;
  } catch (e) {
    if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
    return -e.errno;
  }
}
var syscallGetVarargI = () => {
  var ret = HEAP32[+SYSCALLS.varargs >> 2];
  SYSCALLS.varargs += 4;
  return ret;
};
var syscallGetVarargP = syscallGetVarargI;
function ___syscall_fcntl64(fd, cmd, varargs) {
  SYSCALLS.varargs = varargs;
  try {
    var stream = SYSCALLS.getStreamFromFD(fd);
    switch (cmd) {
      case 0: {
        var arg = syscallGetVarargI();
        if (arg < 0) {
          return -28;
        }
        while (FS.streams[arg]) {
          arg++;
        }
        var newStream;
        newStream = FS.dupStream(stream, arg);
        return newStream.fd;
      }
      case 1:
      case 2:
        return 0;
      case 3:
        return stream.flags;
      case 4: {
        var arg = syscallGetVarargI();
        stream.flags |= arg;
        return 0;
      }
      case 12: {
        var arg = syscallGetVarargP();
        var offset = 0;
        HEAP16[(arg + offset) >> 1] = 2;
        return 0;
      }
      case 13:
      case 14:
        return 0;
    }
    return -28;
  } catch (e) {
    if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
    return -e.errno;
  }
}
var stringToUTF8 = (str, outPtr, maxBytesToWrite) => stringToUTF8Array(str, HEAPU8, outPtr, maxBytesToWrite);
function ___syscall_getcwd(buf, size) {
  try {
    if (size === 0) return -28;
    var cwd = FS.cwd();
    var cwdLengthInBytes = lengthBytesUTF8(cwd) + 1;
    if (size < cwdLengthInBytes) return -68;
    stringToUTF8(cwd, buf, size);
    return cwdLengthInBytes;
  } catch (e) {
    if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
    return -e.errno;
  }
}
function ___syscall_getdents64(fd, dirp, count) {
  try {
    var stream = SYSCALLS.getStreamFromFD(fd);
    stream.getdents ||= FS.readdir(stream.path);
    var struct_size = 280;
    var pos = 0;
    var off = FS.llseek(stream, 0, 1);
    var startIdx = Math.floor(off / struct_size);
    var endIdx = Math.min(stream.getdents.length, startIdx + Math.floor(count / struct_size));
    for (var idx = startIdx; idx < endIdx; idx++) {
      var id;
      var type;
      var name = stream.getdents[idx];
      if (name === ".") {
        id = stream.node.id;
        type = 4;
      } else if (name === "..") {
        var lookup = FS.lookupPath(stream.path, { parent: true });
        id = lookup.node.id;
        type = 4;
      } else {
        var child;
        try {
          child = FS.lookupNode(stream.node, name);
        } catch (e) {
          if (e?.errno === 28) {
            continue;
          }
          throw e;
        }
        id = child.id;
        type = FS.isChrdev(child.mode) ? 2 : FS.isDir(child.mode) ? 4 : FS.isLink(child.mode) ? 10 : 8;
      }
      HEAP64[(dirp + pos) >> 3] = BigInt(id);
      HEAP64[(dirp + pos + 8) >> 3] = BigInt((idx + 1) * struct_size);
      HEAP16[(dirp + pos + 16) >> 1] = 280;
      HEAP8[dirp + pos + 18] = type;
      stringToUTF8(name, dirp + pos + 19, 256);
      pos += struct_size;
    }
    FS.llseek(stream, idx * struct_size, 0);
    return pos;
  } catch (e) {
    if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
    return -e.errno;
  }
}
function ___syscall_ioctl(fd, op, varargs) {
  SYSCALLS.varargs = varargs;
  try {
    var stream = SYSCALLS.getStreamFromFD(fd);
    switch (op) {
      case 21509: {
        if (!stream.tty) return -59;
        return 0;
      }
      case 21505: {
        if (!stream.tty) return -59;
        if (stream.tty.ops.ioctl_tcgets) {
          var termios = stream.tty.ops.ioctl_tcgets(stream);
          var argp = syscallGetVarargP();
          HEAP32[argp >> 2] = termios.c_iflag || 0;
          HEAP32[(argp + 4) >> 2] = termios.c_oflag || 0;
          HEAP32[(argp + 8) >> 2] = termios.c_cflag || 0;
          HEAP32[(argp + 12) >> 2] = termios.c_lflag || 0;
          for (var i = 0; i < 32; i++) {
            HEAP8[argp + i + 17] = termios.c_cc[i] || 0;
          }
          return 0;
        }
        return 0;
      }
      case 21510:
      case 21511:
      case 21512: {
        if (!stream.tty) return -59;
        return 0;
      }
      case 21506:
      case 21507:
      case 21508: {
        if (!stream.tty) return -59;
        if (stream.tty.ops.ioctl_tcsets) {
          var argp = syscallGetVarargP();
          var c_iflag = HEAP32[argp >> 2];
          var c_oflag = HEAP32[(argp + 4) >> 2];
          var c_cflag = HEAP32[(argp + 8) >> 2];
          var c_lflag = HEAP32[(argp + 12) >> 2];
          var c_cc = [];
          for (var i = 0; i < 32; i++) {
            c_cc.push(HEAP8[argp + i + 17]);
          }
          return stream.tty.ops.ioctl_tcsets(stream.tty, op, { c_iflag, c_oflag, c_cflag, c_lflag, c_cc });
        }
        return 0;
      }
      case 21519: {
        if (!stream.tty) return -59;
        var argp = syscallGetVarargP();
        HEAP32[argp >> 2] = 0;
        return 0;
      }
      case 21520: {
        if (!stream.tty) return -59;
        return -28;
      }
      case 21537:
      case 21531: {
        var argp = syscallGetVarargP();
        return FS.ioctl(stream, op, argp);
      }
      case 21523: {
        if (!stream.tty) return -59;
        if (stream.tty.ops.ioctl_tiocgwinsz) {
          var winsize = stream.tty.ops.ioctl_tiocgwinsz(stream.tty);
          var argp = syscallGetVarargP();
          HEAP16[argp >> 1] = winsize[0];
          HEAP16[(argp + 2) >> 1] = winsize[1];
        }
        return 0;
      }
      case 21524: {
        if (!stream.tty) return -59;
        return 0;
      }
      case 21515: {
        if (!stream.tty) return -59;
        return 0;
      }
      default:
        return -28;
    }
  } catch (e) {
    if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
    return -e.errno;
  }
}
function ___syscall_lstat64(path, buf) {
  try {
    path = SYSCALLS.getStr(path);
    return SYSCALLS.writeStat(buf, FS.lstat(path));
  } catch (e) {
    if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
    return -e.errno;
  }
}
function ___syscall_mkdirat(dirfd, path, mode) {
  try {
    path = SYSCALLS.getStr(path);
    path = SYSCALLS.calculateAt(dirfd, path);
    FS.mkdir(path, mode, 0);
    return 0;
  } catch (e) {
    if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
    return -e.errno;
  }
}
function ___syscall_newfstatat(dirfd, path, buf, flags) {
  try {
    path = SYSCALLS.getStr(path);
    var nofollow = flags & 256;
    var allowEmpty = flags & 4096;
    flags = flags & ~6400;
    path = SYSCALLS.calculateAt(dirfd, path, allowEmpty);
    return SYSCALLS.writeStat(buf, nofollow ? FS.lstat(path) : FS.stat(path));
  } catch (e) {
    if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
    return -e.errno;
  }
}
function ___syscall_openat(dirfd, path, flags, varargs) {
  SYSCALLS.varargs = varargs;
  try {
    path = SYSCALLS.getStr(path);
    path = SYSCALLS.calculateAt(dirfd, path);
    var mode = varargs ? syscallGetVarargI() : 0;
    return FS.open(path, flags, mode).fd;
  } catch (e) {
    if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
    return -e.errno;
  }
}
function ___syscall_readlinkat(dirfd, path, buf, bufsize) {
  try {
    path = SYSCALLS.getStr(path);
    path = SYSCALLS.calculateAt(dirfd, path);
    if (bufsize <= 0) return -28;
    var ret = FS.readlink(path);
    var len = Math.min(bufsize, lengthBytesUTF8(ret));
    var endChar = HEAP8[buf + len];
    stringToUTF8(ret, buf, bufsize + 1);
    HEAP8[buf + len] = endChar;
    return len;
  } catch (e) {
    if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
    return -e.errno;
  }
}
function ___syscall_stat64(path, buf) {
  try {
    path = SYSCALLS.getStr(path);
    return SYSCALLS.writeStat(buf, FS.stat(path));
  } catch (e) {
    if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
    return -e.errno;
  }
}
function ___syscall_unlinkat(dirfd, path, flags) {
  try {
    path = SYSCALLS.getStr(path);
    path = SYSCALLS.calculateAt(dirfd, path);
    if (!flags) {
      FS.unlink(path);
    } else if (flags === 512) {
      FS.rmdir(path);
    } else {
      return -28;
    }
    return 0;
  } catch (e) {
    if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
    return -e.errno;
  }
}
var __abort_js = () => abort("");
var INT53_MAX = 9007199254740992;
var INT53_MIN = -9007199254740992;
var bigintToI53Checked = (num) => (num < INT53_MIN || num > INT53_MAX ? NaN : Number(num));
function __gmtime_js(time, tmPtr) {
  time = bigintToI53Checked(time);
  var date = new Date(time * 1e3);
  HEAP32[tmPtr >> 2] = date.getUTCSeconds();
  HEAP32[(tmPtr + 4) >> 2] = date.getUTCMinutes();
  HEAP32[(tmPtr + 8) >> 2] = date.getUTCHours();
  HEAP32[(tmPtr + 12) >> 2] = date.getUTCDate();
  HEAP32[(tmPtr + 16) >> 2] = date.getUTCMonth();
  HEAP32[(tmPtr + 20) >> 2] = date.getUTCFullYear() - 1900;
  HEAP32[(tmPtr + 24) >> 2] = date.getUTCDay();
  var start = Date.UTC(date.getUTCFullYear(), 0, 1, 0, 0, 0, 0);
  var yday = ((date.getTime() - start) / (1e3 * 60 * 60 * 24)) | 0;
  HEAP32[(tmPtr + 28) >> 2] = yday;
}
var isLeapYear = (year) => year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
var MONTH_DAYS_LEAP_CUMULATIVE = [0, 31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335];
var MONTH_DAYS_REGULAR_CUMULATIVE = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
var ydayFromDate = (date) => {
  var leap = isLeapYear(date.getFullYear());
  var monthDaysCumulative = leap ? MONTH_DAYS_LEAP_CUMULATIVE : MONTH_DAYS_REGULAR_CUMULATIVE;
  var yday = monthDaysCumulative[date.getMonth()] + date.getDate() - 1;
  return yday;
};
function __localtime_js(time, tmPtr) {
  time = bigintToI53Checked(time);
  var date = new Date(time * 1e3);
  HEAP32[tmPtr >> 2] = date.getSeconds();
  HEAP32[(tmPtr + 4) >> 2] = date.getMinutes();
  HEAP32[(tmPtr + 8) >> 2] = date.getHours();
  HEAP32[(tmPtr + 12) >> 2] = date.getDate();
  HEAP32[(tmPtr + 16) >> 2] = date.getMonth();
  HEAP32[(tmPtr + 20) >> 2] = date.getFullYear() - 1900;
  HEAP32[(tmPtr + 24) >> 2] = date.getDay();
  var yday = ydayFromDate(date) | 0;
  HEAP32[(tmPtr + 28) >> 2] = yday;
  HEAP32[(tmPtr + 36) >> 2] = -(date.getTimezoneOffset() * 60);
  var start = new Date(date.getFullYear(), 0, 1);
  var summerOffset = new Date(date.getFullYear(), 6, 1).getTimezoneOffset();
  var winterOffset = start.getTimezoneOffset();
  var dst = (summerOffset != winterOffset && date.getTimezoneOffset() == Math.min(winterOffset, summerOffset)) | 0;
  HEAP32[(tmPtr + 32) >> 2] = dst;
}
var __mktime_js = function (tmPtr) {
  var ret = (() => {
    var date = new Date(
      HEAP32[(tmPtr + 20) >> 2] + 1900,
      HEAP32[(tmPtr + 16) >> 2],
      HEAP32[(tmPtr + 12) >> 2],
      HEAP32[(tmPtr + 8) >> 2],
      HEAP32[(tmPtr + 4) >> 2],
      HEAP32[tmPtr >> 2],
      0
    );
    var dst = HEAP32[(tmPtr + 32) >> 2];
    var guessedOffset = date.getTimezoneOffset();
    var start = new Date(date.getFullYear(), 0, 1);
    var summerOffset = new Date(date.getFullYear(), 6, 1).getTimezoneOffset();
    var winterOffset = start.getTimezoneOffset();
    var dstOffset = Math.min(winterOffset, summerOffset);
    if (dst < 0) {
      HEAP32[(tmPtr + 32) >> 2] = Number(summerOffset != winterOffset && dstOffset == guessedOffset);
    } else if (dst > 0 != (dstOffset == guessedOffset)) {
      var nonDstOffset = Math.max(winterOffset, summerOffset);
      var trueOffset = dst > 0 ? dstOffset : nonDstOffset;
      date.setTime(date.getTime() + (trueOffset - guessedOffset) * 6e4);
    }
    HEAP32[(tmPtr + 24) >> 2] = date.getDay();
    var yday = ydayFromDate(date) | 0;
    HEAP32[(tmPtr + 28) >> 2] = yday;
    HEAP32[tmPtr >> 2] = date.getSeconds();
    HEAP32[(tmPtr + 4) >> 2] = date.getMinutes();
    HEAP32[(tmPtr + 8) >> 2] = date.getHours();
    HEAP32[(tmPtr + 12) >> 2] = date.getDate();
    HEAP32[(tmPtr + 16) >> 2] = date.getMonth();
    HEAP32[(tmPtr + 20) >> 2] = date.getYear();
    var timeMs = date.getTime();
    if (isNaN(timeMs)) {
      return -1;
    }
    return timeMs / 1e3;
  })();
  return BigInt(ret);
};
var __tzset_js = (timezone, daylight, std_name, dst_name) => {
  var currentYear = new Date().getFullYear();
  var winter = new Date(currentYear, 0, 1);
  var summer = new Date(currentYear, 6, 1);
  var winterOffset = winter.getTimezoneOffset();
  var summerOffset = summer.getTimezoneOffset();
  var stdTimezoneOffset = Math.max(winterOffset, summerOffset);
  HEAPU32[timezone >> 2] = stdTimezoneOffset * 60;
  HEAP32[daylight >> 2] = Number(winterOffset != summerOffset);
  var extractZone = (timezoneOffset) => {
    var sign = timezoneOffset >= 0 ? "-" : "+";
    var absOffset = Math.abs(timezoneOffset);
    var hours = String(Math.floor(absOffset / 60)).padStart(2, "0");
    var minutes = String(absOffset % 60).padStart(2, "0");
    return `UTC${sign}${hours}${minutes}`;
  };
  var winterName = extractZone(winterOffset);
  var summerName = extractZone(summerOffset);
  if (summerOffset < winterOffset) {
    stringToUTF8(winterName, std_name, 17);
    stringToUTF8(summerName, dst_name, 17);
  } else {
    stringToUTF8(winterName, dst_name, 17);
    stringToUTF8(summerName, std_name, 17);
  }
};
var _emscripten_set_main_loop_timing = (mode, value) => {
  MainLoop.timingMode = mode;
  MainLoop.timingValue = value;
  if (!MainLoop.func) {
    return 1;
  }
  if (!MainLoop.running) {
    MainLoop.running = true;
  }
  if (mode == 0) {
    MainLoop.scheduler = function MainLoop_scheduler_setTimeout() {
      var timeUntilNextTick = Math.max(0, MainLoop.tickStartTime + value - _emscripten_get_now()) | 0;
      setTimeout(MainLoop.runner, timeUntilNextTick);
    };
    MainLoop.method = "timeout";
  } else if (mode == 1) {
    MainLoop.scheduler = function MainLoop_scheduler_rAF() {
      MainLoop.requestAnimationFrame(MainLoop.runner);
    };
    MainLoop.method = "rAF";
  } else if (mode == 2) {
    if (!MainLoop.setImmediate) {
      if (globalThis.setImmediate) {
        MainLoop.setImmediate = setImmediate;
      } else {
        var setImmediates = [];
        var emscriptenMainLoopMessageId = "setimmediate";
        var MainLoop_setImmediate_messageHandler = (event) => {
          if (event.data === emscriptenMainLoopMessageId || event.data.target === emscriptenMainLoopMessageId) {
            event.stopPropagation();
            setImmediates.shift()();
          }
        };
        addEventListener("message", MainLoop_setImmediate_messageHandler, true);
        MainLoop.setImmediate = (func) => {
          setImmediates.push(func);
          if (ENVIRONMENT_IS_WORKER) {
            Module["setImmediates"] ??= [];
            Module["setImmediates"].push(func);
            postMessage({ target: emscriptenMainLoopMessageId });
          } else postMessage(emscriptenMainLoopMessageId, "*");
        };
      }
    }
    MainLoop.scheduler = function MainLoop_scheduler_setImmediate() {
      MainLoop.setImmediate(MainLoop.runner);
    };
    MainLoop.method = "immediate";
  }
  return 0;
};
var _emscripten_get_now = () => performance.now();
var runtimeKeepaliveCounter = 0;
var keepRuntimeAlive = () => noExitRuntime || runtimeKeepaliveCounter > 0;
var _proc_exit = (code) => {
  EXITSTATUS = code;
  if (!keepRuntimeAlive()) {
    Module["onExit"]?.(code);
    ABORT = true;
  }
  quit_(code, new ExitStatus(code));
};
var exitJS = (status, implicit) => {
  EXITSTATUS = status;
  _proc_exit(status);
};
var _exit = exitJS;
var handleException = (e) => {
  if (e instanceof ExitStatus || e == "unwind") {
    return EXITSTATUS;
  }
  quit_(1, e);
};
var maybeExit = () => {
  if (!keepRuntimeAlive()) {
    try {
      _exit(EXITSTATUS);
    } catch (e) {
      handleException(e);
    }
  }
};
var setMainLoop = (iterFunc, fps, simulateInfiniteLoop, arg, noSetTiming) => {
  MainLoop.func = iterFunc;
  MainLoop.arg = arg;
  var thisMainLoopId = MainLoop.currentlyRunningMainloop;
  function checkIsRunning() {
    if (thisMainLoopId < MainLoop.currentlyRunningMainloop) {
      maybeExit();
      return false;
    }
    return true;
  }
  MainLoop.running = false;
  MainLoop.runner = function MainLoop_runner() {
    if (ABORT) return;
    if (MainLoop.queue.length > 0) {
      var start = Date.now();
      var blocker = MainLoop.queue.shift();
      blocker.func(blocker.arg);
      if (MainLoop.remainingBlockers) {
        var remaining = MainLoop.remainingBlockers;
        var next = remaining % 1 == 0 ? remaining - 1 : Math.floor(remaining);
        if (blocker.counted) {
          MainLoop.remainingBlockers = next;
        } else {
          next = next + 0.5;
          MainLoop.remainingBlockers = (8 * remaining + next) / 9;
        }
      }
      MainLoop.updateStatus();
      if (!checkIsRunning()) return;
      setTimeout(MainLoop.runner, 0);
      return;
    }
    if (!checkIsRunning()) return;
    MainLoop.currentFrameNumber = (MainLoop.currentFrameNumber + 1) | 0;
    if (
      MainLoop.timingMode == 1 &&
      MainLoop.timingValue > 1 &&
      MainLoop.currentFrameNumber % MainLoop.timingValue != 0
    ) {
      MainLoop.scheduler();
      return;
    } else if (MainLoop.timingMode == 0) {
      MainLoop.tickStartTime = _emscripten_get_now();
    }
    MainLoop.runIter(iterFunc);
    if (!checkIsRunning()) return;
    MainLoop.scheduler();
  };
  if (!noSetTiming) {
    if (fps > 0) {
      _emscripten_set_main_loop_timing(0, 1e3 / fps);
    } else {
      _emscripten_set_main_loop_timing(1, 1);
    }
    MainLoop.scheduler();
  }
  if (simulateInfiniteLoop) {
    throw "unwind";
  }
};
var callUserCallback = (func) => {
  if (ABORT) {
    return;
  }
  try {
    func();
    maybeExit();
  } catch (e) {
    handleException(e);
  }
};
var MainLoop = {
  running: false,
  scheduler: null,
  method: "",
  currentlyRunningMainloop: 0,
  func: null,
  arg: 0,
  timingMode: 0,
  timingValue: 0,
  currentFrameNumber: 0,
  queue: [],
  preMainLoop: [],
  postMainLoop: [],
  pause() {
    MainLoop.scheduler = null;
    MainLoop.currentlyRunningMainloop++;
  },
  resume() {
    MainLoop.currentlyRunningMainloop++;
    var timingMode = MainLoop.timingMode;
    var timingValue = MainLoop.timingValue;
    var func = MainLoop.func;
    MainLoop.func = null;
    setMainLoop(func, 0, false, MainLoop.arg, true);
    _emscripten_set_main_loop_timing(timingMode, timingValue);
    MainLoop.scheduler();
  },
  updateStatus() {
    if (Module["setStatus"]) {
      var message = Module["statusMessage"] || "Please wait...";
      var remaining = MainLoop.remainingBlockers ?? 0;
      var expected = MainLoop.expectedBlockers ?? 0;
      if (remaining) {
        if (remaining < expected) {
          Module["setStatus"](`{message} ({expected - remaining}/{expected})`);
        } else {
          Module["setStatus"](message);
        }
      } else {
        Module["setStatus"]("");
      }
    }
  },
  init() {
    Module["preMainLoop"] && MainLoop.preMainLoop.push(Module["preMainLoop"]);
    Module["postMainLoop"] && MainLoop.postMainLoop.push(Module["postMainLoop"]);
  },
  runIter(func) {
    if (ABORT) return;
    for (var pre of MainLoop.preMainLoop) {
      if (pre() === false) {
        return;
      }
    }
    callUserCallback(func);
    for (var post of MainLoop.postMainLoop) {
      post();
    }
  },
  nextRAF: 0,
  fakeRequestAnimationFrame(func) {
    var now = Date.now();
    if (MainLoop.nextRAF === 0) {
      MainLoop.nextRAF = now + 1e3 / 60;
    } else {
      while (now + 2 >= MainLoop.nextRAF) {
        MainLoop.nextRAF += 1e3 / 60;
      }
    }
    var delay = Math.max(MainLoop.nextRAF - now, 0);
    setTimeout(func, delay);
  },
  requestAnimationFrame(func) {
    if (globalThis.requestAnimationFrame) {
      requestAnimationFrame(func);
    } else {
      MainLoop.fakeRequestAnimationFrame(func);
    }
  }
};
var AL = {
  QUEUE_INTERVAL: 25,
  QUEUE_LOOKAHEAD: 0.1,
  DEVICE_NAME: "Emscripten OpenAL",
  CAPTURE_DEVICE_NAME: "Emscripten OpenAL capture",
  ALC_EXTENSIONS: { ALC_SOFT_pause_device: true, ALC_SOFT_HRTF: true },
  AL_EXTENSIONS: {
    AL_EXT_float32: true,
    AL_SOFT_loop_points: true,
    AL_SOFT_source_length: true,
    AL_EXT_source_distance_model: true,
    AL_SOFT_source_spatialize: true
  },
  _alcErr: 0,
  alcErr: 0,
  deviceRefCounts: {},
  alcStringCache: {},
  paused: false,
  stringCache: {},
  contexts: {},
  currentCtx: null,
  buffers: { 0: { id: 0, refCount: 0, audioBuf: null, frequency: 0, bytesPerSample: 2, channels: 1, length: 0 } },
  paramArray: [],
  _nextId: 1,
  newId: () => (AL.freeIds.length > 0 ? AL.freeIds.pop() : AL._nextId++),
  freeIds: [],
  scheduleContextAudio: (ctx) => {
    if (MainLoop.timingMode === 1 && document["visibilityState"] != "visible") {
      return;
    }
    for (var i in ctx.sources) {
      AL.scheduleSourceAudio(ctx.sources[i]);
    }
  },
  scheduleSourceAudio: (src, lookahead) => {
    if (MainLoop.timingMode === 1 && document["visibilityState"] != "visible") {
      return;
    }
    if (src.state !== 4114) {
      return;
    }
    var currentTime = AL.updateSourceTime(src);
    var startTime = src.bufStartTime;
    var startOffset = src.bufOffset;
    var bufCursor = src.bufsProcessed;
    for (var i = 0; i < src.audioQueue.length; i++) {
      var audioSrc = src.audioQueue[i];
      startTime = audioSrc._startTime + audioSrc._duration;
      startOffset = 0;
      bufCursor += audioSrc._skipCount + 1;
    }
    if (!lookahead) {
      lookahead = AL.QUEUE_LOOKAHEAD;
    }
    var lookaheadTime = currentTime + lookahead;
    var skipCount = 0;
    while (startTime < lookaheadTime) {
      if (bufCursor >= src.bufQueue.length) {
        if (src.looping) {
          bufCursor %= src.bufQueue.length;
        } else {
          break;
        }
      }
      var buf = src.bufQueue[bufCursor % src.bufQueue.length];
      if (buf.length === 0) {
        skipCount++;
        if (skipCount === src.bufQueue.length) {
          break;
        }
      } else {
        var audioSrc = src.context.audioCtx.createBufferSource();
        audioSrc.buffer = buf.audioBuf;
        audioSrc.playbackRate.value = src.playbackRate;
        if (buf.audioBuf._loopStart || buf.audioBuf._loopEnd) {
          audioSrc.loopStart = buf.audioBuf._loopStart;
          audioSrc.loopEnd = buf.audioBuf._loopEnd;
        }
        var duration = 0;
        if (src.type === 4136 && src.looping) {
          duration = Number.POSITIVE_INFINITY;
          audioSrc.loop = true;
          if (buf.audioBuf._loopStart) {
            audioSrc.loopStart = buf.audioBuf._loopStart;
          }
          if (buf.audioBuf._loopEnd) {
            audioSrc.loopEnd = buf.audioBuf._loopEnd;
          }
        } else {
          duration = (buf.audioBuf.duration - startOffset) / src.playbackRate;
        }
        audioSrc._startOffset = startOffset;
        audioSrc._duration = duration;
        audioSrc._skipCount = skipCount;
        skipCount = 0;
        audioSrc.connect(src.gain);
        if (typeof audioSrc.start != "undefined") {
          startTime = Math.max(startTime, src.context.audioCtx.currentTime);
          audioSrc.start(startTime, startOffset);
        } else if (typeof audioSrc.noteOn != "undefined") {
          startTime = Math.max(startTime, src.context.audioCtx.currentTime);
          audioSrc.noteOn(startTime);
        }
        audioSrc._startTime = startTime;
        src.audioQueue.push(audioSrc);
        startTime += duration;
      }
      startOffset = 0;
      bufCursor++;
    }
  },
  updateSourceTime: (src) => {
    var currentTime = src.context.audioCtx.currentTime;
    if (src.state !== 4114) {
      return currentTime;
    }
    if (!isFinite(src.bufStartTime)) {
      src.bufStartTime = currentTime - src.bufOffset / src.playbackRate;
      src.bufOffset = 0;
    }
    var nextStartTime = 0;
    while (src.audioQueue.length) {
      var audioSrc = src.audioQueue[0];
      src.bufsProcessed += audioSrc._skipCount;
      nextStartTime = audioSrc._startTime + audioSrc._duration;
      if (currentTime < nextStartTime) {
        break;
      }
      src.audioQueue.shift();
      src.bufStartTime = nextStartTime;
      src.bufOffset = 0;
      src.bufsProcessed++;
    }
    if (src.bufsProcessed >= src.bufQueue.length && !src.looping) {
      AL.setSourceState(src, 4116);
    } else if (src.type === 4136 && src.looping) {
      var buf = src.bufQueue[0];
      if (buf.length === 0) {
        src.bufOffset = 0;
      } else {
        var delta = (currentTime - src.bufStartTime) * src.playbackRate;
        var loopStart = buf.audioBuf._loopStart || 0;
        var loopEnd = buf.audioBuf._loopEnd || buf.audioBuf.duration;
        if (loopEnd <= loopStart) {
          loopEnd = buf.audioBuf.duration;
        }
        if (delta < loopEnd) {
          src.bufOffset = delta;
        } else {
          src.bufOffset = loopStart + ((delta - loopStart) % (loopEnd - loopStart));
        }
      }
    } else if (src.audioQueue[0]) {
      src.bufOffset = (currentTime - src.audioQueue[0]._startTime) * src.playbackRate;
    } else {
      if (src.type !== 4136 && src.looping) {
        var srcDuration = AL.sourceDuration(src) / src.playbackRate;
        if (srcDuration > 0) {
          src.bufStartTime += Math.floor((currentTime - src.bufStartTime) / srcDuration) * srcDuration;
        }
      }
      for (var i = 0; i < src.bufQueue.length; i++) {
        if (src.bufsProcessed >= src.bufQueue.length) {
          if (src.looping) {
            src.bufsProcessed %= src.bufQueue.length;
          } else {
            AL.setSourceState(src, 4116);
            break;
          }
        }
        var buf = src.bufQueue[src.bufsProcessed];
        if (buf.length > 0) {
          nextStartTime = src.bufStartTime + buf.audioBuf.duration / src.playbackRate;
          if (currentTime < nextStartTime) {
            src.bufOffset = (currentTime - src.bufStartTime) * src.playbackRate;
            break;
          }
          src.bufStartTime = nextStartTime;
        }
        src.bufOffset = 0;
        src.bufsProcessed++;
      }
    }
    return currentTime;
  },
  cancelPendingSourceAudio: (src) => {
    AL.updateSourceTime(src);
    for (var i = 1; i < src.audioQueue.length; i++) {
      var audioSrc = src.audioQueue[i];
      audioSrc.stop();
    }
    if (src.audioQueue.length > 1) {
      src.audioQueue.length = 1;
    }
  },
  stopSourceAudio: (src) => {
    for (var i = 0; i < src.audioQueue.length; i++) {
      src.audioQueue[i].stop();
    }
    src.audioQueue.length = 0;
  },
  setSourceState: (src, state) => {
    if (state === 4114) {
      if (src.state === 4114 || src.state == 4116) {
        src.bufsProcessed = 0;
        src.bufOffset = 0;
      } else {
      }
      AL.stopSourceAudio(src);
      src.state = 4114;
      src.bufStartTime = Number.NEGATIVE_INFINITY;
      AL.scheduleSourceAudio(src);
    } else if (state === 4115) {
      if (src.state === 4114) {
        AL.updateSourceTime(src);
        AL.stopSourceAudio(src);
        src.state = 4115;
      }
    } else if (state === 4116) {
      if (src.state !== 4113) {
        src.state = 4116;
        src.bufsProcessed = src.bufQueue.length;
        src.bufStartTime = Number.NEGATIVE_INFINITY;
        src.bufOffset = 0;
        AL.stopSourceAudio(src);
      }
    } else if (state === 4113) {
      if (src.state !== 4113) {
        src.state = 4113;
        src.bufsProcessed = 0;
        src.bufStartTime = Number.NEGATIVE_INFINITY;
        src.bufOffset = 0;
        AL.stopSourceAudio(src);
      }
    }
  },
  initSourcePanner: (src) => {
    if (src.type === 4144) {
      return;
    }
    var templateBuf = AL.buffers[0];
    for (var i = 0; i < src.bufQueue.length; i++) {
      if (src.bufQueue[i].id !== 0) {
        templateBuf = src.bufQueue[i];
        break;
      }
    }
    if (src.spatialize === 1 || (src.spatialize === 2 && templateBuf.channels === 1)) {
      if (src.panner) {
        return;
      }
      src.panner = src.context.audioCtx.createPanner();
      AL.updateSourceGlobal(src);
      AL.updateSourceSpace(src);
      src.panner.connect(src.context.gain);
      src.gain.disconnect();
      src.gain.connect(src.panner);
    } else {
      if (!src.panner) {
        return;
      }
      src.panner.disconnect();
      src.gain.disconnect();
      src.gain.connect(src.context.gain);
      src.panner = null;
    }
  },
  updateContextGlobal: (ctx) => {
    for (var i in ctx.sources) {
      AL.updateSourceGlobal(ctx.sources[i]);
    }
  },
  updateSourceGlobal: (src) => {
    var panner = src.panner;
    if (!panner) {
      return;
    }
    panner.refDistance = src.refDistance;
    panner.maxDistance = src.maxDistance;
    panner.rolloffFactor = src.rolloffFactor;
    panner.panningModel = src.context.hrtf ? "HRTF" : "equalpower";
    var distanceModel = src.context.sourceDistanceModel ? src.distanceModel : src.context.distanceModel;
    switch (distanceModel) {
      case 0:
        panner.distanceModel = "inverse";
        panner.refDistance = 340282e33;
        break;
      case 53249:
      case 53250:
        panner.distanceModel = "inverse";
        break;
      case 53251:
      case 53252:
        panner.distanceModel = "linear";
        break;
      case 53253:
      case 53254:
        panner.distanceModel = "exponential";
        break;
    }
  },
  updateListenerSpace: (ctx) => {
    var listener = ctx.audioCtx.listener;
    if (listener.positionX) {
      listener.positionX.value = ctx.listener.position[0];
      listener.positionY.value = ctx.listener.position[1];
      listener.positionZ.value = ctx.listener.position[2];
    } else {
      listener.setPosition(ctx.listener.position[0], ctx.listener.position[1], ctx.listener.position[2]);
    }
    if (listener.forwardX) {
      listener.forwardX.value = ctx.listener.direction[0];
      listener.forwardY.value = ctx.listener.direction[1];
      listener.forwardZ.value = ctx.listener.direction[2];
      listener.upX.value = ctx.listener.up[0];
      listener.upY.value = ctx.listener.up[1];
      listener.upZ.value = ctx.listener.up[2];
    } else {
      listener.setOrientation(
        ctx.listener.direction[0],
        ctx.listener.direction[1],
        ctx.listener.direction[2],
        ctx.listener.up[0],
        ctx.listener.up[1],
        ctx.listener.up[2]
      );
    }
    for (var i in ctx.sources) {
      AL.updateSourceSpace(ctx.sources[i]);
    }
  },
  updateSourceSpace: (src) => {
    if (!src.panner) {
      return;
    }
    var panner = src.panner;
    var posX = src.position[0];
    var posY = src.position[1];
    var posZ = src.position[2];
    var dirX = src.direction[0];
    var dirY = src.direction[1];
    var dirZ = src.direction[2];
    var listener = src.context.listener;
    var lPosX = listener.position[0];
    var lPosY = listener.position[1];
    var lPosZ = listener.position[2];
    if (src.relative) {
      var lBackX = -listener.direction[0];
      var lBackY = -listener.direction[1];
      var lBackZ = -listener.direction[2];
      var lUpX = listener.up[0];
      var lUpY = listener.up[1];
      var lUpZ = listener.up[2];
      var inverseMagnitude = (x, y, z) => {
        var length = Math.sqrt(x * x + y * y + z * z);
        if (length < Number.EPSILON) {
          return 0;
        }
        return 1 / length;
      };
      var invMag = inverseMagnitude(lBackX, lBackY, lBackZ);
      lBackX *= invMag;
      lBackY *= invMag;
      lBackZ *= invMag;
      invMag = inverseMagnitude(lUpX, lUpY, lUpZ);
      lUpX *= invMag;
      lUpY *= invMag;
      lUpZ *= invMag;
      var lRightX = lUpY * lBackZ - lUpZ * lBackY;
      var lRightY = lUpZ * lBackX - lUpX * lBackZ;
      var lRightZ = lUpX * lBackY - lUpY * lBackX;
      invMag = inverseMagnitude(lRightX, lRightY, lRightZ);
      lRightX *= invMag;
      lRightY *= invMag;
      lRightZ *= invMag;
      lUpX = lBackY * lRightZ - lBackZ * lRightY;
      lUpY = lBackZ * lRightX - lBackX * lRightZ;
      lUpZ = lBackX * lRightY - lBackY * lRightX;
      var oldX = dirX;
      var oldY = dirY;
      var oldZ = dirZ;
      dirX = oldX * lRightX + oldY * lUpX + oldZ * lBackX;
      dirY = oldX * lRightY + oldY * lUpY + oldZ * lBackY;
      dirZ = oldX * lRightZ + oldY * lUpZ + oldZ * lBackZ;
      oldX = posX;
      oldY = posY;
      oldZ = posZ;
      posX = oldX * lRightX + oldY * lUpX + oldZ * lBackX;
      posY = oldX * lRightY + oldY * lUpY + oldZ * lBackY;
      posZ = oldX * lRightZ + oldY * lUpZ + oldZ * lBackZ;
      posX += lPosX;
      posY += lPosY;
      posZ += lPosZ;
    }
    if (panner.positionX) {
      if (posX != panner.positionX.value) panner.positionX.value = posX;
      if (posY != panner.positionY.value) panner.positionY.value = posY;
      if (posZ != panner.positionZ.value) panner.positionZ.value = posZ;
    } else {
      panner.setPosition(posX, posY, posZ);
    }
    if (panner.orientationX) {
      if (dirX != panner.orientationX.value) panner.orientationX.value = dirX;
      if (dirY != panner.orientationY.value) panner.orientationY.value = dirY;
      if (dirZ != panner.orientationZ.value) panner.orientationZ.value = dirZ;
    } else {
      panner.setOrientation(dirX, dirY, dirZ);
    }
    var oldShift = src.dopplerShift;
    var velX = src.velocity[0];
    var velY = src.velocity[1];
    var velZ = src.velocity[2];
    var lVelX = listener.velocity[0];
    var lVelY = listener.velocity[1];
    var lVelZ = listener.velocity[2];
    if ((posX === lPosX && posY === lPosY && posZ === lPosZ) || (velX === lVelX && velY === lVelY && velZ === lVelZ)) {
      src.dopplerShift = 1;
    } else {
      var speedOfSound = src.context.speedOfSound;
      var dopplerFactor = src.context.dopplerFactor;
      var slX = lPosX - posX;
      var slY = lPosY - posY;
      var slZ = lPosZ - posZ;
      var magSl = Math.sqrt(slX * slX + slY * slY + slZ * slZ);
      var vls = (slX * lVelX + slY * lVelY + slZ * lVelZ) / magSl;
      var vss = (slX * velX + slY * velY + slZ * velZ) / magSl;
      vls = Math.min(vls, speedOfSound / dopplerFactor);
      vss = Math.min(vss, speedOfSound / dopplerFactor);
      src.dopplerShift = (speedOfSound - dopplerFactor * vls) / (speedOfSound - dopplerFactor * vss);
    }
    if (src.dopplerShift !== oldShift) {
      AL.updateSourceRate(src);
    }
  },
  updateSourceRate: (src) => {
    if (src.state === 4114) {
      AL.cancelPendingSourceAudio(src);
      var audioSrc = src.audioQueue[0];
      if (!audioSrc) {
        return;
      }
      var duration;
      if (src.type === 4136 && src.looping) {
        duration = Number.POSITIVE_INFINITY;
      } else {
        duration = (audioSrc.buffer.duration - audioSrc._startOffset) / src.playbackRate;
      }
      audioSrc._duration = duration;
      audioSrc.playbackRate.value = src.playbackRate;
      AL.scheduleSourceAudio(src);
    }
  },
  sourceDuration: (src) => {
    var length = 0;
    for (var i = 0; i < src.bufQueue.length; i++) {
      var audioBuf = src.bufQueue[i].audioBuf;
      length += audioBuf ? audioBuf.duration : 0;
    }
    return length;
  },
  sourceTell: (src) => {
    AL.updateSourceTime(src);
    var offset = 0;
    for (var i = 0; i < src.bufsProcessed; i++) {
      if (src.bufQueue[i].audioBuf) {
        offset += src.bufQueue[i].audioBuf.duration;
      }
    }
    offset += src.bufOffset;
    return offset;
  },
  sourceSeek: (src, offset) => {
    var playing = src.state == 4114;
    if (playing) {
      AL.setSourceState(src, 4113);
    }
    if (src.bufQueue[src.bufsProcessed].audioBuf !== null) {
      src.bufsProcessed = 0;
      while (offset > src.bufQueue[src.bufsProcessed].audioBuf.duration) {
        offset -= src.bufQueue[src.bufsProcessed].audioBuf.duration;
        src.bufsProcessed++;
      }
      src.bufOffset = offset;
    }
    if (playing) {
      AL.setSourceState(src, 4114);
    }
  },
  getGlobalParam: (funcname, param) => {
    if (!AL.currentCtx) {
      return null;
    }
    switch (param) {
      case 49152:
        return AL.currentCtx.dopplerFactor;
      case 49155:
        return AL.currentCtx.speedOfSound;
      case 53248:
        return AL.currentCtx.distanceModel;
      default:
        AL.currentCtx.err = 40962;
        return null;
    }
  },
  setGlobalParam: (funcname, param, value) => {
    if (!AL.currentCtx) {
      return;
    }
    switch (param) {
      case 49152:
        if (!Number.isFinite(value) || value < 0) {
          AL.currentCtx.err = 40963;
          return;
        }
        AL.currentCtx.dopplerFactor = value;
        AL.updateListenerSpace(AL.currentCtx);
        break;
      case 49155:
        if (!Number.isFinite(value) || value <= 0) {
          AL.currentCtx.err = 40963;
          return;
        }
        AL.currentCtx.speedOfSound = value;
        AL.updateListenerSpace(AL.currentCtx);
        break;
      case 53248:
        switch (value) {
          case 0:
          case 53249:
          case 53250:
          case 53251:
          case 53252:
          case 53253:
          case 53254:
            AL.currentCtx.distanceModel = value;
            AL.updateContextGlobal(AL.currentCtx);
            break;
          default:
            AL.currentCtx.err = 40963;
            return;
        }
        break;
      default:
        AL.currentCtx.err = 40962;
        return;
    }
  },
  getListenerParam: (funcname, param) => {
    if (!AL.currentCtx) {
      return null;
    }
    switch (param) {
      case 4100:
        return AL.currentCtx.listener.position;
      case 4102:
        return AL.currentCtx.listener.velocity;
      case 4111:
        return AL.currentCtx.listener.direction.concat(AL.currentCtx.listener.up);
      case 4106:
        return AL.currentCtx.gain.gain.value;
      default:
        AL.currentCtx.err = 40962;
        return null;
    }
  },
  setListenerParam: (funcname, param, value) => {
    if (!AL.currentCtx) {
      return;
    }
    if (value === null) {
      AL.currentCtx.err = 40962;
      return;
    }
    var listener = AL.currentCtx.listener;
    switch (param) {
      case 4100:
        if (!Number.isFinite(value[0]) || !Number.isFinite(value[1]) || !Number.isFinite(value[2])) {
          AL.currentCtx.err = 40963;
          return;
        }
        listener.position[0] = value[0];
        listener.position[1] = value[1];
        listener.position[2] = value[2];
        AL.updateListenerSpace(AL.currentCtx);
        break;
      case 4102:
        if (!Number.isFinite(value[0]) || !Number.isFinite(value[1]) || !Number.isFinite(value[2])) {
          AL.currentCtx.err = 40963;
          return;
        }
        listener.velocity[0] = value[0];
        listener.velocity[1] = value[1];
        listener.velocity[2] = value[2];
        AL.updateListenerSpace(AL.currentCtx);
        break;
      case 4106:
        if (!Number.isFinite(value) || value < 0) {
          AL.currentCtx.err = 40963;
          return;
        }
        AL.currentCtx.gain.gain.value = value;
        break;
      case 4111:
        if (
          !Number.isFinite(value[0]) ||
          !Number.isFinite(value[1]) ||
          !Number.isFinite(value[2]) ||
          !Number.isFinite(value[3]) ||
          !Number.isFinite(value[4]) ||
          !Number.isFinite(value[5])
        ) {
          AL.currentCtx.err = 40963;
          return;
        }
        listener.direction[0] = value[0];
        listener.direction[1] = value[1];
        listener.direction[2] = value[2];
        listener.up[0] = value[3];
        listener.up[1] = value[4];
        listener.up[2] = value[5];
        AL.updateListenerSpace(AL.currentCtx);
        break;
      default:
        AL.currentCtx.err = 40962;
        return;
    }
  },
  getBufferParam: (funcname, bufferId, param) => {
    if (!AL.currentCtx) {
      return;
    }
    var buf = AL.buffers[bufferId];
    if (!buf || bufferId === 0) {
      AL.currentCtx.err = 40961;
      return;
    }
    switch (param) {
      case 8193:
        return buf.frequency;
      case 8194:
        return buf.bytesPerSample * 8;
      case 8195:
        return buf.channels;
      case 8196:
        return buf.length * buf.bytesPerSample * buf.channels;
      case 8213:
        if (buf.length === 0) {
          return [0, 0];
        }
        return [(buf.audioBuf._loopStart || 0) * buf.frequency, (buf.audioBuf._loopEnd || buf.length) * buf.frequency];
      default:
        AL.currentCtx.err = 40962;
        return null;
    }
  },
  setBufferParam: (funcname, bufferId, param, value) => {
    if (!AL.currentCtx) {
      return;
    }
    var buf = AL.buffers[bufferId];
    if (!buf || bufferId === 0) {
      AL.currentCtx.err = 40961;
      return;
    }
    if (value === null) {
      AL.currentCtx.err = 40962;
      return;
    }
    switch (param) {
      case 8196:
        if (value !== 0) {
          AL.currentCtx.err = 40963;
          return;
        }
        break;
      case 8213:
        if (value[0] < 0 || value[0] > buf.length || value[1] < 0 || value[1] > buf.Length || value[0] >= value[1]) {
          AL.currentCtx.err = 40963;
          return;
        }
        if (buf.refCount > 0) {
          AL.currentCtx.err = 40964;
          return;
        }
        if (buf.audioBuf) {
          buf.audioBuf._loopStart = value[0] / buf.frequency;
          buf.audioBuf._loopEnd = value[1] / buf.frequency;
        }
        break;
      default:
        AL.currentCtx.err = 40962;
        return;
    }
  },
  getSourceParam: (funcname, sourceId, param) => {
    if (!AL.currentCtx) {
      return null;
    }
    var src = AL.currentCtx.sources[sourceId];
    if (!src) {
      AL.currentCtx.err = 40961;
      return null;
    }
    switch (param) {
      case 514:
        return src.relative;
      case 4097:
        return src.coneInnerAngle;
      case 4098:
        return src.coneOuterAngle;
      case 4099:
        return src.pitch;
      case 4100:
        return src.position;
      case 4101:
        return src.direction;
      case 4102:
        return src.velocity;
      case 4103:
        return src.looping;
      case 4105:
        if (src.type === 4136) {
          return src.bufQueue[0].id;
        }
        return 0;
      case 4106:
        return src.gain.gain.value;
      case 4109:
        return src.minGain;
      case 4110:
        return src.maxGain;
      case 4112:
        return src.state;
      case 4117:
        if (src.bufQueue.length === 1 && src.bufQueue[0].id === 0) {
          return 0;
        }
        return src.bufQueue.length;
      case 4118:
        if ((src.bufQueue.length === 1 && src.bufQueue[0].id === 0) || src.looping) {
          return 0;
        }
        return src.bufsProcessed;
      case 4128:
        return src.refDistance;
      case 4129:
        return src.rolloffFactor;
      case 4130:
        return src.coneOuterGain;
      case 4131:
        return src.maxDistance;
      case 4132:
        return AL.sourceTell(src);
      case 4133:
        var offset = AL.sourceTell(src);
        if (offset > 0) {
          offset *= src.bufQueue[0].frequency;
        }
        return offset;
      case 4134:
        var offset = AL.sourceTell(src);
        if (offset > 0) {
          offset *= src.bufQueue[0].frequency * src.bufQueue[0].bytesPerSample;
        }
        return offset;
      case 4135:
        return src.type;
      case 4628:
        return src.spatialize;
      case 8201:
        var length = 0;
        var bytesPerFrame = 0;
        for (var i = 0; i < src.bufQueue.length; i++) {
          length += src.bufQueue[i].length;
          if (src.bufQueue[i].id !== 0) {
            bytesPerFrame = src.bufQueue[i].bytesPerSample * src.bufQueue[i].channels;
          }
        }
        return length * bytesPerFrame;
      case 8202:
        var length = 0;
        for (var i = 0; i < src.bufQueue.length; i++) {
          length += src.bufQueue[i].length;
        }
        return length;
      case 8203:
        return AL.sourceDuration(src);
      case 53248:
        return src.distanceModel;
      default:
        AL.currentCtx.err = 40962;
        return null;
    }
  },
  setSourceParam: (funcname, sourceId, param, value) => {
    if (!AL.currentCtx) {
      return;
    }
    var src = AL.currentCtx.sources[sourceId];
    if (!src) {
      AL.currentCtx.err = 40961;
      return;
    }
    if (value === null) {
      AL.currentCtx.err = 40962;
      return;
    }
    switch (param) {
      case 514:
        if (value === 1) {
          src.relative = true;
          AL.updateSourceSpace(src);
        } else if (value === 0) {
          src.relative = false;
          AL.updateSourceSpace(src);
        } else {
          AL.currentCtx.err = 40963;
          return;
        }
        break;
      case 4097:
        if (!Number.isFinite(value)) {
          AL.currentCtx.err = 40963;
          return;
        }
        src.coneInnerAngle = value;
        if (src.panner) {
          src.panner.coneInnerAngle = value % 360;
        }
        break;
      case 4098:
        if (!Number.isFinite(value)) {
          AL.currentCtx.err = 40963;
          return;
        }
        src.coneOuterAngle = value;
        if (src.panner) {
          src.panner.coneOuterAngle = value % 360;
        }
        break;
      case 4099:
        if (!Number.isFinite(value) || value <= 0) {
          AL.currentCtx.err = 40963;
          return;
        }
        if (src.pitch === value) {
          break;
        }
        src.pitch = value;
        AL.updateSourceRate(src);
        break;
      case 4100:
        if (!Number.isFinite(value[0]) || !Number.isFinite(value[1]) || !Number.isFinite(value[2])) {
          AL.currentCtx.err = 40963;
          return;
        }
        src.position[0] = value[0];
        src.position[1] = value[1];
        src.position[2] = value[2];
        AL.updateSourceSpace(src);
        break;
      case 4101:
        if (!Number.isFinite(value[0]) || !Number.isFinite(value[1]) || !Number.isFinite(value[2])) {
          AL.currentCtx.err = 40963;
          return;
        }
        src.direction[0] = value[0];
        src.direction[1] = value[1];
        src.direction[2] = value[2];
        AL.updateSourceSpace(src);
        break;
      case 4102:
        if (!Number.isFinite(value[0]) || !Number.isFinite(value[1]) || !Number.isFinite(value[2])) {
          AL.currentCtx.err = 40963;
          return;
        }
        src.velocity[0] = value[0];
        src.velocity[1] = value[1];
        src.velocity[2] = value[2];
        AL.updateSourceSpace(src);
        break;
      case 4103:
        if (value === 1) {
          src.looping = true;
          AL.updateSourceTime(src);
          if (src.type === 4136 && src.audioQueue.length > 0) {
            var audioSrc = src.audioQueue[0];
            audioSrc.loop = true;
            audioSrc._duration = Number.POSITIVE_INFINITY;
          }
        } else if (value === 0) {
          src.looping = false;
          var currentTime = AL.updateSourceTime(src);
          if (src.type === 4136 && src.audioQueue.length > 0) {
            var audioSrc = src.audioQueue[0];
            audioSrc.loop = false;
            audioSrc._duration = src.bufQueue[0].audioBuf.duration / src.playbackRate;
            audioSrc._startTime = currentTime - src.bufOffset / src.playbackRate;
          }
        } else {
          AL.currentCtx.err = 40963;
          return;
        }
        break;
      case 4105:
        if (src.state === 4114 || src.state === 4115) {
          AL.currentCtx.err = 40964;
          return;
        }
        if (value === 0) {
          for (var i in src.bufQueue) {
            src.bufQueue[i].refCount--;
          }
          src.bufQueue.length = 1;
          src.bufQueue[0] = AL.buffers[0];
          src.bufsProcessed = 0;
          src.type = 4144;
        } else {
          var buf = AL.buffers[value];
          if (!buf) {
            AL.currentCtx.err = 40963;
            return;
          }
          for (var i in src.bufQueue) {
            src.bufQueue[i].refCount--;
          }
          src.bufQueue.length = 0;
          buf.refCount++;
          src.bufQueue = [buf];
          src.bufsProcessed = 0;
          src.type = 4136;
        }
        AL.initSourcePanner(src);
        AL.scheduleSourceAudio(src);
        break;
      case 4106:
        if (!Number.isFinite(value) || value < 0) {
          AL.currentCtx.err = 40963;
          return;
        }
        src.gain.gain.value = value;
        break;
      case 4109:
        if (!Number.isFinite(value) || value < 0 || value > Math.min(src.maxGain, 1)) {
          AL.currentCtx.err = 40963;
          return;
        }
        src.minGain = value;
        break;
      case 4110:
        if (!Number.isFinite(value) || value < Math.max(0, src.minGain) || value > 1) {
          AL.currentCtx.err = 40963;
          return;
        }
        src.maxGain = value;
        break;
      case 4128:
        if (!Number.isFinite(value) || value < 0) {
          AL.currentCtx.err = 40963;
          return;
        }
        src.refDistance = value;
        if (src.panner) {
          src.panner.refDistance = value;
        }
        break;
      case 4129:
        if (!Number.isFinite(value) || value < 0) {
          AL.currentCtx.err = 40963;
          return;
        }
        src.rolloffFactor = value;
        if (src.panner) {
          src.panner.rolloffFactor = value;
        }
        break;
      case 4130:
        if (!Number.isFinite(value) || value < 0 || value > 1) {
          AL.currentCtx.err = 40963;
          return;
        }
        src.coneOuterGain = value;
        if (src.panner) {
          src.panner.coneOuterGain = value;
        }
        break;
      case 4131:
        if (!Number.isFinite(value) || value < 0) {
          AL.currentCtx.err = 40963;
          return;
        }
        src.maxDistance = value;
        if (src.panner) {
          src.panner.maxDistance = value;
        }
        break;
      case 4132:
        if (value < 0 || value > AL.sourceDuration(src)) {
          AL.currentCtx.err = 40963;
          return;
        }
        AL.sourceSeek(src, value);
        break;
      case 4133:
        var srcLen = AL.sourceDuration(src);
        if (srcLen > 0) {
          var frequency;
          for (var bufId in src.bufQueue) {
            if (bufId) {
              frequency = src.bufQueue[bufId].frequency;
              break;
            }
          }
          value /= frequency;
        }
        if (value < 0 || value > srcLen) {
          AL.currentCtx.err = 40963;
          return;
        }
        AL.sourceSeek(src, value);
        break;
      case 4134:
        var srcLen = AL.sourceDuration(src);
        if (srcLen > 0) {
          var bytesPerSec;
          for (var bufId in src.bufQueue) {
            if (bufId) {
              var buf = src.bufQueue[bufId];
              bytesPerSec = buf.frequency * buf.bytesPerSample * buf.channels;
              break;
            }
          }
          value /= bytesPerSec;
        }
        if (value < 0 || value > srcLen) {
          AL.currentCtx.err = 40963;
          return;
        }
        AL.sourceSeek(src, value);
        break;
      case 4628:
        if (value !== 0 && value !== 1 && value !== 2) {
          AL.currentCtx.err = 40963;
          return;
        }
        src.spatialize = value;
        AL.initSourcePanner(src);
        break;
      case 8201:
      case 8202:
      case 8203:
        AL.currentCtx.err = 40964;
        break;
      case 53248:
        switch (value) {
          case 0:
          case 53249:
          case 53250:
          case 53251:
          case 53252:
          case 53253:
          case 53254:
            src.distanceModel = value;
            if (AL.currentCtx.sourceDistanceModel) {
              AL.updateContextGlobal(AL.currentCtx);
            }
            break;
          default:
            AL.currentCtx.err = 40963;
            return;
        }
        break;
      default:
        AL.currentCtx.err = 40962;
        return;
    }
  },
  captures: {},
  sharedCaptureAudioCtx: null,
  requireValidCaptureDevice: (deviceId, funcname) => {
    if (deviceId === 0) {
      AL.alcErr = 40961;
      return null;
    }
    var c = AL.captures[deviceId];
    if (!c) {
      AL.alcErr = 40961;
      return null;
    }
    var err = c.mediaStreamError;
    if (err) {
      AL.alcErr = 40961;
      return null;
    }
    return c;
  }
};
var _alBuffer3f = (bufferId, param, value0, value1, value2) => {
  AL.setBufferParam("alBuffer3f", bufferId, param, null);
};
var _alBuffer3i = (bufferId, param, value0, value1, value2) => {
  AL.setBufferParam("alBuffer3i", bufferId, param, null);
};
var _alBufferData = (bufferId, format, pData, size, freq) => {
  if (!AL.currentCtx) {
    return;
  }
  var buf = AL.buffers[bufferId];
  if (!buf) {
    AL.currentCtx.err = 40963;
    return;
  }
  if (freq <= 0) {
    AL.currentCtx.err = 40963;
    return;
  }
  var audioBuf = null;
  try {
    switch (format) {
      case 4352:
        if (size > 0) {
          audioBuf = AL.currentCtx.audioCtx.createBuffer(1, size, freq);
          var channel0 = audioBuf.getChannelData(0);
          for (var i = 0; i < size; ++i) {
            channel0[i] = HEAPU8[pData++] * 0.0078125 - 1;
          }
        }
        buf.bytesPerSample = 1;
        buf.channels = 1;
        buf.length = size;
        break;
      case 4353:
        if (size > 0) {
          audioBuf = AL.currentCtx.audioCtx.createBuffer(1, size >> 1, freq);
          var channel0 = audioBuf.getChannelData(0);
          pData >>= 1;
          for (var i = 0; i < size >> 1; ++i) {
            channel0[i] = HEAP16[pData++] * 30517578125e-15;
          }
        }
        buf.bytesPerSample = 2;
        buf.channels = 1;
        buf.length = size >> 1;
        break;
      case 4354:
        if (size > 0) {
          audioBuf = AL.currentCtx.audioCtx.createBuffer(2, size >> 1, freq);
          var channel0 = audioBuf.getChannelData(0);
          var channel1 = audioBuf.getChannelData(1);
          for (var i = 0; i < size >> 1; ++i) {
            channel0[i] = HEAPU8[pData++] * 0.0078125 - 1;
            channel1[i] = HEAPU8[pData++] * 0.0078125 - 1;
          }
        }
        buf.bytesPerSample = 1;
        buf.channels = 2;
        buf.length = size >> 1;
        break;
      case 4355:
        if (size > 0) {
          audioBuf = AL.currentCtx.audioCtx.createBuffer(2, size >> 2, freq);
          var channel0 = audioBuf.getChannelData(0);
          var channel1 = audioBuf.getChannelData(1);
          pData >>= 1;
          for (var i = 0; i < size >> 2; ++i) {
            channel0[i] = HEAP16[pData++] * 30517578125e-15;
            channel1[i] = HEAP16[pData++] * 30517578125e-15;
          }
        }
        buf.bytesPerSample = 2;
        buf.channels = 2;
        buf.length = size >> 2;
        break;
      case 65552:
        if (size > 0) {
          audioBuf = AL.currentCtx.audioCtx.createBuffer(1, size >> 2, freq);
          var channel0 = audioBuf.getChannelData(0);
          pData >>= 2;
          for (var i = 0; i < size >> 2; ++i) {
            channel0[i] = HEAPF32[pData++];
          }
        }
        buf.bytesPerSample = 4;
        buf.channels = 1;
        buf.length = size >> 2;
        break;
      case 65553:
        if (size > 0) {
          audioBuf = AL.currentCtx.audioCtx.createBuffer(2, size >> 3, freq);
          var channel0 = audioBuf.getChannelData(0);
          var channel1 = audioBuf.getChannelData(1);
          pData >>= 2;
          for (var i = 0; i < size >> 3; ++i) {
            channel0[i] = HEAPF32[pData++];
            channel1[i] = HEAPF32[pData++];
          }
        }
        buf.bytesPerSample = 4;
        buf.channels = 2;
        buf.length = size >> 3;
        break;
      default:
        AL.currentCtx.err = 40963;
        return;
    }
    buf.frequency = freq;
    buf.audioBuf = audioBuf;
  } catch (e) {
    AL.currentCtx.err = 40963;
    return;
  }
};
var _alBufferf = (bufferId, param, value) => {
  AL.setBufferParam("alBufferf", bufferId, param, null);
};
var _alBufferfv = (bufferId, param, pValues) => {
  if (!AL.currentCtx) {
    return;
  }
  if (!pValues) {
    AL.currentCtx.err = 40963;
    return;
  }
  AL.setBufferParam("alBufferfv", bufferId, param, null);
};
var _alBufferi = (bufferId, param, value) => {
  AL.setBufferParam("alBufferi", bufferId, param, null);
};
var _alBufferiv = (bufferId, param, pValues) => {
  if (!AL.currentCtx) {
    return;
  }
  if (!pValues) {
    AL.currentCtx.err = 40963;
    return;
  }
  switch (param) {
    case 8213:
      AL.paramArray[0] = HEAP32[pValues >> 2];
      AL.paramArray[1] = HEAP32[(pValues + 4) >> 2];
      AL.setBufferParam("alBufferiv", bufferId, param, AL.paramArray);
      break;
    default:
      AL.setBufferParam("alBufferiv", bufferId, param, null);
      break;
  }
};
var _alDeleteBuffers = (count, pBufferIds) => {
  if (!AL.currentCtx) {
    return;
  }
  for (var i = 0; i < count; ++i) {
    var bufId = HEAP32[(pBufferIds + i * 4) >> 2];
    if (bufId === 0) {
      continue;
    }
    if (!AL.buffers[bufId]) {
      AL.currentCtx.err = 40961;
      return;
    }
    if (AL.buffers[bufId].refCount) {
      AL.currentCtx.err = 40964;
      return;
    }
  }
  for (var i = 0; i < count; ++i) {
    var bufId = HEAP32[(pBufferIds + i * 4) >> 2];
    if (bufId === 0) {
      continue;
    }
    AL.deviceRefCounts[AL.buffers[bufId].deviceId]--;
    delete AL.buffers[bufId];
    AL.freeIds.push(bufId);
  }
};
var _alSourcei = (sourceId, param, value) => {
  switch (param) {
    case 514:
    case 4097:
    case 4098:
    case 4103:
    case 4105:
    case 4128:
    case 4129:
    case 4131:
    case 4132:
    case 4133:
    case 4134:
    case 4628:
    case 8201:
    case 8202:
    case 53248:
      AL.setSourceParam("alSourcei", sourceId, param, value);
      break;
    default:
      AL.setSourceParam("alSourcei", sourceId, param, null);
      break;
  }
};
var _alDeleteSources = (count, pSourceIds) => {
  if (!AL.currentCtx) {
    return;
  }
  for (var i = 0; i < count; ++i) {
    var srcId = HEAP32[(pSourceIds + i * 4) >> 2];
    if (!AL.currentCtx.sources[srcId]) {
      AL.currentCtx.err = 40961;
      return;
    }
  }
  for (var i = 0; i < count; ++i) {
    var srcId = HEAP32[(pSourceIds + i * 4) >> 2];
    AL.setSourceState(AL.currentCtx.sources[srcId], 4116);
    _alSourcei(srcId, 4105, 0);
    delete AL.currentCtx.sources[srcId];
    AL.freeIds.push(srcId);
  }
};
var _alDisable = (param) => {
  if (!AL.currentCtx) {
    return;
  }
  switch (param) {
    case 512:
      AL.currentCtx.sourceDistanceModel = false;
      AL.updateContextGlobal(AL.currentCtx);
      break;
    default:
      AL.currentCtx.err = 40962;
      return;
  }
};
var _alDistanceModel = (model) => {
  AL.setGlobalParam("alDistanceModel", 53248, model);
};
var _alDopplerFactor = (value) => {
  AL.setGlobalParam("alDopplerFactor", 49152, value);
};
var _alDopplerVelocity = (value) => {
  warnOnce(
    "alDopplerVelocity() is deprecated, and only kept for compatibility with OpenAL 1.0. Use alSpeedOfSound() instead."
  );
  if (!AL.currentCtx) {
    return;
  }
  if (value <= 0) {
    AL.currentCtx.err = 40963;
    return;
  }
};
var _alEnable = (param) => {
  if (!AL.currentCtx) {
    return;
  }
  switch (param) {
    case 512:
      AL.currentCtx.sourceDistanceModel = true;
      AL.updateContextGlobal(AL.currentCtx);
      break;
    default:
      AL.currentCtx.err = 40962;
      return;
  }
};
var _alGenBuffers = (count, pBufferIds) => {
  if (!AL.currentCtx) {
    return;
  }
  for (var i = 0; i < count; ++i) {
    var buf = {
      deviceId: AL.currentCtx.deviceId,
      id: AL.newId(),
      refCount: 0,
      audioBuf: null,
      frequency: 0,
      bytesPerSample: 2,
      channels: 1,
      length: 0
    };
    AL.deviceRefCounts[buf.deviceId]++;
    AL.buffers[buf.id] = buf;
    HEAP32[(pBufferIds + i * 4) >> 2] = buf.id;
  }
};
var _alGenSources = (count, pSourceIds) => {
  if (!AL.currentCtx) {
    return;
  }
  for (var i = 0; i < count; ++i) {
    var gain = AL.currentCtx.audioCtx.createGain();
    gain.connect(AL.currentCtx.gain);
    var src = {
      context: AL.currentCtx,
      id: AL.newId(),
      type: 4144,
      state: 4113,
      bufQueue: [AL.buffers[0]],
      audioQueue: [],
      looping: false,
      pitch: 1,
      dopplerShift: 1,
      gain,
      minGain: 0,
      maxGain: 1,
      panner: null,
      bufsProcessed: 0,
      bufStartTime: Number.NEGATIVE_INFINITY,
      bufOffset: 0,
      relative: false,
      refDistance: 1,
      maxDistance: 340282e33,
      rolloffFactor: 1,
      position: [0, 0, 0],
      velocity: [0, 0, 0],
      direction: [0, 0, 0],
      coneOuterGain: 0,
      coneInnerAngle: 360,
      coneOuterAngle: 360,
      distanceModel: 53250,
      spatialize: 2,
      get playbackRate() {
        return this.pitch * this.dopplerShift;
      }
    };
    AL.currentCtx.sources[src.id] = src;
    HEAP32[(pSourceIds + i * 4) >> 2] = src.id;
  }
};
var _alGetBoolean = (param) => {
  var val = AL.getGlobalParam("alGetBoolean", param);
  if (val === null) {
    return 0;
  }
  switch (param) {
    case 49152:
    case 49155:
    case 53248:
      return val !== 0 ? 1 : 0;
    default:
      AL.currentCtx.err = 40962;
      return 0;
  }
};
var _alGetBooleanv = (param, pValues) => {
  var val = AL.getGlobalParam("alGetBooleanv", param);
  if (val === null || !pValues) {
    return;
  }
  switch (param) {
    case 49152:
    case 49155:
    case 53248:
      HEAP8[pValues] = val;
      break;
    default:
      AL.currentCtx.err = 40962;
      return;
  }
};
var _alGetBuffer3f = (bufferId, param, pValue0, pValue1, pValue2) => {
  var val = AL.getBufferParam("alGetBuffer3f", bufferId, param);
  if (val === null) {
    return;
  }
  if (!pValue0 || !pValue1 || !pValue2) {
    AL.currentCtx.err = 40963;
    return;
  }
  AL.currentCtx.err = 40962;
};
var _alGetBuffer3i = (bufferId, param, pValue0, pValue1, pValue2) => {
  var val = AL.getBufferParam("alGetBuffer3i", bufferId, param);
  if (val === null) {
    return;
  }
  if (!pValue0 || !pValue1 || !pValue2) {
    AL.currentCtx.err = 40963;
    return;
  }
  AL.currentCtx.err = 40962;
};
var _alGetBufferf = (bufferId, param, pValue) => {
  var val = AL.getBufferParam("alGetBufferf", bufferId, param);
  if (val === null) {
    return;
  }
  if (!pValue) {
    AL.currentCtx.err = 40963;
    return;
  }
  AL.currentCtx.err = 40962;
};
var _alGetBufferfv = (bufferId, param, pValues) => {
  var val = AL.getBufferParam("alGetBufferfv", bufferId, param);
  if (val === null) {
    return;
  }
  if (!pValues) {
    AL.currentCtx.err = 40963;
    return;
  }
  AL.currentCtx.err = 40962;
};
var _alGetBufferi = (bufferId, param, pValue) => {
  var val = AL.getBufferParam("alGetBufferi", bufferId, param);
  if (val === null) {
    return;
  }
  if (!pValue) {
    AL.currentCtx.err = 40963;
    return;
  }
  switch (param) {
    case 8193:
    case 8194:
    case 8195:
    case 8196:
      HEAP32[pValue >> 2] = val;
      break;
    default:
      AL.currentCtx.err = 40962;
      return;
  }
};
var _alGetBufferiv = (bufferId, param, pValues) => {
  var val = AL.getBufferParam("alGetBufferiv", bufferId, param);
  if (val === null) {
    return;
  }
  if (!pValues) {
    AL.currentCtx.err = 40963;
    return;
  }
  switch (param) {
    case 8193:
    case 8194:
    case 8195:
    case 8196:
      HEAP32[pValues >> 2] = val;
      break;
    case 8213:
      HEAP32[pValues >> 2] = val[0];
      HEAP32[(pValues + 4) >> 2] = val[1];
      break;
    default:
      AL.currentCtx.err = 40962;
      return;
  }
};
var _alGetDouble = (param) => {
  var val = AL.getGlobalParam("alGetDouble", param);
  if (val === null) {
    return 0;
  }
  switch (param) {
    case 49152:
    case 49155:
    case 53248:
      return val;
    default:
      AL.currentCtx.err = 40962;
      return 0;
  }
};
var _alGetDoublev = (param, pValues) => {
  var val = AL.getGlobalParam("alGetDoublev", param);
  if (val === null || !pValues) {
    return;
  }
  switch (param) {
    case 49152:
    case 49155:
    case 53248:
      HEAPF64[pValues >> 3] = val;
      break;
    default:
      AL.currentCtx.err = 40962;
      return;
  }
};
var _alGetEnumValue = (pEnumName) => {
  if (!AL.currentCtx) {
    return 0;
  }
  if (!pEnumName) {
    AL.currentCtx.err = 40963;
    return 0;
  }
  var name = UTF8ToString(pEnumName);
  switch (name) {
    case "AL_BITS":
      return 8194;
    case "AL_BUFFER":
      return 4105;
    case "AL_BUFFERS_PROCESSED":
      return 4118;
    case "AL_BUFFERS_QUEUED":
      return 4117;
    case "AL_BYTE_OFFSET":
      return 4134;
    case "AL_CHANNELS":
      return 8195;
    case "AL_CONE_INNER_ANGLE":
      return 4097;
    case "AL_CONE_OUTER_ANGLE":
      return 4098;
    case "AL_CONE_OUTER_GAIN":
      return 4130;
    case "AL_DIRECTION":
      return 4101;
    case "AL_DISTANCE_MODEL":
      return 53248;
    case "AL_DOPPLER_FACTOR":
      return 49152;
    case "AL_DOPPLER_VELOCITY":
      return 49153;
    case "AL_EXPONENT_DISTANCE":
      return 53253;
    case "AL_EXPONENT_DISTANCE_CLAMPED":
      return 53254;
    case "AL_EXTENSIONS":
      return 45060;
    case "AL_FORMAT_MONO16":
      return 4353;
    case "AL_FORMAT_MONO8":
      return 4352;
    case "AL_FORMAT_STEREO16":
      return 4355;
    case "AL_FORMAT_STEREO8":
      return 4354;
    case "AL_FREQUENCY":
      return 8193;
    case "AL_GAIN":
      return 4106;
    case "AL_INITIAL":
      return 4113;
    case "AL_INVALID":
      return -1;
    case "AL_ILLEGAL_ENUM":
    case "AL_INVALID_ENUM":
      return 40962;
    case "AL_INVALID_NAME":
      return 40961;
    case "AL_ILLEGAL_COMMAND":
    case "AL_INVALID_OPERATION":
      return 40964;
    case "AL_INVALID_VALUE":
      return 40963;
    case "AL_INVERSE_DISTANCE":
      return 53249;
    case "AL_INVERSE_DISTANCE_CLAMPED":
      return 53250;
    case "AL_LINEAR_DISTANCE":
      return 53251;
    case "AL_LINEAR_DISTANCE_CLAMPED":
      return 53252;
    case "AL_LOOPING":
      return 4103;
    case "AL_MAX_DISTANCE":
      return 4131;
    case "AL_MAX_GAIN":
      return 4110;
    case "AL_MIN_GAIN":
      return 4109;
    case "AL_NONE":
      return 0;
    case "AL_NO_ERROR":
      return 0;
    case "AL_ORIENTATION":
      return 4111;
    case "AL_OUT_OF_MEMORY":
      return 40965;
    case "AL_PAUSED":
      return 4115;
    case "AL_PENDING":
      return 8209;
    case "AL_PITCH":
      return 4099;
    case "AL_PLAYING":
      return 4114;
    case "AL_POSITION":
      return 4100;
    case "AL_PROCESSED":
      return 8210;
    case "AL_REFERENCE_DISTANCE":
      return 4128;
    case "AL_RENDERER":
      return 45059;
    case "AL_ROLLOFF_FACTOR":
      return 4129;
    case "AL_SAMPLE_OFFSET":
      return 4133;
    case "AL_SEC_OFFSET":
      return 4132;
    case "AL_SIZE":
      return 8196;
    case "AL_SOURCE_RELATIVE":
      return 514;
    case "AL_SOURCE_STATE":
      return 4112;
    case "AL_SOURCE_TYPE":
      return 4135;
    case "AL_SPEED_OF_SOUND":
      return 49155;
    case "AL_STATIC":
      return 4136;
    case "AL_STOPPED":
      return 4116;
    case "AL_STREAMING":
      return 4137;
    case "AL_UNDETERMINED":
      return 4144;
    case "AL_UNUSED":
      return 8208;
    case "AL_VELOCITY":
      return 4102;
    case "AL_VENDOR":
      return 45057;
    case "AL_VERSION":
      return 45058;
    case "AL_AUTO_SOFT":
      return 2;
    case "AL_SOURCE_DISTANCE_MODEL":
      return 512;
    case "AL_SOURCE_SPATIALIZE_SOFT":
      return 4628;
    case "AL_LOOP_POINTS_SOFT":
      return 8213;
    case "AL_BYTE_LENGTH_SOFT":
      return 8201;
    case "AL_SAMPLE_LENGTH_SOFT":
      return 8202;
    case "AL_SEC_LENGTH_SOFT":
      return 8203;
    case "AL_FORMAT_MONO_FLOAT32":
      return 65552;
    case "AL_FORMAT_STEREO_FLOAT32":
      return 65553;
    default:
      AL.currentCtx.err = 40963;
      return 0;
  }
};
var _alGetError = () => {
  if (!AL.currentCtx) {
    return 40964;
  }
  var err = AL.currentCtx.err;
  AL.currentCtx.err = 0;
  return err;
};
var _alGetFloat = (param) => {
  var val = AL.getGlobalParam("alGetFloat", param);
  if (val === null) {
    return 0;
  }
  switch (param) {
    case 49152:
    case 49155:
    case 53248:
      return val;
    default:
      return 0;
  }
};
var _alGetFloatv = (param, pValues) => {
  var val = AL.getGlobalParam("alGetFloatv", param);
  if (val === null || !pValues) {
    return;
  }
  switch (param) {
    case 49152:
    case 49155:
    case 53248:
      HEAPF32[pValues >> 2] = val;
      break;
    default:
      AL.currentCtx.err = 40962;
      return;
  }
};
var _alGetInteger = (param) => {
  var val = AL.getGlobalParam("alGetInteger", param);
  if (val === null) {
    return 0;
  }
  switch (param) {
    case 49152:
    case 49155:
    case 53248:
      return val;
    default:
      AL.currentCtx.err = 40962;
      return 0;
  }
};
var _alGetIntegerv = (param, pValues) => {
  var val = AL.getGlobalParam("alGetIntegerv", param);
  if (val === null || !pValues) {
    return;
  }
  switch (param) {
    case 49152:
    case 49155:
    case 53248:
      HEAP32[pValues >> 2] = val;
      break;
    default:
      AL.currentCtx.err = 40962;
      return;
  }
};
var _alGetListener3f = (param, pValue0, pValue1, pValue2) => {
  var val = AL.getListenerParam("alGetListener3f", param);
  if (val === null) {
    return;
  }
  if (!pValue0 || !pValue1 || !pValue2) {
    AL.currentCtx.err = 40963;
    return;
  }
  switch (param) {
    case 4100:
    case 4102:
      HEAPF32[pValue0 >> 2] = val[0];
      HEAPF32[pValue1 >> 2] = val[1];
      HEAPF32[pValue2 >> 2] = val[2];
      break;
    default:
      AL.currentCtx.err = 40962;
      return;
  }
};
var _alGetListener3i = (param, pValue0, pValue1, pValue2) => {
  var val = AL.getListenerParam("alGetListener3i", param);
  if (val === null) {
    return;
  }
  if (!pValue0 || !pValue1 || !pValue2) {
    AL.currentCtx.err = 40963;
    return;
  }
  switch (param) {
    case 4100:
    case 4102:
      HEAP32[pValue0 >> 2] = val[0];
      HEAP32[pValue1 >> 2] = val[1];
      HEAP32[pValue2 >> 2] = val[2];
      break;
    default:
      AL.currentCtx.err = 40962;
      return;
  }
};
var _alGetListenerf = (param, pValue) => {
  var val = AL.getListenerParam("alGetListenerf", param);
  if (val === null) {
    return;
  }
  if (!pValue) {
    AL.currentCtx.err = 40963;
    return;
  }
  switch (param) {
    case 4106:
      HEAPF32[pValue >> 2] = val;
      break;
    default:
      AL.currentCtx.err = 40962;
      return;
  }
};
var _alGetListenerfv = (param, pValues) => {
  var val = AL.getListenerParam("alGetListenerfv", param);
  if (val === null) {
    return;
  }
  if (!pValues) {
    AL.currentCtx.err = 40963;
    return;
  }
  switch (param) {
    case 4100:
    case 4102:
      HEAPF32[pValues >> 2] = val[0];
      HEAPF32[(pValues + 4) >> 2] = val[1];
      HEAPF32[(pValues + 8) >> 2] = val[2];
      break;
    case 4111:
      HEAPF32[pValues >> 2] = val[0];
      HEAPF32[(pValues + 4) >> 2] = val[1];
      HEAPF32[(pValues + 8) >> 2] = val[2];
      HEAPF32[(pValues + 12) >> 2] = val[3];
      HEAPF32[(pValues + 16) >> 2] = val[4];
      HEAPF32[(pValues + 20) >> 2] = val[5];
      break;
    default:
      AL.currentCtx.err = 40962;
      return;
  }
};
var _alGetListeneri = (param, pValue) => {
  var val = AL.getListenerParam("alGetListeneri", param);
  if (val === null) {
    return;
  }
  if (!pValue) {
    AL.currentCtx.err = 40963;
    return;
  }
  AL.currentCtx.err = 40962;
};
var _alGetListeneriv = (param, pValues) => {
  var val = AL.getListenerParam("alGetListeneriv", param);
  if (val === null) {
    return;
  }
  if (!pValues) {
    AL.currentCtx.err = 40963;
    return;
  }
  switch (param) {
    case 4100:
    case 4102:
      HEAP32[pValues >> 2] = val[0];
      HEAP32[(pValues + 4) >> 2] = val[1];
      HEAP32[(pValues + 8) >> 2] = val[2];
      break;
    case 4111:
      HEAP32[pValues >> 2] = val[0];
      HEAP32[(pValues + 4) >> 2] = val[1];
      HEAP32[(pValues + 8) >> 2] = val[2];
      HEAP32[(pValues + 12) >> 2] = val[3];
      HEAP32[(pValues + 16) >> 2] = val[4];
      HEAP32[(pValues + 20) >> 2] = val[5];
      break;
    default:
      AL.currentCtx.err = 40962;
      return;
  }
};
var _alGetSource3f = (sourceId, param, pValue0, pValue1, pValue2) => {
  var val = AL.getSourceParam("alGetSource3f", sourceId, param);
  if (val === null) {
    return;
  }
  if (!pValue0 || !pValue1 || !pValue2) {
    AL.currentCtx.err = 40963;
    return;
  }
  switch (param) {
    case 4100:
    case 4101:
    case 4102:
      HEAPF32[pValue0 >> 2] = val[0];
      HEAPF32[pValue1 >> 2] = val[1];
      HEAPF32[pValue2 >> 2] = val[2];
      break;
    default:
      AL.currentCtx.err = 40962;
      return;
  }
};
var _alGetSource3i = (sourceId, param, pValue0, pValue1, pValue2) => {
  var val = AL.getSourceParam("alGetSource3i", sourceId, param);
  if (val === null) {
    return;
  }
  if (!pValue0 || !pValue1 || !pValue2) {
    AL.currentCtx.err = 40963;
    return;
  }
  switch (param) {
    case 4100:
    case 4101:
    case 4102:
      HEAP32[pValue0 >> 2] = val[0];
      HEAP32[pValue1 >> 2] = val[1];
      HEAP32[pValue2 >> 2] = val[2];
      break;
    default:
      AL.currentCtx.err = 40962;
      return;
  }
};
var _alGetSourcef = (sourceId, param, pValue) => {
  var val = AL.getSourceParam("alGetSourcef", sourceId, param);
  if (val === null) {
    return;
  }
  if (!pValue) {
    AL.currentCtx.err = 40963;
    return;
  }
  switch (param) {
    case 4097:
    case 4098:
    case 4099:
    case 4106:
    case 4109:
    case 4110:
    case 4128:
    case 4129:
    case 4130:
    case 4131:
    case 4132:
    case 4133:
    case 4134:
    case 8203:
      HEAPF32[pValue >> 2] = val;
      break;
    default:
      AL.currentCtx.err = 40962;
      return;
  }
};
var _alGetSourcefv = (sourceId, param, pValues) => {
  var val = AL.getSourceParam("alGetSourcefv", sourceId, param);
  if (val === null) {
    return;
  }
  if (!pValues) {
    AL.currentCtx.err = 40963;
    return;
  }
  switch (param) {
    case 4097:
    case 4098:
    case 4099:
    case 4106:
    case 4109:
    case 4110:
    case 4128:
    case 4129:
    case 4130:
    case 4131:
    case 4132:
    case 4133:
    case 4134:
    case 8203:
      HEAPF32[pValues >> 2] = val[0];
      break;
    case 4100:
    case 4101:
    case 4102:
      HEAPF32[pValues >> 2] = val[0];
      HEAPF32[(pValues + 4) >> 2] = val[1];
      HEAPF32[(pValues + 8) >> 2] = val[2];
      break;
    default:
      AL.currentCtx.err = 40962;
      return;
  }
};
var _alGetSourcei = (sourceId, param, pValue) => {
  var val = AL.getSourceParam("alGetSourcei", sourceId, param);
  if (val === null) {
    return;
  }
  if (!pValue) {
    AL.currentCtx.err = 40963;
    return;
  }
  switch (param) {
    case 514:
    case 4097:
    case 4098:
    case 4103:
    case 4105:
    case 4112:
    case 4117:
    case 4118:
    case 4128:
    case 4129:
    case 4131:
    case 4132:
    case 4133:
    case 4134:
    case 4135:
    case 4628:
    case 8201:
    case 8202:
    case 53248:
      HEAP32[pValue >> 2] = val;
      break;
    default:
      AL.currentCtx.err = 40962;
      return;
  }
};
var _alGetSourceiv = (sourceId, param, pValues) => {
  var val = AL.getSourceParam("alGetSourceiv", sourceId, param);
  if (val === null) {
    return;
  }
  if (!pValues) {
    AL.currentCtx.err = 40963;
    return;
  }
  switch (param) {
    case 514:
    case 4097:
    case 4098:
    case 4103:
    case 4105:
    case 4112:
    case 4117:
    case 4118:
    case 4128:
    case 4129:
    case 4131:
    case 4132:
    case 4133:
    case 4134:
    case 4135:
    case 4628:
    case 8201:
    case 8202:
    case 53248:
      HEAP32[pValues >> 2] = val;
      break;
    case 4100:
    case 4101:
    case 4102:
      HEAP32[pValues >> 2] = val[0];
      HEAP32[(pValues + 4) >> 2] = val[1];
      HEAP32[(pValues + 8) >> 2] = val[2];
      break;
    default:
      AL.currentCtx.err = 40962;
      return;
  }
};
var stringToNewUTF8 = (str) => {
  var size = lengthBytesUTF8(str) + 1;
  var ret = _malloc(size);
  if (ret) stringToUTF8(str, ret, size);
  return ret;
};
var _alGetString = (param) => {
  if (AL.stringCache[param]) {
    return AL.stringCache[param];
  }
  var ret;
  switch (param) {
    case 0:
      ret = "No Error";
      break;
    case 40961:
      ret = "Invalid Name";
      break;
    case 40962:
      ret = "Invalid Enum";
      break;
    case 40963:
      ret = "Invalid Value";
      break;
    case 40964:
      ret = "Invalid Operation";
      break;
    case 40965:
      ret = "Out of Memory";
      break;
    case 45057:
      ret = "Emscripten";
      break;
    case 45058:
      ret = "1.1";
      break;
    case 45059:
      ret = "WebAudio";
      break;
    case 45060:
      ret = Object.keys(AL.AL_EXTENSIONS).join(" ");
      break;
    default:
      if (AL.currentCtx) {
        AL.currentCtx.err = 40962;
      } else {
      }
      return 0;
  }
  ret = stringToNewUTF8(ret);
  AL.stringCache[param] = ret;
  return ret;
};
var _alIsBuffer = (bufferId) => {
  if (!AL.currentCtx) {
    return false;
  }
  if (bufferId > AL.buffers.length) {
    return false;
  }
  if (!AL.buffers[bufferId]) {
    return false;
  }
  return true;
};
var _alIsEnabled = (param) => {
  if (!AL.currentCtx) {
    return 0;
  }
  switch (param) {
    case 512:
      return AL.currentCtx.sourceDistanceModel ? 0 : 1;
    default:
      AL.currentCtx.err = 40962;
      return 0;
  }
};
var _alIsExtensionPresent = (pExtName) => {
  var name = UTF8ToString(pExtName);
  return AL.AL_EXTENSIONS[name] ? 1 : 0;
};
var _alIsSource = (sourceId) => {
  if (!AL.currentCtx) {
    return false;
  }
  if (!AL.currentCtx.sources[sourceId]) {
    return false;
  }
  return true;
};
var _alListener3f = (param, value0, value1, value2) => {
  switch (param) {
    case 4100:
    case 4102:
      AL.paramArray[0] = value0;
      AL.paramArray[1] = value1;
      AL.paramArray[2] = value2;
      AL.setListenerParam("alListener3f", param, AL.paramArray);
      break;
    default:
      AL.setListenerParam("alListener3f", param, null);
      break;
  }
};
var _alListener3i = (param, value0, value1, value2) => {
  switch (param) {
    case 4100:
    case 4102:
      AL.paramArray[0] = value0;
      AL.paramArray[1] = value1;
      AL.paramArray[2] = value2;
      AL.setListenerParam("alListener3i", param, AL.paramArray);
      break;
    default:
      AL.setListenerParam("alListener3i", param, null);
      break;
  }
};
var _alListenerf = (param, value) => {
  switch (param) {
    case 4106:
      AL.setListenerParam("alListenerf", param, value);
      break;
    default:
      AL.setListenerParam("alListenerf", param, null);
      break;
  }
};
var _alListenerfv = (param, pValues) => {
  if (!AL.currentCtx) {
    return;
  }
  if (!pValues) {
    AL.currentCtx.err = 40963;
    return;
  }
  switch (param) {
    case 4100:
    case 4102:
      AL.paramArray[0] = HEAPF32[pValues >> 2];
      AL.paramArray[1] = HEAPF32[(pValues + 4) >> 2];
      AL.paramArray[2] = HEAPF32[(pValues + 8) >> 2];
      AL.setListenerParam("alListenerfv", param, AL.paramArray);
      break;
    case 4111:
      AL.paramArray[0] = HEAPF32[pValues >> 2];
      AL.paramArray[1] = HEAPF32[(pValues + 4) >> 2];
      AL.paramArray[2] = HEAPF32[(pValues + 8) >> 2];
      AL.paramArray[3] = HEAPF32[(pValues + 12) >> 2];
      AL.paramArray[4] = HEAPF32[(pValues + 16) >> 2];
      AL.paramArray[5] = HEAPF32[(pValues + 20) >> 2];
      AL.setListenerParam("alListenerfv", param, AL.paramArray);
      break;
    default:
      AL.setListenerParam("alListenerfv", param, null);
      break;
  }
};
var _alListeneri = (param, value) => {
  AL.setListenerParam("alListeneri", param, null);
};
var _alListeneriv = (param, pValues) => {
  if (!AL.currentCtx) {
    return;
  }
  if (!pValues) {
    AL.currentCtx.err = 40963;
    return;
  }
  switch (param) {
    case 4100:
    case 4102:
      AL.paramArray[0] = HEAP32[pValues >> 2];
      AL.paramArray[1] = HEAP32[(pValues + 4) >> 2];
      AL.paramArray[2] = HEAP32[(pValues + 8) >> 2];
      AL.setListenerParam("alListeneriv", param, AL.paramArray);
      break;
    case 4111:
      AL.paramArray[0] = HEAP32[pValues >> 2];
      AL.paramArray[1] = HEAP32[(pValues + 4) >> 2];
      AL.paramArray[2] = HEAP32[(pValues + 8) >> 2];
      AL.paramArray[3] = HEAP32[(pValues + 12) >> 2];
      AL.paramArray[4] = HEAP32[(pValues + 16) >> 2];
      AL.paramArray[5] = HEAP32[(pValues + 20) >> 2];
      AL.setListenerParam("alListeneriv", param, AL.paramArray);
      break;
    default:
      AL.setListenerParam("alListeneriv", param, null);
      break;
  }
};
var _alSource3f = (sourceId, param, value0, value1, value2) => {
  switch (param) {
    case 4100:
    case 4101:
    case 4102:
      AL.paramArray[0] = value0;
      AL.paramArray[1] = value1;
      AL.paramArray[2] = value2;
      AL.setSourceParam("alSource3f", sourceId, param, AL.paramArray);
      break;
    default:
      AL.setSourceParam("alSource3f", sourceId, param, null);
      break;
  }
};
var _alSource3i = (sourceId, param, value0, value1, value2) => {
  switch (param) {
    case 4100:
    case 4101:
    case 4102:
      AL.paramArray[0] = value0;
      AL.paramArray[1] = value1;
      AL.paramArray[2] = value2;
      AL.setSourceParam("alSource3i", sourceId, param, AL.paramArray);
      break;
    default:
      AL.setSourceParam("alSource3i", sourceId, param, null);
      break;
  }
};
var _alSourcePause = (sourceId) => {
  if (!AL.currentCtx) {
    return;
  }
  var src = AL.currentCtx.sources[sourceId];
  if (!src) {
    AL.currentCtx.err = 40961;
    return;
  }
  AL.setSourceState(src, 4115);
};
var _alSourcePausev = (count, pSourceIds) => {
  if (!AL.currentCtx) {
    return;
  }
  if (!pSourceIds) {
    AL.currentCtx.err = 40963;
  }
  for (var i = 0; i < count; ++i) {
    if (!AL.currentCtx.sources[HEAP32[(pSourceIds + i * 4) >> 2]]) {
      AL.currentCtx.err = 40961;
      return;
    }
  }
  for (var i = 0; i < count; ++i) {
    var srcId = HEAP32[(pSourceIds + i * 4) >> 2];
    AL.setSourceState(AL.currentCtx.sources[srcId], 4115);
  }
};
var _alSourcePlay = (sourceId) => {
  if (!AL.currentCtx) {
    return;
  }
  var src = AL.currentCtx.sources[sourceId];
  if (!src) {
    AL.currentCtx.err = 40961;
    return;
  }
  AL.setSourceState(src, 4114);
};
var _alSourcePlayv = (count, pSourceIds) => {
  if (!AL.currentCtx) {
    return;
  }
  if (!pSourceIds) {
    AL.currentCtx.err = 40963;
  }
  for (var i = 0; i < count; ++i) {
    if (!AL.currentCtx.sources[HEAP32[(pSourceIds + i * 4) >> 2]]) {
      AL.currentCtx.err = 40961;
      return;
    }
  }
  for (var i = 0; i < count; ++i) {
    var srcId = HEAP32[(pSourceIds + i * 4) >> 2];
    AL.setSourceState(AL.currentCtx.sources[srcId], 4114);
  }
};
var _alSourceQueueBuffers = (sourceId, count, pBufferIds) => {
  if (!AL.currentCtx) {
    return;
  }
  var src = AL.currentCtx.sources[sourceId];
  if (!src) {
    AL.currentCtx.err = 40961;
    return;
  }
  if (src.type === 4136) {
    AL.currentCtx.err = 40964;
    return;
  }
  if (count === 0) {
    return;
  }
  var templateBuf = AL.buffers[0];
  for (var buf of src.bufQueue) {
    if (buf.id !== 0) {
      templateBuf = buf;
      break;
    }
  }
  for (var i = 0; i < count; ++i) {
    var bufId = HEAP32[(pBufferIds + i * 4) >> 2];
    var buf = AL.buffers[bufId];
    if (!buf) {
      AL.currentCtx.err = 40961;
      return;
    }
    if (
      templateBuf.id !== 0 &&
      (buf.frequency !== templateBuf.frequency ||
        buf.bytesPerSample !== templateBuf.bytesPerSample ||
        buf.channels !== templateBuf.channels)
    ) {
      AL.currentCtx.err = 40964;
    }
  }
  if (src.bufQueue.length === 1 && src.bufQueue[0].id === 0) {
    src.bufQueue.length = 0;
  }
  src.type = 4137;
  for (var i = 0; i < count; ++i) {
    var bufId = HEAP32[(pBufferIds + i * 4) >> 2];
    var buf = AL.buffers[bufId];
    buf.refCount++;
    src.bufQueue.push(buf);
  }
  if (src.looping) {
    AL.cancelPendingSourceAudio(src);
  }
  AL.initSourcePanner(src);
  AL.scheduleSourceAudio(src);
};
var _alSourceRewind = (sourceId) => {
  if (!AL.currentCtx) {
    return;
  }
  var src = AL.currentCtx.sources[sourceId];
  if (!src) {
    AL.currentCtx.err = 40961;
    return;
  }
  AL.setSourceState(src, 4116);
  AL.setSourceState(src, 4113);
};
var _alSourceRewindv = (count, pSourceIds) => {
  if (!AL.currentCtx) {
    return;
  }
  if (!pSourceIds) {
    AL.currentCtx.err = 40963;
  }
  for (var i = 0; i < count; ++i) {
    if (!AL.currentCtx.sources[HEAP32[(pSourceIds + i * 4) >> 2]]) {
      AL.currentCtx.err = 40961;
      return;
    }
  }
  for (var i = 0; i < count; ++i) {
    var srcId = HEAP32[(pSourceIds + i * 4) >> 2];
    AL.setSourceState(AL.currentCtx.sources[srcId], 4113);
  }
};
var _alSourceStop = (sourceId) => {
  if (!AL.currentCtx) {
    return;
  }
  var src = AL.currentCtx.sources[sourceId];
  if (!src) {
    AL.currentCtx.err = 40961;
    return;
  }
  AL.setSourceState(src, 4116);
};
var _alSourceStopv = (count, pSourceIds) => {
  if (!AL.currentCtx) {
    return;
  }
  if (!pSourceIds) {
    AL.currentCtx.err = 40963;
  }
  for (var i = 0; i < count; ++i) {
    if (!AL.currentCtx.sources[HEAP32[(pSourceIds + i * 4) >> 2]]) {
      AL.currentCtx.err = 40961;
      return;
    }
  }
  for (var i = 0; i < count; ++i) {
    var srcId = HEAP32[(pSourceIds + i * 4) >> 2];
    AL.setSourceState(AL.currentCtx.sources[srcId], 4116);
  }
};
var _alSourceUnqueueBuffers = (sourceId, count, pBufferIds) => {
  if (!AL.currentCtx) {
    return;
  }
  var src = AL.currentCtx.sources[sourceId];
  if (!src) {
    AL.currentCtx.err = 40961;
    return;
  }
  if (count > (src.bufQueue.length === 1 && src.bufQueue[0].id === 0 ? 0 : src.bufsProcessed)) {
    AL.currentCtx.err = 40963;
    return;
  }
  if (count === 0) {
    return;
  }
  for (var i = 0; i < count; i++) {
    var buf = src.bufQueue.shift();
    buf.refCount--;
    HEAP32[(pBufferIds + i * 4) >> 2] = buf.id;
    src.bufsProcessed--;
  }
  if (src.bufQueue.length === 0) {
    src.bufQueue.push(AL.buffers[0]);
  }
  AL.initSourcePanner(src);
  AL.scheduleSourceAudio(src);
};
var _alSourcef = (sourceId, param, value) => {
  switch (param) {
    case 4097:
    case 4098:
    case 4099:
    case 4106:
    case 4109:
    case 4110:
    case 4128:
    case 4129:
    case 4130:
    case 4131:
    case 4132:
    case 4133:
    case 4134:
    case 8203:
      AL.setSourceParam("alSourcef", sourceId, param, value);
      break;
    default:
      AL.setSourceParam("alSourcef", sourceId, param, null);
      break;
  }
};
var _alSourcefv = (sourceId, param, pValues) => {
  if (!AL.currentCtx) {
    return;
  }
  if (!pValues) {
    AL.currentCtx.err = 40963;
    return;
  }
  switch (param) {
    case 4097:
    case 4098:
    case 4099:
    case 4106:
    case 4109:
    case 4110:
    case 4128:
    case 4129:
    case 4130:
    case 4131:
    case 4132:
    case 4133:
    case 4134:
    case 8203:
      var val = HEAPF32[pValues >> 2];
      AL.setSourceParam("alSourcefv", sourceId, param, val);
      break;
    case 4100:
    case 4101:
    case 4102:
      AL.paramArray[0] = HEAPF32[pValues >> 2];
      AL.paramArray[1] = HEAPF32[(pValues + 4) >> 2];
      AL.paramArray[2] = HEAPF32[(pValues + 8) >> 2];
      AL.setSourceParam("alSourcefv", sourceId, param, AL.paramArray);
      break;
    default:
      AL.setSourceParam("alSourcefv", sourceId, param, null);
      break;
  }
};
var _alSourceiv = (sourceId, param, pValues) => {
  if (!AL.currentCtx) {
    return;
  }
  if (!pValues) {
    AL.currentCtx.err = 40963;
    return;
  }
  switch (param) {
    case 514:
    case 4097:
    case 4098:
    case 4103:
    case 4105:
    case 4128:
    case 4129:
    case 4131:
    case 4132:
    case 4133:
    case 4134:
    case 4628:
    case 8201:
    case 8202:
    case 53248:
      var val = HEAP32[pValues >> 2];
      AL.setSourceParam("alSourceiv", sourceId, param, val);
      break;
    case 4100:
    case 4101:
    case 4102:
      AL.paramArray[0] = HEAP32[pValues >> 2];
      AL.paramArray[1] = HEAP32[(pValues + 4) >> 2];
      AL.paramArray[2] = HEAP32[(pValues + 8) >> 2];
      AL.setSourceParam("alSourceiv", sourceId, param, AL.paramArray);
      break;
    default:
      AL.setSourceParam("alSourceiv", sourceId, param, null);
      break;
  }
};
var _alSpeedOfSound = (value) => {
  AL.setGlobalParam("alSpeedOfSound", 49155, value);
};
var _alcCloseDevice = (deviceId) => {
  if (!(deviceId in AL.deviceRefCounts) || AL.deviceRefCounts[deviceId] > 0) {
    return 0;
  }
  delete AL.deviceRefCounts[deviceId];
  AL.freeIds.push(deviceId);
  return 1;
};
var autoResumeAudioContext = (ctx) => {
  for (var event of ["keydown", "mousedown", "touchstart"]) {
    for (var element of [document, document.getElementById("canvas")]) {
      element?.addEventListener(
        event,
        () => {
          if (ctx.state === "suspended") ctx.resume();
        },
        { once: true }
      );
    }
  }
};
var _alcCreateContext = (deviceId, pAttrList) => {
  if (!(deviceId in AL.deviceRefCounts)) {
    AL.alcErr = 40961;
    return 0;
  }
  var options = null;
  var attrs = [];
  var hrtf = null;
  pAttrList >>= 2;
  if (pAttrList) {
    var attr = 0;
    var val = 0;
    while (true) {
      attr = HEAP32[pAttrList++];
      attrs.push(attr);
      if (attr === 0) {
        break;
      }
      val = HEAP32[pAttrList++];
      attrs.push(val);
      switch (attr) {
        case 4103:
          if (!options) {
            options = {};
          }
          options.sampleRate = val;
          break;
        case 4112:
        case 4113:
          break;
        case 6546:
          switch (val) {
            case 0:
              hrtf = false;
              break;
            case 1:
              hrtf = true;
              break;
            case 2:
              break;
            default:
              AL.alcErr = 40964;
              return 0;
          }
          break;
        case 6550:
          if (val !== 0) {
            AL.alcErr = 40964;
            return 0;
          }
          break;
        default:
          AL.alcErr = 40964;
          return 0;
      }
    }
  }
  var AudioContext = window.AudioContext || window.webkitAudioContext;
  var ac = null;
  try {
    if (options) {
      ac = new AudioContext(options);
    } else {
      ac = new AudioContext();
    }
  } catch (e) {
    if (e.name === "NotSupportedError") {
      AL.alcErr = 40964;
    } else {
      AL.alcErr = 40961;
    }
    return 0;
  }
  autoResumeAudioContext(ac);
  if (typeof ac.createGain == "undefined") {
    ac.createGain = ac.createGainNode;
  }
  var gain = ac.createGain();
  gain.connect(ac.destination);
  var ctx = {
    deviceId,
    id: AL.newId(),
    attrs,
    audioCtx: ac,
    listener: { position: [0, 0, 0], velocity: [0, 0, 0], direction: [0, 0, 0], up: [0, 0, 0] },
    sources: [],
    interval: setInterval(() => AL.scheduleContextAudio(ctx), AL.QUEUE_INTERVAL),
    gain,
    distanceModel: 53250,
    speedOfSound: 343.3,
    dopplerFactor: 1,
    sourceDistanceModel: false,
    hrtf: hrtf || false,
    _err: 0,
    get err() {
      return this._err;
    },
    set err(val) {
      if (this._err === 0 || val === 0) {
        this._err = val;
      }
    }
  };
  AL.deviceRefCounts[deviceId]++;
  AL.contexts[ctx.id] = ctx;
  if (hrtf !== null) {
    for (var ctxId in AL.contexts) {
      var c = AL.contexts[ctxId];
      if (c.deviceId === deviceId) {
        c.hrtf = hrtf;
        AL.updateContextGlobal(c);
      }
    }
  }
  return ctx.id;
};
var _alcDestroyContext = (contextId) => {
  var ctx = AL.contexts[contextId];
  if (AL.currentCtx === ctx) {
    AL.alcErr = 40962;
    return;
  }
  if (AL.contexts[contextId].interval) {
    clearInterval(AL.contexts[contextId].interval);
  }
  AL.deviceRefCounts[ctx.deviceId]--;
  delete AL.contexts[contextId];
  AL.freeIds.push(contextId);
};
var _alcGetIntegerv = (deviceId, param, size, pValues) => {
  if (size === 0 || !pValues) {
    return;
  }
  switch (param) {
    case 4096:
      HEAP32[pValues >> 2] = 1;
      break;
    case 4097:
      HEAP32[pValues >> 2] = 1;
      break;
    case 4098:
      if (!(deviceId in AL.deviceRefCounts)) {
        AL.alcErr = 40961;
        return;
      }
      if (!AL.currentCtx) {
        AL.alcErr = 40962;
        return;
      }
      HEAP32[pValues >> 2] = AL.currentCtx.attrs.length;
      break;
    case 4099:
      if (!(deviceId in AL.deviceRefCounts)) {
        AL.alcErr = 40961;
        return;
      }
      if (!AL.currentCtx) {
        AL.alcErr = 40962;
        return;
      }
      for (var i = 0; i < AL.currentCtx.attrs.length; i++) {
        HEAP32[(pValues + i * 4) >> 2] = AL.currentCtx.attrs[i];
      }
      break;
    case 4103:
      if (!(deviceId in AL.deviceRefCounts)) {
        AL.alcErr = 40961;
        return;
      }
      if (!AL.currentCtx) {
        AL.alcErr = 40962;
        return;
      }
      HEAP32[pValues >> 2] = AL.currentCtx.audioCtx.sampleRate;
      break;
    case 4112:
    case 4113:
      if (!(deviceId in AL.deviceRefCounts)) {
        AL.alcErr = 40961;
        return;
      }
      if (!AL.currentCtx) {
        AL.alcErr = 40962;
        return;
      }
      HEAP32[pValues >> 2] = 2147483647;
      break;
    case 6546:
    case 6547:
      if (!(deviceId in AL.deviceRefCounts)) {
        AL.alcErr = 40961;
        return;
      }
      var hrtfStatus = 0;
      for (var ctxId in AL.contexts) {
        var ctx = AL.contexts[ctxId];
        if (ctx.deviceId === deviceId) {
          hrtfStatus = ctx.hrtf ? 1 : 0;
        }
      }
      HEAP32[pValues >> 2] = hrtfStatus;
      break;
    case 6548:
      if (!(deviceId in AL.deviceRefCounts)) {
        AL.alcErr = 40961;
        return;
      }
      HEAP32[pValues >> 2] = 1;
      break;
    case 131075:
      if (!(deviceId in AL.deviceRefCounts)) {
        AL.alcErr = 40961;
        return;
      }
      if (!AL.currentCtx) {
        AL.alcErr = 40962;
        return;
      }
      HEAP32[pValues >> 2] = 1;
    case 786:
      var c = AL.requireValidCaptureDevice(deviceId, "alcGetIntegerv");
      if (!c) {
        return;
      }
      var n = c.capturedFrameCount;
      var dstfreq = c.requestedSampleRate;
      var srcfreq = c.audioCtx.sampleRate;
      var nsamples = Math.floor(n * (dstfreq / srcfreq));
      HEAP32[pValues >> 2] = nsamples;
      break;
    default:
      AL.alcErr = 40963;
      return;
  }
};
var _alcIsExtensionPresent = (deviceId, pExtName) => {
  var name = UTF8ToString(pExtName);
  return AL.ALC_EXTENSIONS[name] ? 1 : 0;
};
var _alcMakeContextCurrent = (contextId) => {
  if (contextId === 0) {
    AL.currentCtx = null;
  } else {
    AL.currentCtx = AL.contexts[contextId];
  }
  return 1;
};
var _alcOpenDevice = (pDeviceName) => {
  if (pDeviceName) {
    var name = UTF8ToString(pDeviceName);
    if (name !== AL.DEVICE_NAME) {
      return 0;
    }
  }
  if (globalThis.AudioContext || globalThis.webkitAudioContext) {
    var deviceId = AL.newId();
    AL.deviceRefCounts[deviceId] = 0;
    return deviceId;
  }
  return 0;
};
var _alcSuspendContext = (contextId) => {};
var _emscripten_date_now = () => Date.now();
var nowIsMonotonic = 1;
var checkWasiClock = (clock_id) => clock_id >= 0 && clock_id <= 3;
function _clock_time_get(clk_id, ignored_precision, ptime) {
  ignored_precision = bigintToI53Checked(ignored_precision);
  if (!checkWasiClock(clk_id)) {
    return 28;
  }
  var now;
  if (clk_id === 0) {
    now = _emscripten_date_now();
  } else if (nowIsMonotonic) {
    now = _emscripten_get_now();
  } else {
    return 52;
  }
  var nsec = Math.round(now * 1e3 * 1e3);
  HEAP64[ptime >> 3] = BigInt(nsec);
  return 0;
}
function getFullscreenElement() {
  return (
    document.fullscreenElement ||
    document.mozFullScreenElement ||
    document.webkitFullscreenElement ||
    document.webkitCurrentFullScreenElement ||
    document.msFullscreenElement
  );
}
var safeSetTimeout = (func, timeout) =>
  setTimeout(() => {
    callUserCallback(func);
  }, timeout);
var warnOnce = (text) => {
  warnOnce.shown ||= {};
  if (!warnOnce.shown[text]) {
    warnOnce.shown[text] = 1;
    if (ENVIRONMENT_IS_NODE) text = "warning: " + text;
    err(text);
  }
};
var Browser = {
  useWebGL: false,
  isFullscreen: false,
  pointerLock: false,
  moduleContextCreatedCallbacks: [],
  workers: [],
  preloadedImages: {},
  preloadedAudios: {},
  getCanvas: () => Module["canvas"],
  init() {
    if (Browser.initted) return;
    Browser.initted = true;
    var imagePlugin = {};
    imagePlugin["canHandle"] = function imagePlugin_canHandle(name) {
      return !Module["noImageDecoding"] && /\.(jpg|jpeg|png|bmp|webp)$/i.test(name);
    };
    imagePlugin["handle"] = async function imagePlugin_handle(byteArray, name) {
      var b = new Blob([byteArray], { type: Browser.getMimetype(name) });
      if (b.size !== byteArray.length) {
        b = new Blob([new Uint8Array(byteArray).buffer], { type: Browser.getMimetype(name) });
      }
      var url = URL.createObjectURL(b);
      return new Promise((resolve, reject) => {
        var img = new Image();
        img.onload = () => {
          var canvas = document.createElement("canvas");
          canvas.width = img.width;
          canvas.height = img.height;
          var ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0);
          Browser.preloadedImages[name] = canvas;
          URL.revokeObjectURL(url);
          resolve(byteArray);
        };
        img.onerror = (event) => {
          err(`Image ${url} could not be decoded`);
          reject();
        };
        img.src = url;
      });
    };
    preloadPlugins.push(imagePlugin);
    var audioPlugin = {};
    audioPlugin["canHandle"] = function audioPlugin_canHandle(name) {
      return !Module["noAudioDecoding"] && name.slice(-4) in { ".ogg": 1, ".wav": 1, ".mp3": 1 };
    };
    audioPlugin["handle"] = async function audioPlugin_handle(byteArray, name) {
      return new Promise((resolve, reject) => {
        var done = false;
        function finish(audio) {
          if (done) return;
          done = true;
          Browser.preloadedAudios[name] = audio;
          resolve(byteArray);
        }
        var b = new Blob([byteArray], { type: Browser.getMimetype(name) });
        var url = URL.createObjectURL(b);
        var audio = new Audio();
        audio.addEventListener("canplaythrough", () => finish(audio), false);
        audio.onerror = function audio_onerror(event) {
          if (done) return;
          err(`warning: browser could not fully decode audio ${name}, trying slower base64 approach`);
          function encode64(data) {
            var BASE = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
            var PAD = "=";
            var ret = "";
            var leftchar = 0;
            var leftbits = 0;
            for (var i = 0; i < data.length; i++) {
              leftchar = (leftchar << 8) | data[i];
              leftbits += 8;
              while (leftbits >= 6) {
                var curr = (leftchar >> (leftbits - 6)) & 63;
                leftbits -= 6;
                ret += BASE[curr];
              }
            }
            if (leftbits == 2) {
              ret += BASE[(leftchar & 3) << 4];
              ret += PAD + PAD;
            } else if (leftbits == 4) {
              ret += BASE[(leftchar & 15) << 2];
              ret += PAD;
            }
            return ret;
          }
          audio.src = "data:audio/x-" + name.slice(-3) + ";base64," + encode64(byteArray);
          finish(audio);
        };
        audio.src = url;
        safeSetTimeout(() => {
          finish(audio);
        }, 1e4);
      });
    };
    preloadPlugins.push(audioPlugin);
    function pointerLockChange() {
      var canvas = Browser.getCanvas();
      Browser.pointerLock = document.pointerLockElement === canvas;
    }
    var canvas = Browser.getCanvas();
    if (canvas) {
      document.addEventListener("pointerlockchange", pointerLockChange, false);
      if (Module["elementPointerLock"]) {
        canvas.addEventListener(
          "click",
          (ev) => {
            if (!Browser.pointerLock && Browser.getCanvas().requestPointerLock) {
              Browser.getCanvas().requestPointerLock();
              ev.preventDefault();
            }
          },
          false
        );
      }
    }
  },
  createContext(canvas, useWebGL, setInModule, webGLContextAttributes) {
    if (useWebGL && Module["ctx"] && canvas == Browser.getCanvas()) return Module["ctx"];
    var ctx;
    var contextHandle;
    if (useWebGL) {
      var contextAttributes = {
        antialias: false,
        alpha: false,
        majorVersion: typeof WebGL2RenderingContext != "undefined" ? 2 : 1
      };
      if (webGLContextAttributes) {
        for (var attribute in webGLContextAttributes) {
          contextAttributes[attribute] = webGLContextAttributes[attribute];
        }
      }
      if (typeof GL != "undefined") {
        contextHandle = GL.createContext(canvas, contextAttributes);
        if (contextHandle) {
          ctx = GL.getContext(contextHandle).GLctx;
        }
      }
    } else {
      ctx = canvas.getContext("2d");
    }
    if (!ctx) return null;
    if (setInModule) {
      Module["ctx"] = ctx;
      if (useWebGL) GL.makeContextCurrent(contextHandle);
      Browser.useWebGL = useWebGL;
      Browser.moduleContextCreatedCallbacks.forEach((callback) => callback());
      Browser.init();
    }
    return ctx;
  },
  fullscreenHandlersInstalled: false,
  lockPointer: undefined,
  resizeCanvas: undefined,
  requestFullscreen(lockPointer, resizeCanvas) {
    Browser.lockPointer = lockPointer;
    Browser.resizeCanvas = resizeCanvas;
    if (typeof Browser.lockPointer == "undefined") Browser.lockPointer = true;
    if (typeof Browser.resizeCanvas == "undefined") Browser.resizeCanvas = false;
    var canvas = Browser.getCanvas();
    function fullscreenChange() {
      Browser.isFullscreen = false;
      var canvasContainer = canvas.parentNode;
      if (getFullscreenElement() === canvasContainer) {
        canvas.exitFullscreen = Browser.exitFullscreen;
        if (Browser.lockPointer) canvas.requestPointerLock();
        Browser.isFullscreen = true;
        if (Browser.resizeCanvas) {
          Browser.setFullscreenCanvasSize();
        } else {
          Browser.updateCanvasDimensions(canvas);
        }
      } else {
        canvasContainer.parentNode.insertBefore(canvas, canvasContainer);
        canvasContainer.parentNode.removeChild(canvasContainer);
        if (Browser.resizeCanvas) {
          Browser.setWindowedCanvasSize();
        } else {
          Browser.updateCanvasDimensions(canvas);
        }
      }
      Module["onFullScreen"]?.(Browser.isFullscreen);
      Module["onFullscreen"]?.(Browser.isFullscreen);
    }
    if (!Browser.fullscreenHandlersInstalled) {
      Browser.fullscreenHandlersInstalled = true;
      document.addEventListener("fullscreenchange", fullscreenChange, false);
      document.addEventListener("mozfullscreenchange", fullscreenChange, false);
      document.addEventListener("webkitfullscreenchange", fullscreenChange, false);
      document.addEventListener("MSFullscreenChange", fullscreenChange, false);
    }
    var canvasContainer = document.createElement("div");
    canvas.parentNode.insertBefore(canvasContainer, canvas);
    canvasContainer.appendChild(canvas);
    canvasContainer.requestFullscreen =
      canvasContainer["requestFullscreen"] ||
      canvasContainer["mozRequestFullScreen"] ||
      canvasContainer["msRequestFullscreen"] ||
      (canvasContainer["webkitRequestFullscreen"]
        ? () => canvasContainer["webkitRequestFullscreen"](Element["ALLOW_KEYBOARD_INPUT"])
        : null) ||
      (canvasContainer["webkitRequestFullScreen"]
        ? () => canvasContainer["webkitRequestFullScreen"](Element["ALLOW_KEYBOARD_INPUT"])
        : null);
    canvasContainer.requestFullscreen();
  },
  exitFullscreen() {
    if (!Browser.isFullscreen) {
      return false;
    }
    var CFS =
      document["exitFullscreen"] ||
      document["cancelFullScreen"] ||
      document["mozCancelFullScreen"] ||
      document["msExitFullscreen"] ||
      document["webkitCancelFullScreen"] ||
      (() => {});
    CFS.apply(document, []);
    return true;
  },
  safeSetTimeout(func, timeout) {
    return safeSetTimeout(func, timeout);
  },
  getMimetype(name) {
    return {
      jpg: "image/jpeg",
      jpeg: "image/jpeg",
      png: "image/png",
      bmp: "image/bmp",
      ogg: "audio/ogg",
      wav: "audio/wav",
      mp3: "audio/mpeg"
    }[name.slice(name.lastIndexOf(".") + 1)];
  },
  getUserMedia(func) {
    window.getUserMedia ||= navigator["getUserMedia"] || navigator["mozGetUserMedia"];
    window.getUserMedia(func);
  },
  getMovementX(event) {
    return event["movementX"] || event["mozMovementX"] || event["webkitMovementX"] || 0;
  },
  getMovementY(event) {
    return event["movementY"] || event["mozMovementY"] || event["webkitMovementY"] || 0;
  },
  getMouseWheelDelta(event) {
    var delta = 0;
    switch (event.type) {
      case "DOMMouseScroll":
        delta = event.detail / 3;
        break;
      case "mousewheel":
        delta = event.wheelDelta / 120;
        break;
      case "wheel":
        delta = event.deltaY;
        switch (event.deltaMode) {
          case 0:
            delta /= 100;
            break;
          case 1:
            delta /= 3;
            break;
          case 2:
            delta *= 80;
            break;
          default:
            abort("unrecognized mouse wheel delta mode: " + event.deltaMode);
        }
        break;
      default:
        abort("unrecognized mouse wheel event: " + event.type);
    }
    return delta;
  },
  mouseX: 0,
  mouseY: 0,
  mouseMovementX: 0,
  mouseMovementY: 0,
  touches: {},
  lastTouches: {},
  calculateMouseCoords(pageX, pageY) {
    var canvas = Browser.getCanvas();
    var rect = canvas.getBoundingClientRect();
    var scrollX = typeof window.scrollX != "undefined" ? window.scrollX : window.pageXOffset;
    var scrollY = typeof window.scrollY != "undefined" ? window.scrollY : window.pageYOffset;
    var adjustedX = pageX - (scrollX + rect.left);
    var adjustedY = pageY - (scrollY + rect.top);
    adjustedX = adjustedX * (canvas.width / rect.width);
    adjustedY = adjustedY * (canvas.height / rect.height);
    return { x: adjustedX, y: adjustedY };
  },
  setMouseCoords(pageX, pageY) {
    const { x, y } = Browser.calculateMouseCoords(pageX, pageY);
    Browser.mouseMovementX = x - Browser.mouseX;
    Browser.mouseMovementY = y - Browser.mouseY;
    Browser.mouseX = x;
    Browser.mouseY = y;
  },
  calculateMouseEvent(event) {
    if (Browser.pointerLock) {
      if (event.type != "mousemove" && "mozMovementX" in event) {
        Browser.mouseMovementX = Browser.mouseMovementY = 0;
      } else {
        Browser.mouseMovementX = Browser.getMovementX(event);
        Browser.mouseMovementY = Browser.getMovementY(event);
      }
      Browser.mouseX += Browser.mouseMovementX;
      Browser.mouseY += Browser.mouseMovementY;
    } else {
      if (event.type === "touchstart" || event.type === "touchend" || event.type === "touchmove") {
        var touch = event.touch;
        if (touch === undefined) {
          return;
        }
        var coords = Browser.calculateMouseCoords(touch.pageX, touch.pageY);
        if (event.type === "touchstart") {
          Browser.lastTouches[touch.identifier] = coords;
          Browser.touches[touch.identifier] = coords;
        } else if (event.type === "touchend" || event.type === "touchmove") {
          var last = Browser.touches[touch.identifier];
          last ||= coords;
          Browser.lastTouches[touch.identifier] = last;
          Browser.touches[touch.identifier] = coords;
        }
        return;
      }
      Browser.setMouseCoords(event.pageX, event.pageY);
    }
  },
  resizeListeners: [],
  updateResizeListeners() {
    var canvas = Browser.getCanvas();
    Browser.resizeListeners.forEach((listener) => listener(canvas.width, canvas.height));
  },
  setCanvasSize(width, height, noUpdates) {
    var canvas = Browser.getCanvas();
    Browser.updateCanvasDimensions(canvas, width, height);
    if (!noUpdates) Browser.updateResizeListeners();
  },
  windowedWidth: 0,
  windowedHeight: 0,
  setFullscreenCanvasSize() {
    if (typeof SDL != "undefined") {
      var flags = HEAPU32[SDL.screen >> 2];
      flags = flags | 8388608;
      HEAP32[SDL.screen >> 2] = flags;
    }
    Browser.updateCanvasDimensions(Browser.getCanvas());
    Browser.updateResizeListeners();
  },
  setWindowedCanvasSize() {
    if (typeof SDL != "undefined") {
      var flags = HEAPU32[SDL.screen >> 2];
      flags = flags & ~8388608;
      HEAP32[SDL.screen >> 2] = flags;
    }
    Browser.updateCanvasDimensions(Browser.getCanvas());
    Browser.updateResizeListeners();
  },
  updateCanvasDimensions(canvas, wNative, hNative) {
    if (wNative && hNative) {
      canvas.widthNative = wNative;
      canvas.heightNative = hNative;
    } else {
      wNative = canvas.widthNative;
      hNative = canvas.heightNative;
    }
    var w = wNative;
    var h = hNative;
    if (Module["forcedAspectRatio"] > 0) {
      if (w / h < Module["forcedAspectRatio"]) {
        w = Math.round(h * Module["forcedAspectRatio"]);
      } else {
        h = Math.round(w / Module["forcedAspectRatio"]);
      }
    }
    if (getFullscreenElement() === canvas.parentNode && typeof screen != "undefined") {
      var factor = Math.min(screen.width / w, screen.height / h);
      w = Math.round(w * factor);
      h = Math.round(h * factor);
    }
    if (Browser.resizeCanvas) {
      if (canvas.width != w) canvas.width = w;
      if (canvas.height != h) canvas.height = h;
      if (typeof canvas.style != "undefined") {
        canvas.style.removeProperty("width");
        canvas.style.removeProperty("height");
      }
    } else {
      if (canvas.width != wNative) canvas.width = wNative;
      if (canvas.height != hNative) canvas.height = hNative;
      if (typeof canvas.style != "undefined") {
        if (w != wNative || h != hNative) {
          canvas.style.setProperty("width", w + "px", "important");
          canvas.style.setProperty("height", h + "px", "important");
        } else {
          canvas.style.removeProperty("width");
          canvas.style.removeProperty("height");
        }
      }
    }
  }
};
var EGL = {
  errorCode: 12288,
  defaultDisplayInitialized: false,
  currentContext: 0,
  currentReadSurface: 0,
  currentDrawSurface: 0,
  contextAttributes: { alpha: false, depth: false, stencil: false, antialias: false },
  stringCache: {},
  setErrorCode(code) {
    EGL.errorCode = code;
  },
  chooseConfig(display, attribList, config, config_size, numConfigs) {
    if (display != 62e3) {
      EGL.setErrorCode(12296);
      return 0;
    }
    if (attribList) {
      for (;;) {
        var param = HEAP32[attribList >> 2];
        if (param == 12321) {
          var alphaSize = HEAP32[(attribList + 4) >> 2];
          EGL.contextAttributes.alpha = alphaSize > 0;
        } else if (param == 12325) {
          var depthSize = HEAP32[(attribList + 4) >> 2];
          EGL.contextAttributes.depth = depthSize > 0;
        } else if (param == 12326) {
          var stencilSize = HEAP32[(attribList + 4) >> 2];
          EGL.contextAttributes.stencil = stencilSize > 0;
        } else if (param == 12337) {
          var samples = HEAP32[(attribList + 4) >> 2];
          EGL.contextAttributes.antialias = samples > 0;
        } else if (param == 12338) {
          var samples = HEAP32[(attribList + 4) >> 2];
          EGL.contextAttributes.antialias = samples == 1;
        } else if (param == 12544) {
          var requestedPriority = HEAP32[(attribList + 4) >> 2];
          EGL.contextAttributes.lowLatency = requestedPriority != 12547;
        } else if (param == 12344) {
          break;
        }
        attribList += 8;
      }
    }
    if ((!config || !config_size) && !numConfigs) {
      EGL.setErrorCode(12300);
      return 0;
    }
    if (numConfigs) {
      HEAP32[numConfigs >> 2] = 1;
    }
    if (config && config_size > 0) {
      HEAPU32[config >> 2] = 62002;
    }
    EGL.setErrorCode(12288);
    return 1;
  }
};
var _eglBindAPI = (api) => {
  if (api == 12448) {
    EGL.setErrorCode(12288);
    return 1;
  }
  EGL.setErrorCode(12300);
  return 0;
};
var _eglChooseConfig = (display, attrib_list, configs, config_size, numConfigs) =>
  EGL.chooseConfig(display, attrib_list, configs, config_size, numConfigs);
var GLctx;
var webgl_enable_ANGLE_instanced_arrays = (ctx) => {
  var ext = ctx.getExtension("ANGLE_instanced_arrays");
  if (ext) {
    ctx["vertexAttribDivisor"] = (index, divisor) => ext["vertexAttribDivisorANGLE"](index, divisor);
    ctx["drawArraysInstanced"] = (mode, first, count, primcount) =>
      ext["drawArraysInstancedANGLE"](mode, first, count, primcount);
    ctx["drawElementsInstanced"] = (mode, count, type, indices, primcount) =>
      ext["drawElementsInstancedANGLE"](mode, count, type, indices, primcount);
    return 1;
  }
};
var webgl_enable_OES_vertex_array_object = (ctx) => {
  var ext = ctx.getExtension("OES_vertex_array_object");
  if (ext) {
    ctx["createVertexArray"] = () => ext["createVertexArrayOES"]();
    ctx["deleteVertexArray"] = (vao) => ext["deleteVertexArrayOES"](vao);
    ctx["bindVertexArray"] = (vao) => ext["bindVertexArrayOES"](vao);
    ctx["isVertexArray"] = (vao) => ext["isVertexArrayOES"](vao);
    return 1;
  }
};
var webgl_enable_WEBGL_draw_buffers = (ctx) => {
  var ext = ctx.getExtension("WEBGL_draw_buffers");
  if (ext) {
    ctx["drawBuffers"] = (n, bufs) => ext["drawBuffersWEBGL"](n, bufs);
    return 1;
  }
};
var webgl_enable_WEBGL_draw_instanced_base_vertex_base_instance = (ctx) =>
  !!(ctx.dibvbi = ctx.getExtension("WEBGL_draw_instanced_base_vertex_base_instance"));
var webgl_enable_WEBGL_multi_draw_instanced_base_vertex_base_instance = (ctx) =>
  !!(ctx.mdibvbi = ctx.getExtension("WEBGL_multi_draw_instanced_base_vertex_base_instance"));
var webgl_enable_EXT_polygon_offset_clamp = (ctx) =>
  !!(ctx.extPolygonOffsetClamp = ctx.getExtension("EXT_polygon_offset_clamp"));
var webgl_enable_EXT_clip_control = (ctx) => !!(ctx.extClipControl = ctx.getExtension("EXT_clip_control"));
var webgl_enable_WEBGL_polygon_mode = (ctx) => !!(ctx.webglPolygonMode = ctx.getExtension("WEBGL_polygon_mode"));
var webgl_enable_WEBGL_multi_draw = (ctx) => !!(ctx.multiDrawWebgl = ctx.getExtension("WEBGL_multi_draw"));
var getEmscriptenSupportedExtensions = (ctx) => {
  var supportedExtensions = [
    "ANGLE_instanced_arrays",
    "EXT_blend_minmax",
    "EXT_disjoint_timer_query",
    "EXT_frag_depth",
    "EXT_shader_texture_lod",
    "EXT_sRGB",
    "OES_element_index_uint",
    "OES_fbo_render_mipmap",
    "OES_standard_derivatives",
    "OES_texture_float",
    "OES_texture_half_float",
    "OES_texture_half_float_linear",
    "OES_vertex_array_object",
    "WEBGL_color_buffer_float",
    "WEBGL_depth_texture",
    "WEBGL_draw_buffers",
    "EXT_color_buffer_float",
    "EXT_conservative_depth",
    "EXT_disjoint_timer_query_webgl2",
    "EXT_texture_norm16",
    "NV_shader_noperspective_interpolation",
    "WEBGL_clip_cull_distance",
    "EXT_clip_control",
    "EXT_color_buffer_half_float",
    "EXT_depth_clamp",
    "EXT_float_blend",
    "EXT_polygon_offset_clamp",
    "EXT_texture_compression_bptc",
    "EXT_texture_compression_rgtc",
    "EXT_texture_filter_anisotropic",
    "KHR_parallel_shader_compile",
    "OES_texture_float_linear",
    "WEBGL_blend_func_extended",
    "WEBGL_compressed_texture_astc",
    "WEBGL_compressed_texture_etc",
    "WEBGL_compressed_texture_etc1",
    "WEBGL_compressed_texture_s3tc",
    "WEBGL_compressed_texture_s3tc_srgb",
    "WEBGL_debug_renderer_info",
    "WEBGL_debug_shaders",
    "WEBGL_lose_context",
    "WEBGL_multi_draw",
    "WEBGL_polygon_mode"
  ];
  return (ctx.getSupportedExtensions() || []).filter((ext) => supportedExtensions.includes(ext));
};
var registerPreMainLoop = (f) => {
  typeof MainLoop != "undefined" && MainLoop.preMainLoop.push(f);
};
var GL = {
  counter: 1,
  buffers: [],
  mappedBuffers: {},
  programs: [],
  framebuffers: [],
  renderbuffers: [],
  textures: [],
  shaders: [],
  vaos: [],
  contexts: [],
  offscreenCanvases: {},
  queries: [],
  samplers: [],
  transformFeedbacks: [],
  syncs: [],
  byteSizeByTypeRoot: 5120,
  byteSizeByType: [1, 1, 2, 2, 4, 4, 4, 2, 3, 4, 8],
  stringCache: {},
  stringiCache: {},
  unpackAlignment: 4,
  unpackRowLength: 0,
  recordError: (errorCode) => {
    if (!GL.lastError) {
      GL.lastError = errorCode;
    }
  },
  getNewId: (table) => {
    var ret = GL.counter++;
    for (var i = table.length; i < ret; i++) {
      table[i] = null;
    }
    while (table[ret]) {
      ret = GL.counter++;
    }
    return ret;
  },
  genObject: (n, buffers, createFunction, objectTable) => {
    for (var i = 0; i < n; i++) {
      var buffer = GLctx[createFunction]();
      var id = buffer && GL.getNewId(objectTable);
      if (buffer) {
        buffer.name = id;
        objectTable[id] = buffer;
      } else {
        GL.recordError(1282);
      }
      HEAP32[(buffers + i * 4) >> 2] = id;
    }
  },
  MAX_TEMP_BUFFER_SIZE: 2097152,
  numTempVertexBuffersPerSize: 64,
  log2ceilLookup: (i) => 32 - Math.clz32(i === 0 ? 0 : i - 1),
  generateTempBuffers: (quads, context) => {
    var largestIndex = GL.log2ceilLookup(GL.MAX_TEMP_BUFFER_SIZE);
    context.tempVertexBufferCounters1 = [];
    context.tempVertexBufferCounters2 = [];
    context.tempVertexBufferCounters1.length = context.tempVertexBufferCounters2.length = largestIndex + 1;
    context.tempVertexBuffers1 = [];
    context.tempVertexBuffers2 = [];
    context.tempVertexBuffers1.length = context.tempVertexBuffers2.length = largestIndex + 1;
    context.tempIndexBuffers = [];
    context.tempIndexBuffers.length = largestIndex + 1;
    for (var i = 0; i <= largestIndex; ++i) {
      context.tempIndexBuffers[i] = null;
      context.tempVertexBufferCounters1[i] = context.tempVertexBufferCounters2[i] = 0;
      var ringbufferLength = GL.numTempVertexBuffersPerSize;
      context.tempVertexBuffers1[i] = [];
      context.tempVertexBuffers2[i] = [];
      var ringbuffer1 = context.tempVertexBuffers1[i];
      var ringbuffer2 = context.tempVertexBuffers2[i];
      ringbuffer1.length = ringbuffer2.length = ringbufferLength;
      for (var j = 0; j < ringbufferLength; ++j) {
        ringbuffer1[j] = ringbuffer2[j] = null;
      }
    }
    if (quads) {
      context.tempQuadIndexBuffer = GLctx.createBuffer();
      context.GLctx.bindBuffer(34963, context.tempQuadIndexBuffer);
      var numIndexes = GL.MAX_TEMP_BUFFER_SIZE >> 1;
      var quadIndexes = new Uint16Array(numIndexes);
      var i = 0,
        v = 0;
      while (1) {
        quadIndexes[i++] = v;
        if (i >= numIndexes) break;
        quadIndexes[i++] = v + 1;
        if (i >= numIndexes) break;
        quadIndexes[i++] = v + 2;
        if (i >= numIndexes) break;
        quadIndexes[i++] = v;
        if (i >= numIndexes) break;
        quadIndexes[i++] = v + 2;
        if (i >= numIndexes) break;
        quadIndexes[i++] = v + 3;
        if (i >= numIndexes) break;
        v += 4;
      }
      context.GLctx.bufferData(34963, quadIndexes, 35044);
      context.GLctx.bindBuffer(34963, null);
    }
  },
  getTempVertexBuffer: (sizeBytes) => {
    var idx = GL.log2ceilLookup(sizeBytes);
    var ringbuffer = GL.currentContext.tempVertexBuffers1[idx];
    var nextFreeBufferIndex = GL.currentContext.tempVertexBufferCounters1[idx];
    GL.currentContext.tempVertexBufferCounters1[idx] =
      (GL.currentContext.tempVertexBufferCounters1[idx] + 1) & (GL.numTempVertexBuffersPerSize - 1);
    var vbo = ringbuffer[nextFreeBufferIndex];
    if (vbo) {
      return vbo;
    }
    var prevVBO = GLctx.getParameter(34964);
    ringbuffer[nextFreeBufferIndex] = GLctx.createBuffer();
    GLctx.bindBuffer(34962, ringbuffer[nextFreeBufferIndex]);
    GLctx.bufferData(34962, 1 << idx, 35048);
    GLctx.bindBuffer(34962, prevVBO);
    return ringbuffer[nextFreeBufferIndex];
  },
  getTempIndexBuffer: (sizeBytes) => {
    var idx = GL.log2ceilLookup(sizeBytes);
    var ibo = GL.currentContext.tempIndexBuffers[idx];
    if (ibo) {
      return ibo;
    }
    var prevIBO = GLctx.getParameter(34965);
    GL.currentContext.tempIndexBuffers[idx] = GLctx.createBuffer();
    GLctx.bindBuffer(34963, GL.currentContext.tempIndexBuffers[idx]);
    GLctx.bufferData(34963, 1 << idx, 35048);
    GLctx.bindBuffer(34963, prevIBO);
    return GL.currentContext.tempIndexBuffers[idx];
  },
  newRenderingFrameStarted: () => {
    if (!GL.currentContext) {
      return;
    }
    var vb = GL.currentContext.tempVertexBuffers1;
    GL.currentContext.tempVertexBuffers1 = GL.currentContext.tempVertexBuffers2;
    GL.currentContext.tempVertexBuffers2 = vb;
    vb = GL.currentContext.tempVertexBufferCounters1;
    GL.currentContext.tempVertexBufferCounters1 = GL.currentContext.tempVertexBufferCounters2;
    GL.currentContext.tempVertexBufferCounters2 = vb;
    var largestIndex = GL.log2ceilLookup(GL.MAX_TEMP_BUFFER_SIZE);
    for (var i = 0; i <= largestIndex; ++i) {
      GL.currentContext.tempVertexBufferCounters1[i] = 0;
    }
  },
  getSource: (shader, count, string, length) => {
    var source = "";
    for (var i = 0; i < count; ++i) {
      var len = length ? HEAPU32[(length + i * 4) >> 2] : undefined;
      source += UTF8ToString(HEAPU32[(string + i * 4) >> 2], len);
    }
    return source;
  },
  calcBufLength: (size, type, stride, count) => {
    if (stride > 0) {
      return count * stride;
    }
    var typeSize = GL.byteSizeByType[type - GL.byteSizeByTypeRoot];
    return size * typeSize * count;
  },
  usedTempBuffers: [],
  preDrawHandleClientVertexAttribBindings: (count) => {
    GL.resetBufferBinding = false;
    for (var i = 0; i < GL.currentContext.maxVertexAttribs; ++i) {
      var cb = GL.currentContext.clientBuffers[i];
      if (!cb.clientside || !cb.enabled) continue;
      GL.resetBufferBinding = true;
      var size = GL.calcBufLength(cb.size, cb.type, cb.stride, count);
      var buf = GL.getTempVertexBuffer(size);
      GLctx.bindBuffer(34962, buf);
      GLctx.bufferSubData(34962, 0, HEAPU8.subarray(cb.ptr, cb.ptr + size));
      cb.vertexAttribPointerAdaptor.call(GLctx, i, cb.size, cb.type, cb.normalized, cb.stride, 0);
    }
  },
  postDrawHandleClientVertexAttribBindings: () => {
    if (GL.resetBufferBinding) {
      GLctx.bindBuffer(34962, GL.buffers[GLctx.currentArrayBufferBinding]);
    }
  },
  createContext: (canvas, webGLContextAttributes) => {
    if (!canvas.getContextSafariWebGL2Fixed) {
      canvas.getContextSafariWebGL2Fixed = canvas.getContext;
      function fixedGetContext(ver, attrs) {
        var gl = canvas.getContextSafariWebGL2Fixed(ver, attrs);
        return (ver == "webgl") == gl instanceof WebGLRenderingContext ? gl : null;
      }
      canvas.getContext = fixedGetContext;
    }
    var ctx =
      webGLContextAttributes.majorVersion > 1
        ? canvas.getContext("webgl2", webGLContextAttributes)
        : canvas.getContext("webgl", webGLContextAttributes);
    if (!ctx) return 0;
    var handle = GL.registerContext(ctx, webGLContextAttributes);
    return handle;
  },
  registerContext: (ctx, webGLContextAttributes) => {
    var handle = GL.getNewId(GL.contexts);
    var context = {
      handle,
      attributes: webGLContextAttributes,
      version: webGLContextAttributes.majorVersion,
      GLctx: ctx
    };
    if (ctx.canvas) ctx.canvas.GLctxObject = context;
    GL.contexts[handle] = context;
    if (
      typeof webGLContextAttributes.enableExtensionsByDefault == "undefined" ||
      webGLContextAttributes.enableExtensionsByDefault
    ) {
      GL.initExtensions(context);
    }
    context.maxVertexAttribs = context.GLctx.getParameter(34921);
    context.clientBuffers = [];
    for (var i = 0; i < context.maxVertexAttribs; i++) {
      context.clientBuffers[i] = {
        enabled: false,
        clientside: false,
        size: 0,
        type: 0,
        normalized: 0,
        stride: 0,
        ptr: 0,
        vertexAttribPointerAdaptor: null
      };
    }
    GL.generateTempBuffers(false, context);
    return handle;
  },
  makeContextCurrent: (contextHandle) => {
    GL.currentContext = GL.contexts[contextHandle];
    Module["ctx"] = GLctx = GL.currentContext?.GLctx;
    return !(contextHandle && !GLctx);
  },
  getContext: (contextHandle) => GL.contexts[contextHandle],
  deleteContext: (contextHandle) => {
    if (GL.currentContext === GL.contexts[contextHandle]) {
      GL.currentContext = null;
    }
    if (typeof JSEvents == "object") {
      JSEvents.removeAllHandlersOnTarget(GL.contexts[contextHandle].GLctx.canvas);
    }
    if (GL.contexts[contextHandle]?.GLctx.canvas) {
      GL.contexts[contextHandle].GLctx.canvas.GLctxObject = undefined;
    }
    GL.contexts[contextHandle] = null;
  },
  initExtensions: (context) => {
    context ||= GL.currentContext;
    if (context.initExtensionsDone) return;
    context.initExtensionsDone = true;
    var GLctx = context.GLctx;
    webgl_enable_WEBGL_multi_draw(GLctx);
    webgl_enable_EXT_polygon_offset_clamp(GLctx);
    webgl_enable_EXT_clip_control(GLctx);
    webgl_enable_WEBGL_polygon_mode(GLctx);
    webgl_enable_ANGLE_instanced_arrays(GLctx);
    webgl_enable_OES_vertex_array_object(GLctx);
    webgl_enable_WEBGL_draw_buffers(GLctx);
    webgl_enable_WEBGL_draw_instanced_base_vertex_base_instance(GLctx);
    webgl_enable_WEBGL_multi_draw_instanced_base_vertex_base_instance(GLctx);
    if (context.version >= 2) {
      GLctx.disjointTimerQueryExt = GLctx.getExtension("EXT_disjoint_timer_query_webgl2");
    }
    if (context.version < 2 || !GLctx.disjointTimerQueryExt) {
      GLctx.disjointTimerQueryExt = GLctx.getExtension("EXT_disjoint_timer_query");
    }
    for (var ext of getEmscriptenSupportedExtensions(GLctx)) {
      if (!ext.includes("lose_context") && !ext.includes("debug")) {
        GLctx.getExtension(ext);
      }
    }
  }
};
var _eglCreateContext = (display, config, hmm, contextAttribs) => {
  if (display != 62e3) {
    EGL.setErrorCode(12296);
    return 0;
  }
  var glesContextVersion = 1;
  for (;;) {
    var param = HEAP32[contextAttribs >> 2];
    if (param == 12440) {
      glesContextVersion = HEAP32[(contextAttribs + 4) >> 2];
    } else if (param == 12344) {
      break;
    } else {
      EGL.setErrorCode(12292);
      return 0;
    }
    contextAttribs += 8;
  }
  if (glesContextVersion < 2 || glesContextVersion > 3) {
    EGL.setErrorCode(12293);
    return 0;
  }
  EGL.contextAttributes.majorVersion = glesContextVersion - 1;
  EGL.contextAttributes.minorVersion = 0;
  EGL.context = GL.createContext(Browser.getCanvas(), EGL.contextAttributes);
  if (EGL.context != 0) {
    EGL.setErrorCode(12288);
    GL.makeContextCurrent(EGL.context);
    Browser.useWebGL = true;
    Browser.moduleContextCreatedCallbacks.forEach((callback) => callback());
    GL.makeContextCurrent(null);
    return 62004;
  } else {
    EGL.setErrorCode(12297);
    return 0;
  }
};
var _eglCreateWindowSurface = (display, config, win, attrib_list) => {
  if (display != 62e3) {
    EGL.setErrorCode(12296);
    return 0;
  }
  if (config != 62002) {
    EGL.setErrorCode(12293);
    return 0;
  }
  EGL.setErrorCode(12288);
  return 62006;
};
var _eglDestroyContext = (display, context) => {
  if (display != 62e3) {
    EGL.setErrorCode(12296);
    return 0;
  }
  if (context != 62004) {
    EGL.setErrorCode(12294);
    return 0;
  }
  GL.deleteContext(EGL.context);
  EGL.setErrorCode(12288);
  if (EGL.currentContext == context) {
    EGL.currentContext = 0;
  }
  return 1;
};
var _eglDestroySurface = (display, surface) => {
  if (display != 62e3) {
    EGL.setErrorCode(12296);
    return 0;
  }
  if (surface != 62006) {
    EGL.setErrorCode(12301);
    return 1;
  }
  if (EGL.currentReadSurface == surface) {
    EGL.currentReadSurface = 0;
  }
  if (EGL.currentDrawSurface == surface) {
    EGL.currentDrawSurface = 0;
  }
  EGL.setErrorCode(12288);
  return 1;
};
var _eglGetConfigAttrib = (display, config, attribute, value) => {
  if (display != 62e3) {
    EGL.setErrorCode(12296);
    return 0;
  }
  if (config != 62002) {
    EGL.setErrorCode(12293);
    return 0;
  }
  if (!value) {
    EGL.setErrorCode(12300);
    return 0;
  }
  EGL.setErrorCode(12288);
  switch (attribute) {
    case 12320:
      HEAP32[value >> 2] = EGL.contextAttributes.alpha ? 32 : 24;
      return 1;
    case 12321:
      HEAP32[value >> 2] = EGL.contextAttributes.alpha ? 8 : 0;
      return 1;
    case 12322:
      HEAP32[value >> 2] = 8;
      return 1;
    case 12323:
      HEAP32[value >> 2] = 8;
      return 1;
    case 12324:
      HEAP32[value >> 2] = 8;
      return 1;
    case 12325:
      HEAP32[value >> 2] = EGL.contextAttributes.depth ? 24 : 0;
      return 1;
    case 12326:
      HEAP32[value >> 2] = EGL.contextAttributes.stencil ? 8 : 0;
      return 1;
    case 12327:
      HEAP32[value >> 2] = 12344;
      return 1;
    case 12328:
      HEAP32[value >> 2] = 62002;
      return 1;
    case 12329:
      HEAP32[value >> 2] = 0;
      return 1;
    case 12330:
      HEAP32[value >> 2] = 4096;
      return 1;
    case 12331:
      HEAP32[value >> 2] = 16777216;
      return 1;
    case 12332:
      HEAP32[value >> 2] = 4096;
      return 1;
    case 12333:
      HEAP32[value >> 2] = 0;
      return 1;
    case 12334:
      HEAP32[value >> 2] = 0;
      return 1;
    case 12335:
      HEAP32[value >> 2] = 12344;
      return 1;
    case 12337:
      HEAP32[value >> 2] = EGL.contextAttributes.antialias ? 4 : 0;
      return 1;
    case 12338:
      HEAP32[value >> 2] = EGL.contextAttributes.antialias ? 1 : 0;
      return 1;
    case 12339:
      HEAP32[value >> 2] = 4;
      return 1;
    case 12340:
      HEAP32[value >> 2] = 12344;
      return 1;
    case 12341:
    case 12342:
    case 12343:
      HEAP32[value >> 2] = -1;
      return 1;
    case 12345:
    case 12346:
      HEAP32[value >> 2] = 0;
      return 1;
    case 12347:
      HEAP32[value >> 2] = 0;
      return 1;
    case 12348:
      HEAP32[value >> 2] = 1;
      return 1;
    case 12349:
    case 12350:
      HEAP32[value >> 2] = 0;
      return 1;
    case 12351:
      HEAP32[value >> 2] = 12430;
      return 1;
    case 12352:
      HEAP32[value >> 2] = 4;
      return 1;
    case 12354:
      HEAP32[value >> 2] = 0;
      return 1;
    default:
      EGL.setErrorCode(12292);
      return 0;
  }
};
var _eglGetDisplay = (nativeDisplayType) => {
  EGL.setErrorCode(12288);
  if (nativeDisplayType != 0 && nativeDisplayType != 1) {
    return 0;
  }
  return 62e3;
};
var _eglGetError = () => EGL.errorCode;
var _eglInitialize = (display, majorVersion, minorVersion) => {
  if (display != 62e3) {
    EGL.setErrorCode(12296);
    return 0;
  }
  if (majorVersion) {
    HEAP32[majorVersion >> 2] = 1;
  }
  if (minorVersion) {
    HEAP32[minorVersion >> 2] = 4;
  }
  EGL.defaultDisplayInitialized = true;
  EGL.setErrorCode(12288);
  return 1;
};
var _eglMakeCurrent = (display, draw, read, context) => {
  if (display != 62e3) {
    EGL.setErrorCode(12296);
    return 0;
  }
  if (context != 0 && context != 62004) {
    EGL.setErrorCode(12294);
    return 0;
  }
  if ((read != 0 && read != 62006) || (draw != 0 && draw != 62006)) {
    EGL.setErrorCode(12301);
    return 0;
  }
  GL.makeContextCurrent(context ? EGL.context : null);
  EGL.currentContext = context;
  EGL.currentDrawSurface = draw;
  EGL.currentReadSurface = read;
  EGL.setErrorCode(12288);
  return 1;
};
var _eglQueryString = (display, name) => {
  if (display != 62e3) {
    EGL.setErrorCode(12296);
    return 0;
  }
  EGL.setErrorCode(12288);
  if (EGL.stringCache[name]) return EGL.stringCache[name];
  var ret;
  switch (name) {
    case 12371:
      ret = stringToNewUTF8("Emscripten");
      break;
    case 12372:
      ret = stringToNewUTF8("1.4 Emscripten EGL");
      break;
    case 12373:
      ret = stringToNewUTF8("");
      break;
    case 12429:
      ret = stringToNewUTF8("OpenGL_ES");
      break;
    default:
      EGL.setErrorCode(12300);
      return 0;
  }
  EGL.stringCache[name] = ret;
  return ret;
};
var _eglSwapBuffers = (dpy, surface) => {
  if (!EGL.defaultDisplayInitialized) {
    EGL.setErrorCode(12289);
  } else if (!GLctx) {
    EGL.setErrorCode(12290);
  } else if (GLctx.isContextLost()) {
    EGL.setErrorCode(12302);
  } else {
    EGL.setErrorCode(12288);
    return 1;
  }
  return 0;
};
var _eglSwapInterval = (display, interval) => {
  if (display != 62e3) {
    EGL.setErrorCode(12296);
    return 0;
  }
  if (interval == 0) _emscripten_set_main_loop_timing(0, 0);
  else _emscripten_set_main_loop_timing(1, interval);
  EGL.setErrorCode(12288);
  return 1;
};
var _eglTerminate = (display) => {
  if (display != 62e3) {
    EGL.setErrorCode(12296);
    return 0;
  }
  EGL.currentContext = 0;
  EGL.currentReadSurface = 0;
  EGL.currentDrawSurface = 0;
  EGL.defaultDisplayInitialized = false;
  EGL.setErrorCode(12288);
  return 1;
};
var _eglWaitClient = () => {
  EGL.setErrorCode(12288);
  return 1;
};
var _eglWaitGL = _eglWaitClient;
var _eglWaitNative = (nativeEngineId) => {
  EGL.setErrorCode(12288);
  return 1;
};
var readEmAsmArgsArray = [];
var readEmAsmArgs = (sigPtr, buf) => {
  readEmAsmArgsArray.length = 0;
  var ch;
  while ((ch = HEAPU8[sigPtr++])) {
    var wide = ch != 105;
    wide &= ch != 112;
    buf += wide && buf % 8 ? 4 : 0;
    readEmAsmArgsArray.push(
      ch == 112 ? HEAPU32[buf >> 2] : ch == 106 ? HEAP64[buf >> 3] : ch == 105 ? HEAP32[buf >> 2] : HEAPF64[buf >> 3]
    );
    buf += wide ? 8 : 4;
  }
  return readEmAsmArgsArray;
};
var runEmAsmFunction = (code, sigPtr, argbuf) => {
  var args = readEmAsmArgs(sigPtr, argbuf);
  return ASM_CONSTS[code](...args);
};
var _emscripten_asm_const_int = (code, sigPtr, argbuf) => runEmAsmFunction(code, sigPtr, argbuf);
var runMainThreadEmAsm = (emAsmAddr, sigPtr, argbuf, sync) => {
  var args = readEmAsmArgs(sigPtr, argbuf);
  return ASM_CONSTS[emAsmAddr](...args);
};
var _emscripten_asm_const_int_sync_on_main_thread = (emAsmAddr, sigPtr, argbuf) =>
  runMainThreadEmAsm(emAsmAddr, sigPtr, argbuf, 1);
var _emscripten_asm_const_ptr_sync_on_main_thread = (emAsmAddr, sigPtr, argbuf) =>
  runMainThreadEmAsm(emAsmAddr, sigPtr, argbuf, 1);
var _emscripten_err = (str) => err(UTF8ToString(str));
var JSEvents = {
  removeAllEventListeners() {
    while (JSEvents.eventHandlers.length) {
      JSEvents._removeHandler(JSEvents.eventHandlers.length - 1);
    }
    JSEvents.deferredCalls = [];
  },
  inEventHandler: 0,
  deferredCalls: [],
  deferCall(targetFunction, precedence, argsList) {
    function arraysHaveEqualContent(arrA, arrB) {
      if (arrA.length != arrB.length) return false;
      for (var i in arrA) {
        if (arrA[i] != arrB[i]) return false;
      }
      return true;
    }
    for (var call of JSEvents.deferredCalls) {
      if (call.targetFunction == targetFunction && arraysHaveEqualContent(call.argsList, argsList)) {
        return;
      }
    }
    JSEvents.deferredCalls.push({ targetFunction, precedence, argsList });
    JSEvents.deferredCalls.sort((x, y) => x.precedence < y.precedence);
  },
  removeDeferredCalls(targetFunction) {
    JSEvents.deferredCalls = JSEvents.deferredCalls.filter((call) => call.targetFunction != targetFunction);
  },
  canPerformEventHandlerRequests() {
    if (navigator.userActivation) {
      return navigator.userActivation.isActive;
    }
    return JSEvents.inEventHandler && JSEvents.currentEventHandler.allowsDeferredCalls;
  },
  runDeferredCalls() {
    if (!JSEvents.canPerformEventHandlerRequests()) {
      return;
    }
    var deferredCalls = JSEvents.deferredCalls;
    JSEvents.deferredCalls = [];
    for (var call of deferredCalls) {
      call.targetFunction(...call.argsList);
    }
  },
  eventHandlers: [],
  removeAllHandlersOnTarget: (target, eventTypeString) => {
    for (var i = 0; i < JSEvents.eventHandlers.length; ++i) {
      if (
        JSEvents.eventHandlers[i].target == target &&
        (!eventTypeString || eventTypeString == JSEvents.eventHandlers[i].eventTypeString)
      ) {
        JSEvents._removeHandler(i--);
      }
    }
  },
  _removeHandler(i) {
    var h = JSEvents.eventHandlers[i];
    h.target.removeEventListener(h.eventTypeString, h.eventListenerFunc, h.useCapture);
    JSEvents.eventHandlers.splice(i, 1);
  },
  registerOrRemoveHandler(eventHandler) {
    if (!eventHandler.target) {
      return -4;
    }
    if (eventHandler.callbackfunc) {
      eventHandler.eventListenerFunc = function (event) {
        ++JSEvents.inEventHandler;
        JSEvents.currentEventHandler = eventHandler;
        JSEvents.runDeferredCalls();
        eventHandler.handlerFunc(event);
        JSEvents.runDeferredCalls();
        --JSEvents.inEventHandler;
      };
      eventHandler.target.addEventListener(
        eventHandler.eventTypeString,
        eventHandler.eventListenerFunc,
        eventHandler.useCapture
      );
      JSEvents.eventHandlers.push(eventHandler);
    } else {
      for (var i = 0; i < JSEvents.eventHandlers.length; ++i) {
        if (
          JSEvents.eventHandlers[i].target == eventHandler.target &&
          JSEvents.eventHandlers[i].eventTypeString == eventHandler.eventTypeString
        ) {
          JSEvents._removeHandler(i--);
        }
      }
    }
    return 0;
  },
  removeSingleHandler(eventHandler) {
    let success = false;
    for (let i = 0; i < JSEvents.eventHandlers.length; ++i) {
      const handler = JSEvents.eventHandlers[i];
      if (
        handler.target === eventHandler.target &&
        handler.eventTypeId === eventHandler.eventTypeId &&
        handler.callbackfunc === eventHandler.callbackfunc &&
        handler.userData === eventHandler.userData
      ) {
        JSEvents._removeHandler(i--);
        success = true;
      }
    }
    return success ? 0 : -5;
  },
  getNodeNameForTarget(target) {
    if (!target) return "";
    if (target == window) return "#window";
    if (target == screen) return "#screen";
    return target?.nodeName || "";
  },
  fullscreenEnabled() {
    return document.fullscreenEnabled || document.webkitFullscreenEnabled;
  }
};
var specialHTMLTargets = [0, globalThis.document ?? 0, globalThis.window ?? 0];
var maybeCStringToJsString = (cString) => (cString > 2 ? UTF8ToString(cString) : cString);
var findEventTarget = (target) => {
  target = maybeCStringToJsString(target);
  var domElement = specialHTMLTargets[target] || globalThis.document?.querySelector(target);
  return domElement;
};
var findCanvasEventTarget = findEventTarget;
var _emscripten_get_canvas_element_size = (target, width, height) => {
  var canvas = findCanvasEventTarget(target);
  if (!canvas) return -4;
  HEAP32[width >> 2] = canvas.width;
  HEAP32[height >> 2] = canvas.height;
};
var stackAlloc = (sz) => __emscripten_stack_alloc(sz);
var stringToUTF8OnStack = (str) => {
  var size = lengthBytesUTF8(str) + 1;
  var ret = stackAlloc(size);
  stringToUTF8(str, ret, size);
  return ret;
};
var getCanvasElementSize = (target) => {
  var sp = stackSave();
  var w = stackAlloc(8);
  var h = w + 4;
  var targetInt = stringToUTF8OnStack(target.id);
  var ret = _emscripten_get_canvas_element_size(targetInt, w, h);
  var size = [HEAP32[w >> 2], HEAP32[h >> 2]];
  stackRestore(sp);
  return size;
};
var _emscripten_set_canvas_element_size = (target, width, height) => {
  var canvas = findCanvasEventTarget(target);
  if (!canvas) return -4;
  canvas.width = width;
  canvas.height = height;
  return 0;
};
var setCanvasElementSize = (target, width, height) => {
  if (!target.controlTransferredOffscreen) {
    target.width = width;
    target.height = height;
  } else {
    var sp = stackSave();
    var targetInt = stringToUTF8OnStack(target.id);
    _emscripten_set_canvas_element_size(targetInt, width, height);
    stackRestore(sp);
  }
};
var currentFullscreenStrategy = {};
var getWasmTableEntry = (funcPtr) => wasmTable.get(funcPtr);
var registerRestoreOldStyle = (canvas) => {
  var canvasSize = getCanvasElementSize(canvas);
  var oldWidth = canvasSize[0];
  var oldHeight = canvasSize[1];
  var oldCssWidth = canvas.style.width;
  var oldCssHeight = canvas.style.height;
  var oldBackgroundColor = canvas.style.backgroundColor;
  var oldDocumentBackgroundColor = document.body.style.backgroundColor;
  var oldPaddingLeft = canvas.style.paddingLeft;
  var oldPaddingRight = canvas.style.paddingRight;
  var oldPaddingTop = canvas.style.paddingTop;
  var oldPaddingBottom = canvas.style.paddingBottom;
  var oldMarginLeft = canvas.style.marginLeft;
  var oldMarginRight = canvas.style.marginRight;
  var oldMarginTop = canvas.style.marginTop;
  var oldMarginBottom = canvas.style.marginBottom;
  var oldDocumentBodyMargin = document.body.style.margin;
  var oldDocumentOverflow = document.documentElement.style.overflow;
  var oldDocumentScroll = document.body.scroll;
  var oldImageRendering = canvas.style.imageRendering;
  function restoreOldStyle() {
    if (!getFullscreenElement()) {
      document.removeEventListener("fullscreenchange", restoreOldStyle);
      document.removeEventListener("webkitfullscreenchange", restoreOldStyle);
      setCanvasElementSize(canvas, oldWidth, oldHeight);
      canvas.style.width = oldCssWidth;
      canvas.style.height = oldCssHeight;
      canvas.style.backgroundColor = oldBackgroundColor;
      if (!oldDocumentBackgroundColor) document.body.style.backgroundColor = "white";
      document.body.style.backgroundColor = oldDocumentBackgroundColor;
      canvas.style.paddingLeft = oldPaddingLeft;
      canvas.style.paddingRight = oldPaddingRight;
      canvas.style.paddingTop = oldPaddingTop;
      canvas.style.paddingBottom = oldPaddingBottom;
      canvas.style.marginLeft = oldMarginLeft;
      canvas.style.marginRight = oldMarginRight;
      canvas.style.marginTop = oldMarginTop;
      canvas.style.marginBottom = oldMarginBottom;
      document.body.style.margin = oldDocumentBodyMargin;
      document.documentElement.style.overflow = oldDocumentOverflow;
      document.body.scroll = oldDocumentScroll;
      canvas.style.imageRendering = oldImageRendering;
      if (canvas.GLctxObject) canvas.GLctxObject.GLctx.viewport(0, 0, oldWidth, oldHeight);
      if (currentFullscreenStrategy.canvasResizedCallback) {
        getWasmTableEntry(currentFullscreenStrategy.canvasResizedCallback)(
          37,
          0,
          currentFullscreenStrategy.canvasResizedCallbackUserData
        );
      }
    }
  }
  document.addEventListener("fullscreenchange", restoreOldStyle);
  document.addEventListener("webkitfullscreenchange", restoreOldStyle);
  return restoreOldStyle;
};
var setLetterbox = (element, topBottom, leftRight) => {
  element.style.paddingLeft = element.style.paddingRight = leftRight + "px";
  element.style.paddingTop = element.style.paddingBottom = topBottom + "px";
};
var getBoundingClientRect = (e) =>
  specialHTMLTargets.indexOf(e) < 0 ? e.getBoundingClientRect() : { left: 0, top: 0 };
var JSEvents_resizeCanvasForFullscreen = (target, strategy) => {
  var restoreOldStyle = registerRestoreOldStyle(target);
  var cssWidth = strategy.softFullscreen ? innerWidth : screen.width;
  var cssHeight = strategy.softFullscreen ? innerHeight : screen.height;
  var rect = getBoundingClientRect(target);
  var windowedCssWidth = rect.width;
  var windowedCssHeight = rect.height;
  var canvasSize = getCanvasElementSize(target);
  var windowedRttWidth = canvasSize[0];
  var windowedRttHeight = canvasSize[1];
  if (strategy.scaleMode == 3) {
    setLetterbox(target, (cssHeight - windowedCssHeight) / 2, (cssWidth - windowedCssWidth) / 2);
    cssWidth = windowedCssWidth;
    cssHeight = windowedCssHeight;
  } else if (strategy.scaleMode == 2) {
    if (cssWidth * windowedRttHeight < windowedRttWidth * cssHeight) {
      var desiredCssHeight = (windowedRttHeight * cssWidth) / windowedRttWidth;
      setLetterbox(target, (cssHeight - desiredCssHeight) / 2, 0);
      cssHeight = desiredCssHeight;
    } else {
      var desiredCssWidth = (windowedRttWidth * cssHeight) / windowedRttHeight;
      setLetterbox(target, 0, (cssWidth - desiredCssWidth) / 2);
      cssWidth = desiredCssWidth;
    }
  }
  target.style.backgroundColor ||= "black";
  document.body.style.backgroundColor ||= "black";
  target.style.width = cssWidth + "px";
  target.style.height = cssHeight + "px";
  if (strategy.filteringMode == 1) {
    target.style.imageRendering = "optimizeSpeed";
    target.style.imageRendering = "-moz-crisp-edges";
    target.style.imageRendering = "-o-crisp-edges";
    target.style.imageRendering = "-webkit-optimize-contrast";
    target.style.imageRendering = "optimize-contrast";
    target.style.imageRendering = "crisp-edges";
    target.style.imageRendering = "pixelated";
  }
  var dpiScale = strategy.canvasResolutionScaleMode == 2 ? devicePixelRatio : 1;
  if (strategy.canvasResolutionScaleMode != 0) {
    var newWidth = (cssWidth * dpiScale) | 0;
    var newHeight = (cssHeight * dpiScale) | 0;
    setCanvasElementSize(target, newWidth, newHeight);
    if (target.GLctxObject) target.GLctxObject.GLctx.viewport(0, 0, newWidth, newHeight);
  }
  return restoreOldStyle;
};
var JSEvents_requestFullscreen = (target, strategy) => {
  if (strategy.scaleMode != 0 || strategy.canvasResolutionScaleMode != 0) {
    JSEvents_resizeCanvasForFullscreen(target, strategy);
  }
  if (target.requestFullscreen) {
    target.requestFullscreen();
  } else if (target.webkitRequestFullscreen) {
    target.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
  } else {
    return JSEvents.fullscreenEnabled() ? -3 : -1;
  }
  currentFullscreenStrategy = strategy;
  if (strategy.canvasResizedCallback) {
    getWasmTableEntry(strategy.canvasResizedCallback)(37, 0, strategy.canvasResizedCallbackUserData);
  }
  return 0;
};
var _emscripten_exit_fullscreen = () => {
  if (!JSEvents.fullscreenEnabled()) return -1;
  JSEvents.removeDeferredCalls(JSEvents_requestFullscreen);
  var d = specialHTMLTargets[1];
  if (d.exitFullscreen) {
    d.fullscreenElement && d.exitFullscreen();
  } else if (d.webkitExitFullscreen) {
    d.webkitFullscreenElement && d.webkitExitFullscreen();
  } else {
    return -1;
  }
  return 0;
};
var requestPointerLock = (target) => {
  if (target.requestPointerLock) {
    target.requestPointerLock();
  } else {
    if (document.body.requestPointerLock) {
      return -3;
    }
    return -1;
  }
  return 0;
};
var _emscripten_exit_pointerlock = () => {
  JSEvents.removeDeferredCalls(requestPointerLock);
  if (!document.exitPointerLock) return -1;
  document.exitPointerLock();
  return 0;
};
function _emscripten_fetch_free(id) {
  if (Fetch.xhrs.has(id)) {
    var xhr = Fetch.xhrs.get(id);
    Fetch.xhrs.free(id);
    if (xhr.readyState > 0 && xhr.readyState < 4) {
      xhr.abort();
    }
  }
}
var _emscripten_get_device_pixel_ratio = () => globalThis.devicePixelRatio ?? 1;
var _emscripten_get_element_css_size = (target, width, height) => {
  target = findEventTarget(target);
  if (!target) return -4;
  var rect = getBoundingClientRect(target);
  HEAPF64[width >> 3] = rect.width;
  HEAPF64[height >> 3] = rect.height;
  return 0;
};
var fillGamepadEventData = (eventStruct, e) => {
  HEAPF64[eventStruct >> 3] = e.timestamp;
  for (var i = 0; i < e.axes.length; ++i) {
    HEAPF64[(eventStruct + i * 8 + 16) >> 3] = e.axes[i];
  }
  for (var i = 0; i < e.buttons.length; ++i) {
    if (typeof e.buttons[i] == "object") {
      HEAPF64[(eventStruct + i * 8 + 528) >> 3] = e.buttons[i].value;
    } else {
      HEAPF64[(eventStruct + i * 8 + 528) >> 3] = e.buttons[i];
    }
  }
  for (var i = 0; i < e.buttons.length; ++i) {
    if (typeof e.buttons[i] == "object") {
      HEAP8[eventStruct + i + 1040] = e.buttons[i].pressed;
    } else {
      HEAP8[eventStruct + i + 1040] = e.buttons[i] == 1;
    }
  }
  HEAP8[eventStruct + 1104] = e.connected;
  HEAP32[(eventStruct + 1108) >> 2] = e.index;
  HEAP32[(eventStruct + 8) >> 2] = e.axes.length;
  HEAP32[(eventStruct + 12) >> 2] = e.buttons.length;
  stringToUTF8(e.id, eventStruct + 1112, 64);
  stringToUTF8(e.mapping, eventStruct + 1176, 64);
};
var _emscripten_get_gamepad_status = (index, gamepadState) => {
  if (index < 0 || index >= JSEvents.lastGamepadState.length) return -5;
  if (!JSEvents.lastGamepadState[index]) return -7;
  fillGamepadEventData(gamepadState, JSEvents.lastGamepadState[index]);
  return 0;
};
var _emscripten_get_num_gamepads = () => JSEvents.lastGamepadState.length;
var _emscripten_get_screen_size = (width, height) => {
  HEAP32[width >> 2] = screen.width;
  HEAP32[height >> 2] = screen.height;
};
var _emscripten_glActiveTexture = (x0) => GLctx.activeTexture(x0);
var _emscripten_glAttachShader = (program, shader) => {
  GLctx.attachShader(GL.programs[program], GL.shaders[shader]);
};
var _emscripten_glBeginQuery = (target, id) => {
  GLctx.beginQuery(target, GL.queries[id]);
};
var _emscripten_glBeginQueryEXT = (target, id) => {
  GLctx.disjointTimerQueryExt["beginQueryEXT"](target, GL.queries[id]);
};
var _emscripten_glBeginTransformFeedback = (x0) => GLctx.beginTransformFeedback(x0);
var _emscripten_glBindAttribLocation = (program, index, name) => {
  GLctx.bindAttribLocation(GL.programs[program], index, UTF8ToString(name));
};
var _emscripten_glBindBuffer = (target, buffer) => {
  if (buffer && !GL.buffers[buffer]) {
    var b = GLctx.createBuffer();
    b.name = buffer;
    GL.buffers[buffer] = b;
  }
  if (target == 34962) {
    GLctx.currentArrayBufferBinding = buffer;
  } else if (target == 34963) {
    GLctx.currentElementArrayBufferBinding = buffer;
  }
  if (target == 35051) {
    GLctx.currentPixelPackBufferBinding = buffer;
  } else if (target == 35052) {
    GLctx.currentPixelUnpackBufferBinding = buffer;
  }
  GLctx.bindBuffer(target, GL.buffers[buffer]);
};
var _emscripten_glBindBufferBase = (target, index, buffer) => {
  GLctx.bindBufferBase(target, index, GL.buffers[buffer]);
};
var _emscripten_glBindBufferRange = (target, index, buffer, offset, ptrsize) => {
  GLctx.bindBufferRange(target, index, GL.buffers[buffer], offset, ptrsize);
};
var _emscripten_glBindFramebuffer = (target, framebuffer) => {
  GLctx.bindFramebuffer(target, GL.framebuffers[framebuffer]);
};
var _emscripten_glBindRenderbuffer = (target, renderbuffer) => {
  GLctx.bindRenderbuffer(target, GL.renderbuffers[renderbuffer]);
};
var _emscripten_glBindSampler = (unit, sampler) => {
  GLctx.bindSampler(unit, GL.samplers[sampler]);
};
var _emscripten_glBindTexture = (target, texture) => {
  GLctx.bindTexture(target, GL.textures[texture]);
};
var _emscripten_glBindTransformFeedback = (target, id) => {
  GLctx.bindTransformFeedback(target, GL.transformFeedbacks[id]);
};
var _emscripten_glBindVertexArray = (vao) => {
  GLctx.bindVertexArray(GL.vaos[vao]);
  var ibo = GLctx.getParameter(34965);
  GLctx.currentElementArrayBufferBinding = ibo ? ibo.name | 0 : 0;
};
var _emscripten_glBindVertexArrayOES = _emscripten_glBindVertexArray;
var _emscripten_glBlendColor = (x0, x1, x2, x3) => GLctx.blendColor(x0, x1, x2, x3);
var _emscripten_glBlendEquation = (x0) => GLctx.blendEquation(x0);
var _emscripten_glBlendEquationSeparate = (x0, x1) => GLctx.blendEquationSeparate(x0, x1);
var _emscripten_glBlendFunc = (x0, x1) => GLctx.blendFunc(x0, x1);
var _emscripten_glBlendFuncSeparate = (x0, x1, x2, x3) => GLctx.blendFuncSeparate(x0, x1, x2, x3);
var _emscripten_glBlitFramebuffer = (x0, x1, x2, x3, x4, x5, x6, x7, x8, x9) =>
  GLctx.blitFramebuffer(x0, x1, x2, x3, x4, x5, x6, x7, x8, x9);
var _emscripten_glBufferData = (target, size, data, usage) => {
  if (GL.currentContext.version >= 2) {
    if (data && size) {
      GLctx.bufferData(target, HEAPU8, usage, data, size);
    } else {
      GLctx.bufferData(target, size, usage);
    }
    return;
  }
  GLctx.bufferData(target, data ? HEAPU8.subarray(data, data + size) : size, usage);
};
var _emscripten_glBufferSubData = (target, offset, size, data) => {
  if (GL.currentContext.version >= 2) {
    size && GLctx.bufferSubData(target, offset, HEAPU8, data, size);
    return;
  }
  GLctx.bufferSubData(target, offset, HEAPU8.subarray(data, data + size));
};
var _emscripten_glCheckFramebufferStatus = (x0) => GLctx.checkFramebufferStatus(x0);
var _emscripten_glClear = (x0) => GLctx.clear(x0);
var _emscripten_glClearBufferfi = (x0, x1, x2, x3) => GLctx.clearBufferfi(x0, x1, x2, x3);
var _emscripten_glClearBufferfv = (buffer, drawbuffer, value) => {
  GLctx.clearBufferfv(buffer, drawbuffer, HEAPF32, value >> 2);
};
var _emscripten_glClearBufferiv = (buffer, drawbuffer, value) => {
  GLctx.clearBufferiv(buffer, drawbuffer, HEAP32, value >> 2);
};
var _emscripten_glClearBufferuiv = (buffer, drawbuffer, value) => {
  GLctx.clearBufferuiv(buffer, drawbuffer, HEAPU32, value >> 2);
};
var _emscripten_glClearColor = (x0, x1, x2, x3) => GLctx.clearColor(x0, x1, x2, x3);
var _emscripten_glClearDepthf = (x0) => GLctx.clearDepth(x0);
var _emscripten_glClearStencil = (x0) => GLctx.clearStencil(x0);
var _emscripten_glClientWaitSync = (sync, flags, timeout) => {
  timeout = Number(timeout);
  return GLctx.clientWaitSync(GL.syncs[sync], flags, timeout);
};
var _emscripten_glClipControlEXT = (origin, depth) => {
  GLctx.extClipControl["clipControlEXT"](origin, depth);
};
var _emscripten_glColorMask = (red, green, blue, alpha) => {
  GLctx.colorMask(!!red, !!green, !!blue, !!alpha);
};
var _emscripten_glCompileShader = (shader) => {
  GLctx.compileShader(GL.shaders[shader]);
};
var _emscripten_glCompressedTexImage2D = (target, level, internalFormat, width, height, border, imageSize, data) => {
  if (GL.currentContext.version >= 2) {
    if (GLctx.currentPixelUnpackBufferBinding || !imageSize) {
      GLctx.compressedTexImage2D(target, level, internalFormat, width, height, border, imageSize, data);
      return;
    }
    GLctx.compressedTexImage2D(target, level, internalFormat, width, height, border, HEAPU8, data, imageSize);
    return;
  }
  GLctx.compressedTexImage2D(
    target,
    level,
    internalFormat,
    width,
    height,
    border,
    HEAPU8.subarray(data, data + imageSize)
  );
};
var _emscripten_glCompressedTexImage3D = (
  target,
  level,
  internalFormat,
  width,
  height,
  depth,
  border,
  imageSize,
  data
) => {
  if (GLctx.currentPixelUnpackBufferBinding) {
    GLctx.compressedTexImage3D(target, level, internalFormat, width, height, depth, border, imageSize, data);
  } else {
    GLctx.compressedTexImage3D(target, level, internalFormat, width, height, depth, border, HEAPU8, data, imageSize);
  }
};
var _emscripten_glCompressedTexSubImage2D = (
  target,
  level,
  xoffset,
  yoffset,
  width,
  height,
  format,
  imageSize,
  data
) => {
  if (GL.currentContext.version >= 2) {
    if (GLctx.currentPixelUnpackBufferBinding || !imageSize) {
      GLctx.compressedTexSubImage2D(target, level, xoffset, yoffset, width, height, format, imageSize, data);
      return;
    }
    GLctx.compressedTexSubImage2D(target, level, xoffset, yoffset, width, height, format, HEAPU8, data, imageSize);
    return;
  }
  GLctx.compressedTexSubImage2D(
    target,
    level,
    xoffset,
    yoffset,
    width,
    height,
    format,
    HEAPU8.subarray(data, data + imageSize)
  );
};
var _emscripten_glCompressedTexSubImage3D = (
  target,
  level,
  xoffset,
  yoffset,
  zoffset,
  width,
  height,
  depth,
  format,
  imageSize,
  data
) => {
  if (GLctx.currentPixelUnpackBufferBinding) {
    GLctx.compressedTexSubImage3D(
      target,
      level,
      xoffset,
      yoffset,
      zoffset,
      width,
      height,
      depth,
      format,
      imageSize,
      data
    );
  } else {
    GLctx.compressedTexSubImage3D(
      target,
      level,
      xoffset,
      yoffset,
      zoffset,
      width,
      height,
      depth,
      format,
      HEAPU8,
      data,
      imageSize
    );
  }
};
var _emscripten_glCopyBufferSubData = (x0, x1, x2, x3, x4) => GLctx.copyBufferSubData(x0, x1, x2, x3, x4);
var _emscripten_glCopyTexImage2D = (x0, x1, x2, x3, x4, x5, x6, x7) =>
  GLctx.copyTexImage2D(x0, x1, x2, x3, x4, x5, x6, x7);
var _emscripten_glCopyTexSubImage2D = (x0, x1, x2, x3, x4, x5, x6, x7) =>
  GLctx.copyTexSubImage2D(x0, x1, x2, x3, x4, x5, x6, x7);
var _emscripten_glCopyTexSubImage3D = (x0, x1, x2, x3, x4, x5, x6, x7, x8) =>
  GLctx.copyTexSubImage3D(x0, x1, x2, x3, x4, x5, x6, x7, x8);
var _emscripten_glCreateProgram = () => {
  var id = GL.getNewId(GL.programs);
  var program = GLctx.createProgram();
  program.name = id;
  program.maxUniformLength = program.maxAttributeLength = program.maxUniformBlockNameLength = 0;
  program.uniformIdCounter = 1;
  GL.programs[id] = program;
  return id;
};
var _emscripten_glCreateShader = (shaderType) => {
  var id = GL.getNewId(GL.shaders);
  GL.shaders[id] = GLctx.createShader(shaderType);
  return id;
};
var _emscripten_glCullFace = (x0) => GLctx.cullFace(x0);
var _emscripten_glDeleteBuffers = (n, buffers) => {
  for (var i = 0; i < n; i++) {
    var id = HEAP32[(buffers + i * 4) >> 2];
    var buffer = GL.buffers[id];
    if (!buffer) continue;
    GLctx.deleteBuffer(buffer);
    buffer.name = 0;
    GL.buffers[id] = null;
    if (id == GLctx.currentArrayBufferBinding) GLctx.currentArrayBufferBinding = 0;
    if (id == GLctx.currentElementArrayBufferBinding) GLctx.currentElementArrayBufferBinding = 0;
    if (id == GLctx.currentPixelPackBufferBinding) GLctx.currentPixelPackBufferBinding = 0;
    if (id == GLctx.currentPixelUnpackBufferBinding) GLctx.currentPixelUnpackBufferBinding = 0;
  }
};
var _emscripten_glDeleteFramebuffers = (n, framebuffers) => {
  for (var i = 0; i < n; ++i) {
    var id = HEAP32[(framebuffers + i * 4) >> 2];
    var framebuffer = GL.framebuffers[id];
    if (!framebuffer) continue;
    GLctx.deleteFramebuffer(framebuffer);
    framebuffer.name = 0;
    GL.framebuffers[id] = null;
  }
};
var _emscripten_glDeleteProgram = (id) => {
  if (!id) return;
  var program = GL.programs[id];
  if (!program) {
    GL.recordError(1281);
    return;
  }
  GLctx.deleteProgram(program);
  program.name = 0;
  GL.programs[id] = null;
};
var _emscripten_glDeleteQueries = (n, ids) => {
  for (var i = 0; i < n; i++) {
    var id = HEAP32[(ids + i * 4) >> 2];
    var query = GL.queries[id];
    if (!query) continue;
    GLctx.deleteQuery(query);
    GL.queries[id] = null;
  }
};
var _emscripten_glDeleteQueriesEXT = (n, ids) => {
  for (var i = 0; i < n; i++) {
    var id = HEAP32[(ids + i * 4) >> 2];
    var query = GL.queries[id];
    if (!query) continue;
    GLctx.disjointTimerQueryExt["deleteQueryEXT"](query);
    GL.queries[id] = null;
  }
};
var _emscripten_glDeleteRenderbuffers = (n, renderbuffers) => {
  for (var i = 0; i < n; i++) {
    var id = HEAP32[(renderbuffers + i * 4) >> 2];
    var renderbuffer = GL.renderbuffers[id];
    if (!renderbuffer) continue;
    GLctx.deleteRenderbuffer(renderbuffer);
    renderbuffer.name = 0;
    GL.renderbuffers[id] = null;
  }
};
var _emscripten_glDeleteSamplers = (n, samplers) => {
  for (var i = 0; i < n; i++) {
    var id = HEAP32[(samplers + i * 4) >> 2];
    var sampler = GL.samplers[id];
    if (!sampler) continue;
    GLctx.deleteSampler(sampler);
    sampler.name = 0;
    GL.samplers[id] = null;
  }
};
var _emscripten_glDeleteShader = (id) => {
  if (!id) return;
  var shader = GL.shaders[id];
  if (!shader) {
    GL.recordError(1281);
    return;
  }
  GLctx.deleteShader(shader);
  GL.shaders[id] = null;
};
var _emscripten_glDeleteSync = (id) => {
  if (!id) return;
  var sync = GL.syncs[id];
  if (!sync) {
    GL.recordError(1281);
    return;
  }
  GLctx.deleteSync(sync);
  sync.name = 0;
  GL.syncs[id] = null;
};
var _emscripten_glDeleteTextures = (n, textures) => {
  for (var i = 0; i < n; i++) {
    var id = HEAP32[(textures + i * 4) >> 2];
    var texture = GL.textures[id];
    if (!texture) continue;
    GLctx.deleteTexture(texture);
    texture.name = 0;
    GL.textures[id] = null;
  }
};
var _emscripten_glDeleteTransformFeedbacks = (n, ids) => {
  for (var i = 0; i < n; i++) {
    var id = HEAP32[(ids + i * 4) >> 2];
    var transformFeedback = GL.transformFeedbacks[id];
    if (!transformFeedback) continue;
    GLctx.deleteTransformFeedback(transformFeedback);
    transformFeedback.name = 0;
    GL.transformFeedbacks[id] = null;
  }
};
var _emscripten_glDeleteVertexArrays = (n, vaos) => {
  for (var i = 0; i < n; i++) {
    var id = HEAP32[(vaos + i * 4) >> 2];
    GLctx.deleteVertexArray(GL.vaos[id]);
    GL.vaos[id] = null;
  }
};
var _emscripten_glDeleteVertexArraysOES = _emscripten_glDeleteVertexArrays;
var _emscripten_glDepthFunc = (x0) => GLctx.depthFunc(x0);
var _emscripten_glDepthMask = (flag) => {
  GLctx.depthMask(!!flag);
};
var _emscripten_glDepthRangef = (x0, x1) => GLctx.depthRange(x0, x1);
var _emscripten_glDetachShader = (program, shader) => {
  GLctx.detachShader(GL.programs[program], GL.shaders[shader]);
};
var _emscripten_glDisable = (x0) => GLctx.disable(x0);
var _emscripten_glDisableVertexAttribArray = (index) => {
  var cb = GL.currentContext.clientBuffers[index];
  cb.enabled = false;
  GLctx.disableVertexAttribArray(index);
};
var _emscripten_glDrawArrays = (mode, first, count) => {
  GL.preDrawHandleClientVertexAttribBindings(first + count);
  GLctx.drawArrays(mode, first, count);
  GL.postDrawHandleClientVertexAttribBindings();
};
var _emscripten_glDrawArraysInstanced = (mode, first, count, primcount) => {
  GLctx.drawArraysInstanced(mode, first, count, primcount);
};
var _emscripten_glDrawArraysInstancedANGLE = _emscripten_glDrawArraysInstanced;
var _emscripten_glDrawArraysInstancedARB = _emscripten_glDrawArraysInstanced;
var _emscripten_glDrawArraysInstancedEXT = _emscripten_glDrawArraysInstanced;
var _emscripten_glDrawArraysInstancedNV = _emscripten_glDrawArraysInstanced;
var tempFixedLengthArray = [];
var _emscripten_glDrawBuffers = (n, bufs) => {
  var bufArray = tempFixedLengthArray[n];
  for (var i = 0; i < n; i++) {
    bufArray[i] = HEAP32[(bufs + i * 4) >> 2];
  }
  GLctx.drawBuffers(bufArray);
};
var _emscripten_glDrawBuffersEXT = _emscripten_glDrawBuffers;
var _emscripten_glDrawBuffersWEBGL = _emscripten_glDrawBuffers;
var _emscripten_glDrawElements = (mode, count, type, indices) => {
  var buf;
  var vertexes = 0;
  if (!GLctx.currentElementArrayBufferBinding) {
    var size = GL.calcBufLength(1, type, 0, count);
    buf = GL.getTempIndexBuffer(size);
    GLctx.bindBuffer(34963, buf);
    GLctx.bufferSubData(34963, 0, HEAPU8.subarray(indices, indices + size));
    if (count > 0) {
      for (var i = 0; i < GL.currentContext.maxVertexAttribs; ++i) {
        var cb = GL.currentContext.clientBuffers[i];
        if (cb.clientside && cb.enabled) {
          let arrayClass;
          switch (type) {
            case 5121:
              arrayClass = Uint8Array;
              break;
            case 5123:
              arrayClass = Uint16Array;
              break;
            case 5125:
              arrayClass = Uint32Array;
              break;
            default:
              GL.recordError(1282);
              return;
          }
          vertexes = new arrayClass(HEAPU8.buffer, indices, count).reduce((max, current) => Math.max(max, current)) + 1;
          break;
        }
      }
    }
    indices = 0;
  }
  GL.preDrawHandleClientVertexAttribBindings(vertexes);
  GLctx.drawElements(mode, count, type, indices);
  GL.postDrawHandleClientVertexAttribBindings(count);
  if (!GLctx.currentElementArrayBufferBinding) {
    GLctx.bindBuffer(34963, null);
  }
};
var _emscripten_glDrawElementsInstanced = (mode, count, type, indices, primcount) => {
  GLctx.drawElementsInstanced(mode, count, type, indices, primcount);
};
var _emscripten_glDrawElementsInstancedANGLE = _emscripten_glDrawElementsInstanced;
var _emscripten_glDrawElementsInstancedARB = _emscripten_glDrawElementsInstanced;
var _emscripten_glDrawElementsInstancedEXT = _emscripten_glDrawElementsInstanced;
var _emscripten_glDrawElementsInstancedNV = _emscripten_glDrawElementsInstanced;
var _glDrawElements = _emscripten_glDrawElements;
var _emscripten_glDrawRangeElements = (mode, start, end, count, type, indices) => {
  _glDrawElements(mode, count, type, indices);
};
var _emscripten_glEnable = (x0) => GLctx.enable(x0);
var _emscripten_glEnableVertexAttribArray = (index) => {
  var cb = GL.currentContext.clientBuffers[index];
  cb.enabled = true;
  GLctx.enableVertexAttribArray(index);
};
var _emscripten_glEndQuery = (x0) => GLctx.endQuery(x0);
var _emscripten_glEndQueryEXT = (target) => {
  GLctx.disjointTimerQueryExt["endQueryEXT"](target);
};
var _emscripten_glEndTransformFeedback = () => GLctx.endTransformFeedback();
var _emscripten_glFenceSync = (condition, flags) => {
  var sync = GLctx.fenceSync(condition, flags);
  if (sync) {
    var id = GL.getNewId(GL.syncs);
    sync.name = id;
    GL.syncs[id] = sync;
    return id;
  }
  return 0;
};
var _emscripten_glFinish = () => GLctx.finish();
var _emscripten_glFlush = () => GLctx.flush();
var emscriptenWebGLGetBufferBinding = (target) => {
  switch (target) {
    case 34962:
      target = 34964;
      break;
    case 34963:
      target = 34965;
      break;
    case 35051:
      target = 35053;
      break;
    case 35052:
      target = 35055;
      break;
    case 35982:
      target = 35983;
      break;
    case 36662:
      target = 36662;
      break;
    case 36663:
      target = 36663;
      break;
    case 35345:
      target = 35368;
      break;
  }
  var buffer = GLctx.getParameter(target);
  if (buffer) return buffer.name | 0;
  else return 0;
};
var emscriptenWebGLValidateMapBufferTarget = (target) => {
  switch (target) {
    case 34962:
    case 34963:
    case 36662:
    case 36663:
    case 35051:
    case 35052:
    case 35882:
    case 35982:
    case 35345:
      return true;
    default:
      return false;
  }
};
var _emscripten_glFlushMappedBufferRange = (target, offset, length) => {
  if (!emscriptenWebGLValidateMapBufferTarget(target)) {
    GL.recordError(1280);
    err("GL_INVALID_ENUM in glFlushMappedBufferRange");
    return;
  }
  var mapping = GL.mappedBuffers[emscriptenWebGLGetBufferBinding(target)];
  if (!mapping) {
    GL.recordError(1282);
    err("buffer was never mapped in glFlushMappedBufferRange");
    return;
  }
  if (!(mapping.access & 16)) {
    GL.recordError(1282);
    err("buffer was not mapped with GL_MAP_FLUSH_EXPLICIT_BIT in glFlushMappedBufferRange");
    return;
  }
  if (offset < 0 || length < 0 || offset + length > mapping.length) {
    GL.recordError(1281);
    err("invalid range in glFlushMappedBufferRange");
    return;
  }
  GLctx.bufferSubData(target, mapping.offset, HEAPU8.subarray(mapping.mem + offset, mapping.mem + offset + length));
};
var _emscripten_glFramebufferRenderbuffer = (target, attachment, renderbuffertarget, renderbuffer) => {
  GLctx.framebufferRenderbuffer(target, attachment, renderbuffertarget, GL.renderbuffers[renderbuffer]);
};
var _emscripten_glFramebufferTexture2D = (target, attachment, textarget, texture, level) => {
  GLctx.framebufferTexture2D(target, attachment, textarget, GL.textures[texture], level);
};
var _emscripten_glFramebufferTextureLayer = (target, attachment, texture, level, layer) => {
  GLctx.framebufferTextureLayer(target, attachment, GL.textures[texture], level, layer);
};
var _emscripten_glFrontFace = (x0) => GLctx.frontFace(x0);
var _emscripten_glGenBuffers = (n, buffers) => {
  GL.genObject(n, buffers, "createBuffer", GL.buffers);
};
var _emscripten_glGenFramebuffers = (n, ids) => {
  GL.genObject(n, ids, "createFramebuffer", GL.framebuffers);
};
var _emscripten_glGenQueries = (n, ids) => {
  GL.genObject(n, ids, "createQuery", GL.queries);
};
var _emscripten_glGenQueriesEXT = (n, ids) => {
  for (var i = 0; i < n; i++) {
    var query = GLctx.disjointTimerQueryExt["createQueryEXT"]();
    if (!query) {
      GL.recordError(1282);
      while (i < n) HEAP32[(ids + i++ * 4) >> 2] = 0;
      return;
    }
    var id = GL.getNewId(GL.queries);
    query.name = id;
    GL.queries[id] = query;
    HEAP32[(ids + i * 4) >> 2] = id;
  }
};
var _emscripten_glGenRenderbuffers = (n, renderbuffers) => {
  GL.genObject(n, renderbuffers, "createRenderbuffer", GL.renderbuffers);
};
var _emscripten_glGenSamplers = (n, samplers) => {
  GL.genObject(n, samplers, "createSampler", GL.samplers);
};
var _emscripten_glGenTextures = (n, textures) => {
  GL.genObject(n, textures, "createTexture", GL.textures);
};
var _emscripten_glGenTransformFeedbacks = (n, ids) => {
  GL.genObject(n, ids, "createTransformFeedback", GL.transformFeedbacks);
};
var _emscripten_glGenVertexArrays = (n, arrays) => {
  GL.genObject(n, arrays, "createVertexArray", GL.vaos);
};
var _emscripten_glGenVertexArraysOES = _emscripten_glGenVertexArrays;
var _emscripten_glGenerateMipmap = (x0) => GLctx.generateMipmap(x0);
var __glGetActiveAttribOrUniform = (funcName, program, index, bufSize, length, size, type, name) => {
  program = GL.programs[program];
  var info = GLctx[funcName](program, index);
  if (info) {
    var numBytesWrittenExclNull = name && stringToUTF8(info.name, name, bufSize);
    if (length) HEAP32[length >> 2] = numBytesWrittenExclNull;
    if (size) HEAP32[size >> 2] = info.size;
    if (type) HEAP32[type >> 2] = info.type;
  }
};
var _emscripten_glGetActiveAttrib = (program, index, bufSize, length, size, type, name) =>
  __glGetActiveAttribOrUniform("getActiveAttrib", program, index, bufSize, length, size, type, name);
var _emscripten_glGetActiveUniform = (program, index, bufSize, length, size, type, name) =>
  __glGetActiveAttribOrUniform("getActiveUniform", program, index, bufSize, length, size, type, name);
var _emscripten_glGetActiveUniformBlockName = (program, uniformBlockIndex, bufSize, length, uniformBlockName) => {
  program = GL.programs[program];
  var result = GLctx.getActiveUniformBlockName(program, uniformBlockIndex);
  if (!result) return;
  if (uniformBlockName && bufSize > 0) {
    var numBytesWrittenExclNull = stringToUTF8(result, uniformBlockName, bufSize);
    if (length) HEAP32[length >> 2] = numBytesWrittenExclNull;
  } else {
    if (length) HEAP32[length >> 2] = 0;
  }
};
var _emscripten_glGetActiveUniformBlockiv = (program, uniformBlockIndex, pname, params) => {
  if (!params) {
    GL.recordError(1281);
    return;
  }
  program = GL.programs[program];
  if (pname == 35393) {
    var name = GLctx.getActiveUniformBlockName(program, uniformBlockIndex);
    HEAP32[params >> 2] = name.length + 1;
    return;
  }
  var result = GLctx.getActiveUniformBlockParameter(program, uniformBlockIndex, pname);
  if (result === null) return;
  if (pname == 35395) {
    for (var i = 0; i < result.length; i++) {
      HEAP32[(params + i * 4) >> 2] = result[i];
    }
  } else {
    HEAP32[params >> 2] = result;
  }
};
var _emscripten_glGetActiveUniformsiv = (program, uniformCount, uniformIndices, pname, params) => {
  if (!params) {
    GL.recordError(1281);
    return;
  }
  if (uniformCount > 0 && uniformIndices == 0) {
    GL.recordError(1281);
    return;
  }
  program = GL.programs[program];
  var ids = [];
  for (var i = 0; i < uniformCount; i++) {
    ids.push(HEAP32[(uniformIndices + i * 4) >> 2]);
  }
  var result = GLctx.getActiveUniforms(program, ids, pname);
  if (!result) return;
  var len = result.length;
  for (var i = 0; i < len; i++) {
    HEAP32[(params + i * 4) >> 2] = result[i];
  }
};
var _emscripten_glGetAttachedShaders = (program, maxCount, count, shaders) => {
  var result = GLctx.getAttachedShaders(GL.programs[program]);
  var len = result.length;
  if (len > maxCount) {
    len = maxCount;
  }
  HEAP32[count >> 2] = len;
  for (var i = 0; i < len; ++i) {
    var id = GL.shaders.indexOf(result[i]);
    HEAP32[(shaders + i * 4) >> 2] = id;
  }
};
var _emscripten_glGetAttribLocation = (program, name) =>
  GLctx.getAttribLocation(GL.programs[program], UTF8ToString(name));
var writeI53ToI64 = (ptr, num) => {
  HEAPU32[ptr >> 2] = num;
  var lower = HEAPU32[ptr >> 2];
  HEAPU32[(ptr + 4) >> 2] = (num - lower) / 4294967296;
};
var webglGetExtensions = () => {
  var exts = getEmscriptenSupportedExtensions(GLctx);
  exts = exts.concat(exts.map((e) => "GL_" + e));
  return exts;
};
var emscriptenWebGLGet = (name_, p, type) => {
  if (!p) {
    GL.recordError(1281);
    return;
  }
  var ret = undefined;
  switch (name_) {
    case 36346:
      ret = 1;
      break;
    case 36344:
      if (type != 0 && type != 1) {
        GL.recordError(1280);
      }
      return;
    case 34814:
    case 36345:
      ret = 0;
      break;
    case 34466:
      var formats = GLctx.getParameter(34467);
      ret = formats ? formats.length : 0;
      break;
    case 33309:
      if (GL.currentContext.version < 2) {
        GL.recordError(1282);
        return;
      }
      ret = webglGetExtensions().length;
      break;
    case 33307:
    case 33308:
      if (GL.currentContext.version < 2) {
        GL.recordError(1280);
        return;
      }
      ret = name_ == 33307 ? 3 : 0;
      break;
  }
  if (ret === undefined) {
    var result = GLctx.getParameter(name_);
    switch (typeof result) {
      case "number":
        ret = result;
        break;
      case "boolean":
        ret = result ? 1 : 0;
        break;
      case "string":
        GL.recordError(1280);
        return;
      case "object":
        if (result === null) {
          switch (name_) {
            case 34964:
            case 35725:
            case 34965:
            case 36006:
            case 36007:
            case 32873:
            case 34229:
            case 36662:
            case 36663:
            case 35053:
            case 35055:
            case 36010:
            case 35097:
            case 35869:
            case 32874:
            case 36389:
            case 35983:
            case 35368:
            case 34068: {
              ret = 0;
              break;
            }
            default: {
              GL.recordError(1280);
              return;
            }
          }
        } else if (
          result instanceof Float32Array ||
          result instanceof Uint32Array ||
          result instanceof Int32Array ||
          result instanceof Array
        ) {
          for (var i = 0; i < result.length; ++i) {
            switch (type) {
              case 0:
                HEAP32[(p + i * 4) >> 2] = result[i];
                break;
              case 2:
                HEAPF32[(p + i * 4) >> 2] = result[i];
                break;
              case 4:
                HEAP8[p + i] = result[i] ? 1 : 0;
                break;
            }
          }
          return;
        } else {
          try {
            ret = result.name | 0;
          } catch (e) {
            GL.recordError(1280);
            err(
              `GL_INVALID_ENUM in glGet${type}v: Unknown object returned from WebGL getParameter(${name_})! (error: ${e})`
            );
            return;
          }
        }
        break;
      default:
        GL.recordError(1280);
        err(
          `GL_INVALID_ENUM in glGet${type}v: Native code calling glGet${type}v(${name_}) and it returns ${result} of type ${typeof result}!`
        );
        return;
    }
  }
  switch (type) {
    case 1:
      writeI53ToI64(p, ret);
      break;
    case 0:
      HEAP32[p >> 2] = ret;
      break;
    case 2:
      HEAPF32[p >> 2] = ret;
      break;
    case 4:
      HEAP8[p] = ret ? 1 : 0;
      break;
  }
};
var _emscripten_glGetBooleanv = (name_, p) => emscriptenWebGLGet(name_, p, 4);
var _emscripten_glGetBufferParameteri64v = (target, value, data) => {
  if (!data) {
    GL.recordError(1281);
    return;
  }
  writeI53ToI64(data, GLctx.getBufferParameter(target, value));
};
var _emscripten_glGetBufferParameteriv = (target, value, data) => {
  if (!data) {
    GL.recordError(1281);
    return;
  }
  HEAP32[data >> 2] = GLctx.getBufferParameter(target, value);
};
var _emscripten_glGetBufferPointerv = (target, pname, params) => {
  if (pname == 35005) {
    var ptr = 0;
    var mappedBuffer = GL.mappedBuffers[emscriptenWebGLGetBufferBinding(target)];
    if (mappedBuffer) {
      ptr = mappedBuffer.mem;
    }
    HEAP32[params >> 2] = ptr;
  } else {
    GL.recordError(1280);
    err("GL_INVALID_ENUM in glGetBufferPointerv");
  }
};
var _emscripten_glGetError = () => {
  var error = GLctx.getError() || GL.lastError;
  GL.lastError = 0;
  return error;
};
var _emscripten_glGetFloatv = (name_, p) => emscriptenWebGLGet(name_, p, 2);
var _emscripten_glGetFragDataLocation = (program, name) =>
  GLctx.getFragDataLocation(GL.programs[program], UTF8ToString(name));
var _emscripten_glGetFramebufferAttachmentParameteriv = (target, attachment, pname, params) => {
  var result = GLctx.getFramebufferAttachmentParameter(target, attachment, pname);
  if (result instanceof WebGLRenderbuffer || result instanceof WebGLTexture) {
    result = result.name | 0;
  }
  HEAP32[params >> 2] = result;
};
var emscriptenWebGLGetIndexed = (target, index, data, type) => {
  if (!data) {
    GL.recordError(1281);
    return;
  }
  var result = GLctx.getIndexedParameter(target, index);
  var ret;
  switch (typeof result) {
    case "boolean":
      ret = result ? 1 : 0;
      break;
    case "number":
      ret = result;
      break;
    case "object":
      if (result === null) {
        switch (target) {
          case 35983:
          case 35368:
            ret = 0;
            break;
          default: {
            GL.recordError(1280);
            return;
          }
        }
      } else if (result instanceof WebGLBuffer) {
        ret = result.name | 0;
      } else {
        GL.recordError(1280);
        return;
      }
      break;
    default:
      GL.recordError(1280);
      return;
  }
  switch (type) {
    case 1:
      writeI53ToI64(data, ret);
      break;
    case 0:
      HEAP32[data >> 2] = ret;
      break;
    case 2:
      HEAPF32[data >> 2] = ret;
      break;
    case 4:
      HEAP8[data] = ret ? 1 : 0;
      break;
    default:
      abort("internal emscriptenWebGLGetIndexed() error, bad type: " + type);
  }
};
var _emscripten_glGetInteger64i_v = (target, index, data) => emscriptenWebGLGetIndexed(target, index, data, 1);
var _emscripten_glGetInteger64v = (name_, p) => {
  emscriptenWebGLGet(name_, p, 1);
};
var _emscripten_glGetIntegeri_v = (target, index, data) => emscriptenWebGLGetIndexed(target, index, data, 0);
var _emscripten_glGetIntegerv = (name_, p) => emscriptenWebGLGet(name_, p, 0);
var _emscripten_glGetInternalformativ = (target, internalformat, pname, bufSize, params) => {
  if (bufSize < 0) {
    GL.recordError(1281);
    return;
  }
  if (!params) {
    GL.recordError(1281);
    return;
  }
  var ret = GLctx.getInternalformatParameter(target, internalformat, pname);
  if (ret === null) return;
  for (var i = 0; i < ret.length && i < bufSize; ++i) {
    HEAP32[(params + i * 4) >> 2] = ret[i];
  }
};
var _emscripten_glGetProgramBinary = (program, bufSize, length, binaryFormat, binary) => {
  GL.recordError(1282);
};
var _emscripten_glGetProgramInfoLog = (program, maxLength, length, infoLog) => {
  var log = GLctx.getProgramInfoLog(GL.programs[program]);
  if (log === null) log = "(unknown error)";
  var numBytesWrittenExclNull = maxLength > 0 && infoLog ? stringToUTF8(log, infoLog, maxLength) : 0;
  if (length) HEAP32[length >> 2] = numBytesWrittenExclNull;
};
var _emscripten_glGetProgramiv = (program, pname, p) => {
  if (!p) {
    GL.recordError(1281);
    return;
  }
  if (program >= GL.counter) {
    GL.recordError(1281);
    return;
  }
  program = GL.programs[program];
  if (pname == 35716) {
    var log = GLctx.getProgramInfoLog(program);
    if (log === null) log = "(unknown error)";
    HEAP32[p >> 2] = log.length + 1;
  } else if (pname == 35719) {
    if (!program.maxUniformLength) {
      var numActiveUniforms = GLctx.getProgramParameter(program, 35718);
      for (var i = 0; i < numActiveUniforms; ++i) {
        program.maxUniformLength = Math.max(
          program.maxUniformLength,
          GLctx.getActiveUniform(program, i).name.length + 1
        );
      }
    }
    HEAP32[p >> 2] = program.maxUniformLength;
  } else if (pname == 35722) {
    if (!program.maxAttributeLength) {
      var numActiveAttributes = GLctx.getProgramParameter(program, 35721);
      for (var i = 0; i < numActiveAttributes; ++i) {
        program.maxAttributeLength = Math.max(
          program.maxAttributeLength,
          GLctx.getActiveAttrib(program, i).name.length + 1
        );
      }
    }
    HEAP32[p >> 2] = program.maxAttributeLength;
  } else if (pname == 35381) {
    if (!program.maxUniformBlockNameLength) {
      var numActiveUniformBlocks = GLctx.getProgramParameter(program, 35382);
      for (var i = 0; i < numActiveUniformBlocks; ++i) {
        program.maxUniformBlockNameLength = Math.max(
          program.maxUniformBlockNameLength,
          GLctx.getActiveUniformBlockName(program, i).length + 1
        );
      }
    }
    HEAP32[p >> 2] = program.maxUniformBlockNameLength;
  } else {
    HEAP32[p >> 2] = GLctx.getProgramParameter(program, pname);
  }
};
var _emscripten_glGetQueryObjecti64vEXT = (id, pname, params) => {
  if (!params) {
    GL.recordError(1281);
    return;
  }
  var query = GL.queries[id];
  var param;
  if (GL.currentContext.version < 2) {
    param = GLctx.disjointTimerQueryExt["getQueryObjectEXT"](query, pname);
  } else {
    param = GLctx.getQueryParameter(query, pname);
  }
  var ret;
  if (typeof param == "boolean") {
    ret = param ? 1 : 0;
  } else {
    ret = param;
  }
  writeI53ToI64(params, ret);
};
var _emscripten_glGetQueryObjectivEXT = (id, pname, params) => {
  if (!params) {
    GL.recordError(1281);
    return;
  }
  var query = GL.queries[id];
  var param = GLctx.disjointTimerQueryExt["getQueryObjectEXT"](query, pname);
  var ret;
  if (typeof param == "boolean") {
    ret = param ? 1 : 0;
  } else {
    ret = param;
  }
  HEAP32[params >> 2] = ret;
};
var _emscripten_glGetQueryObjectui64vEXT = _emscripten_glGetQueryObjecti64vEXT;
var _emscripten_glGetQueryObjectuiv = (id, pname, params) => {
  if (!params) {
    GL.recordError(1281);
    return;
  }
  var query = GL.queries[id];
  var param = GLctx.getQueryParameter(query, pname);
  var ret;
  if (typeof param == "boolean") {
    ret = param ? 1 : 0;
  } else {
    ret = param;
  }
  HEAP32[params >> 2] = ret;
};
var _emscripten_glGetQueryObjectuivEXT = _emscripten_glGetQueryObjectivEXT;
var _emscripten_glGetQueryiv = (target, pname, params) => {
  if (!params) {
    GL.recordError(1281);
    return;
  }
  HEAP32[params >> 2] = GLctx.getQuery(target, pname);
};
var _emscripten_glGetQueryivEXT = (target, pname, params) => {
  if (!params) {
    GL.recordError(1281);
    return;
  }
  HEAP32[params >> 2] = GLctx.disjointTimerQueryExt["getQueryEXT"](target, pname);
};
var _emscripten_glGetRenderbufferParameteriv = (target, pname, params) => {
  if (!params) {
    GL.recordError(1281);
    return;
  }
  HEAP32[params >> 2] = GLctx.getRenderbufferParameter(target, pname);
};
var _emscripten_glGetSamplerParameterfv = (sampler, pname, params) => {
  if (!params) {
    GL.recordError(1281);
    return;
  }
  HEAPF32[params >> 2] = GLctx.getSamplerParameter(GL.samplers[sampler], pname);
};
var _emscripten_glGetSamplerParameteriv = (sampler, pname, params) => {
  if (!params) {
    GL.recordError(1281);
    return;
  }
  HEAP32[params >> 2] = GLctx.getSamplerParameter(GL.samplers[sampler], pname);
};
var _emscripten_glGetShaderInfoLog = (shader, maxLength, length, infoLog) => {
  var log = GLctx.getShaderInfoLog(GL.shaders[shader]);
  if (log === null) log = "(unknown error)";
  var numBytesWrittenExclNull = maxLength > 0 && infoLog ? stringToUTF8(log, infoLog, maxLength) : 0;
  if (length) HEAP32[length >> 2] = numBytesWrittenExclNull;
};
var _emscripten_glGetShaderPrecisionFormat = (shaderType, precisionType, range, precision) => {
  var result = GLctx.getShaderPrecisionFormat(shaderType, precisionType);
  HEAP32[range >> 2] = result.rangeMin;
  HEAP32[(range + 4) >> 2] = result.rangeMax;
  HEAP32[precision >> 2] = result.precision;
};
var _emscripten_glGetShaderSource = (shader, bufSize, length, source) => {
  var result = GLctx.getShaderSource(GL.shaders[shader]);
  if (!result) return;
  var numBytesWrittenExclNull = bufSize > 0 && source ? stringToUTF8(result, source, bufSize) : 0;
  if (length) HEAP32[length >> 2] = numBytesWrittenExclNull;
};
var _emscripten_glGetShaderiv = (shader, pname, p) => {
  if (!p) {
    GL.recordError(1281);
    return;
  }
  if (pname == 35716) {
    var log = GLctx.getShaderInfoLog(GL.shaders[shader]);
    if (log === null) log = "(unknown error)";
    var logLength = log ? log.length + 1 : 0;
    HEAP32[p >> 2] = logLength;
  } else if (pname == 35720) {
    var source = GLctx.getShaderSource(GL.shaders[shader]);
    var sourceLength = source ? source.length + 1 : 0;
    HEAP32[p >> 2] = sourceLength;
  } else {
    HEAP32[p >> 2] = GLctx.getShaderParameter(GL.shaders[shader], pname);
  }
};
var _emscripten_glGetString = (name_) => {
  var ret = GL.stringCache[name_];
  if (!ret) {
    switch (name_) {
      case 7939:
        ret = stringToNewUTF8(webglGetExtensions().join(" "));
        break;
      case 7936:
      case 7937:
      case 37445:
      case 37446:
        var s = GLctx.getParameter(name_);
        if (!s) {
          GL.recordError(1280);
        }
        ret = s ? stringToNewUTF8(s) : 0;
        break;
      case 7938:
        var webGLVersion = GLctx.getParameter(7938);
        var glVersion = `OpenGL ES 2.0 (${webGLVersion})`;
        if (GL.currentContext.version >= 2) glVersion = `OpenGL ES 3.0 (${webGLVersion})`;
        ret = stringToNewUTF8(glVersion);
        break;
      case 35724:
        var glslVersion = GLctx.getParameter(35724);
        var ver_re = /^WebGL GLSL ES ([0-9]\.[0-9][0-9]?)(?:$| .*)/;
        var ver_num = glslVersion.match(ver_re);
        if (ver_num !== null) {
          if (ver_num[1].length == 3) ver_num[1] = ver_num[1] + "0";
          glslVersion = `OpenGL ES GLSL ES ${ver_num[1]} (${glslVersion})`;
        }
        ret = stringToNewUTF8(glslVersion);
        break;
      default:
        GL.recordError(1280);
    }
    GL.stringCache[name_] = ret;
  }
  return ret;
};
var _emscripten_glGetStringi = (name, index) => {
  if (GL.currentContext.version < 2) {
    GL.recordError(1282);
    return 0;
  }
  var stringiCache = GL.stringiCache[name];
  if (stringiCache) {
    if (index < 0 || index >= stringiCache.length) {
      GL.recordError(1281);
      return 0;
    }
    return stringiCache[index];
  }
  switch (name) {
    case 7939:
      var exts = webglGetExtensions().map(stringToNewUTF8);
      stringiCache = GL.stringiCache[name] = exts;
      if (index < 0 || index >= stringiCache.length) {
        GL.recordError(1281);
        return 0;
      }
      return stringiCache[index];
    default:
      GL.recordError(1280);
      return 0;
  }
};
var _emscripten_glGetSynciv = (sync, pname, bufSize, length, values) => {
  if (bufSize < 0) {
    GL.recordError(1281);
    return;
  }
  if (!values) {
    GL.recordError(1281);
    return;
  }
  var ret = GLctx.getSyncParameter(GL.syncs[sync], pname);
  if (ret !== null) {
    HEAP32[values >> 2] = ret;
    if (length) HEAP32[length >> 2] = 1;
  }
};
var _emscripten_glGetTexParameterfv = (target, pname, params) => {
  if (!params) {
    GL.recordError(1281);
    return;
  }
  HEAPF32[params >> 2] = GLctx.getTexParameter(target, pname);
};
var _emscripten_glGetTexParameteriv = (target, pname, params) => {
  if (!params) {
    GL.recordError(1281);
    return;
  }
  HEAP32[params >> 2] = GLctx.getTexParameter(target, pname);
};
var _emscripten_glGetTransformFeedbackVarying = (program, index, bufSize, length, size, type, name) => {
  program = GL.programs[program];
  var info = GLctx.getTransformFeedbackVarying(program, index);
  if (!info) return;
  if (name && bufSize > 0) {
    var numBytesWrittenExclNull = stringToUTF8(info.name, name, bufSize);
    if (length) HEAP32[length >> 2] = numBytesWrittenExclNull;
  } else {
    if (length) HEAP32[length >> 2] = 0;
  }
  if (size) HEAP32[size >> 2] = info.size;
  if (type) HEAP32[type >> 2] = info.type;
};
var _emscripten_glGetUniformBlockIndex = (program, uniformBlockName) =>
  GLctx.getUniformBlockIndex(GL.programs[program], UTF8ToString(uniformBlockName));
var _emscripten_glGetUniformIndices = (program, uniformCount, uniformNames, uniformIndices) => {
  if (!uniformIndices) {
    GL.recordError(1281);
    return;
  }
  if (uniformCount > 0 && (uniformNames == 0 || uniformIndices == 0)) {
    GL.recordError(1281);
    return;
  }
  program = GL.programs[program];
  var names = [];
  for (var i = 0; i < uniformCount; i++) names.push(UTF8ToString(HEAPU32[(uniformNames + i * 4) >> 2]));
  var result = GLctx.getUniformIndices(program, names);
  if (!result) return;
  var len = result.length;
  for (var i = 0; i < len; i++) {
    HEAP32[(uniformIndices + i * 4) >> 2] = result[i];
  }
};
var jstoi_q = (str) => parseInt(str);
var webglGetLeftBracePos = (name) => name.slice(-1) == "]" && name.lastIndexOf("[");
var webglPrepareUniformLocationsBeforeFirstUse = (program) => {
  var uniformLocsById = program.uniformLocsById,
    uniformSizeAndIdsByName = program.uniformSizeAndIdsByName,
    i,
    j;
  if (!uniformLocsById) {
    program.uniformLocsById = uniformLocsById = {};
    program.uniformArrayNamesById = {};
    var numActiveUniforms = GLctx.getProgramParameter(program, 35718);
    for (i = 0; i < numActiveUniforms; ++i) {
      var u = GLctx.getActiveUniform(program, i);
      var nm = u.name;
      var sz = u.size;
      var lb = webglGetLeftBracePos(nm);
      var arrayName = lb > 0 ? nm.slice(0, lb) : nm;
      var id = program.uniformIdCounter;
      program.uniformIdCounter += sz;
      uniformSizeAndIdsByName[arrayName] = [sz, id];
      for (j = 0; j < sz; ++j) {
        uniformLocsById[id] = j;
        program.uniformArrayNamesById[id++] = arrayName;
      }
    }
  }
};
var _emscripten_glGetUniformLocation = (program, name) => {
  name = UTF8ToString(name);
  if ((program = GL.programs[program])) {
    webglPrepareUniformLocationsBeforeFirstUse(program);
    var uniformLocsById = program.uniformLocsById;
    var arrayIndex = 0;
    var uniformBaseName = name;
    var leftBrace = webglGetLeftBracePos(name);
    if (leftBrace > 0) {
      arrayIndex = jstoi_q(name.slice(leftBrace + 1)) >>> 0;
      uniformBaseName = name.slice(0, leftBrace);
    }
    var sizeAndId = program.uniformSizeAndIdsByName[uniformBaseName];
    if (sizeAndId && arrayIndex < sizeAndId[0]) {
      arrayIndex += sizeAndId[1];
      if ((uniformLocsById[arrayIndex] = uniformLocsById[arrayIndex] || GLctx.getUniformLocation(program, name))) {
        return arrayIndex;
      }
    }
  } else {
    GL.recordError(1281);
  }
  return -1;
};
var webglGetUniformLocation = (location) => {
  var p = GLctx.currentProgram;
  if (p) {
    var webglLoc = p.uniformLocsById[location];
    if (typeof webglLoc == "number") {
      p.uniformLocsById[location] = webglLoc = GLctx.getUniformLocation(
        p,
        p.uniformArrayNamesById[location] + (webglLoc > 0 ? `[${webglLoc}]` : "")
      );
    }
    return webglLoc;
  } else {
    GL.recordError(1282);
  }
};
var emscriptenWebGLGetUniform = (program, location, params, type) => {
  if (!params) {
    GL.recordError(1281);
    return;
  }
  program = GL.programs[program];
  webglPrepareUniformLocationsBeforeFirstUse(program);
  var data = GLctx.getUniform(program, webglGetUniformLocation(location));
  if (typeof data == "number" || typeof data == "boolean") {
    switch (type) {
      case 0:
        HEAP32[params >> 2] = data;
        break;
      case 2:
        HEAPF32[params >> 2] = data;
        break;
    }
  } else {
    for (var i = 0; i < data.length; i++) {
      switch (type) {
        case 0:
          HEAP32[(params + i * 4) >> 2] = data[i];
          break;
        case 2:
          HEAPF32[(params + i * 4) >> 2] = data[i];
          break;
      }
    }
  }
};
var _emscripten_glGetUniformfv = (program, location, params) => {
  emscriptenWebGLGetUniform(program, location, params, 2);
};
var _emscripten_glGetUniformiv = (program, location, params) => {
  emscriptenWebGLGetUniform(program, location, params, 0);
};
var _emscripten_glGetUniformuiv = (program, location, params) =>
  emscriptenWebGLGetUniform(program, location, params, 0);
var emscriptenWebGLGetVertexAttrib = (index, pname, params, type) => {
  if (!params) {
    GL.recordError(1281);
    return;
  }
  if (GL.currentContext.clientBuffers[index].enabled) {
    err("glGetVertexAttrib*v on client-side array: not supported, bad data returned");
  }
  var data = GLctx.getVertexAttrib(index, pname);
  if (pname == 34975) {
    HEAP32[params >> 2] = data && data["name"];
  } else if (typeof data == "number" || typeof data == "boolean") {
    switch (type) {
      case 0:
        HEAP32[params >> 2] = data;
        break;
      case 2:
        HEAPF32[params >> 2] = data;
        break;
      case 5:
        HEAP32[params >> 2] = Math.fround(data);
        break;
    }
  } else {
    for (var i = 0; i < data.length; i++) {
      switch (type) {
        case 0:
          HEAP32[(params + i * 4) >> 2] = data[i];
          break;
        case 2:
          HEAPF32[(params + i * 4) >> 2] = data[i];
          break;
        case 5:
          HEAP32[(params + i * 4) >> 2] = Math.fround(data[i]);
          break;
      }
    }
  }
};
var _emscripten_glGetVertexAttribIiv = (index, pname, params) => {
  emscriptenWebGLGetVertexAttrib(index, pname, params, 0);
};
var _emscripten_glGetVertexAttribIuiv = _emscripten_glGetVertexAttribIiv;
var _emscripten_glGetVertexAttribPointerv = (index, pname, pointer) => {
  if (!pointer) {
    GL.recordError(1281);
    return;
  }
  if (GL.currentContext.clientBuffers[index].enabled) {
    err("glGetVertexAttribPointer on client-side array: not supported, bad data returned");
  }
  HEAP32[pointer >> 2] = GLctx.getVertexAttribOffset(index, pname);
};
var _emscripten_glGetVertexAttribfv = (index, pname, params) => {
  emscriptenWebGLGetVertexAttrib(index, pname, params, 2);
};
var _emscripten_glGetVertexAttribiv = (index, pname, params) => {
  emscriptenWebGLGetVertexAttrib(index, pname, params, 5);
};
var _emscripten_glHint = (x0, x1) => GLctx.hint(x0, x1);
var _emscripten_glInvalidateFramebuffer = (target, numAttachments, attachments) => {
  var list = tempFixedLengthArray[numAttachments];
  for (var i = 0; i < numAttachments; i++) {
    list[i] = HEAP32[(attachments + i * 4) >> 2];
  }
  GLctx.invalidateFramebuffer(target, list);
};
var _emscripten_glInvalidateSubFramebuffer = (target, numAttachments, attachments, x, y, width, height) => {
  var list = tempFixedLengthArray[numAttachments];
  for (var i = 0; i < numAttachments; i++) {
    list[i] = HEAP32[(attachments + i * 4) >> 2];
  }
  GLctx.invalidateSubFramebuffer(target, list, x, y, width, height);
};
var _emscripten_glIsBuffer = (buffer) => {
  var b = GL.buffers[buffer];
  if (!b) return 0;
  return GLctx.isBuffer(b);
};
var _emscripten_glIsEnabled = (x0) => GLctx.isEnabled(x0);
var _emscripten_glIsFramebuffer = (framebuffer) => {
  var fb = GL.framebuffers[framebuffer];
  if (!fb) return 0;
  return GLctx.isFramebuffer(fb);
};
var _emscripten_glIsProgram = (program) => {
  program = GL.programs[program];
  if (!program) return 0;
  return GLctx.isProgram(program);
};
var _emscripten_glIsQuery = (id) => {
  var query = GL.queries[id];
  if (!query) return 0;
  return GLctx.isQuery(query);
};
var _emscripten_glIsQueryEXT = (id) => {
  var query = GL.queries[id];
  if (!query) return 0;
  return GLctx.disjointTimerQueryExt["isQueryEXT"](query);
};
var _emscripten_glIsRenderbuffer = (renderbuffer) => {
  var rb = GL.renderbuffers[renderbuffer];
  if (!rb) return 0;
  return GLctx.isRenderbuffer(rb);
};
var _emscripten_glIsSampler = (id) => {
  var sampler = GL.samplers[id];
  if (!sampler) return 0;
  return GLctx.isSampler(sampler);
};
var _emscripten_glIsShader = (shader) => {
  var s = GL.shaders[shader];
  if (!s) return 0;
  return GLctx.isShader(s);
};
var _emscripten_glIsSync = (sync) => GLctx.isSync(GL.syncs[sync]);
var _emscripten_glIsTexture = (id) => {
  var texture = GL.textures[id];
  if (!texture) return 0;
  return GLctx.isTexture(texture);
};
var _emscripten_glIsTransformFeedback = (id) => GLctx.isTransformFeedback(GL.transformFeedbacks[id]);
var _emscripten_glIsVertexArray = (array) => {
  var vao = GL.vaos[array];
  if (!vao) return 0;
  return GLctx.isVertexArray(vao);
};
var _emscripten_glIsVertexArrayOES = _emscripten_glIsVertexArray;
var _emscripten_glLineWidth = (x0) => GLctx.lineWidth(x0);
var _emscripten_glLinkProgram = (program) => {
  program = GL.programs[program];
  GLctx.linkProgram(program);
  program.uniformLocsById = 0;
  program.uniformSizeAndIdsByName = {};
};
var _emscripten_glMapBufferRange = (target, offset, length, access) => {
  if ((access & (1 | 32)) != 0) {
    err("glMapBufferRange access does not support MAP_READ or MAP_UNSYNCHRONIZED");
    return 0;
  }
  if ((access & 2) == 0) {
    err("glMapBufferRange access must include MAP_WRITE");
    return 0;
  }
  if ((access & (4 | 8)) == 0) {
    err("glMapBufferRange access must include INVALIDATE_BUFFER or INVALIDATE_RANGE");
    return 0;
  }
  if (!emscriptenWebGLValidateMapBufferTarget(target)) {
    GL.recordError(1280);
    err("GL_INVALID_ENUM in glMapBufferRange");
    return 0;
  }
  var mem = _malloc(length),
    binding = emscriptenWebGLGetBufferBinding(target);
  if (!mem) return 0;
  binding = GL.mappedBuffers[binding] ??= {};
  binding.offset = offset;
  binding.length = length;
  binding.mem = mem;
  binding.access = access;
  return mem;
};
var _emscripten_glPauseTransformFeedback = () => GLctx.pauseTransformFeedback();
var _emscripten_glPixelStorei = (pname, param) => {
  if (pname == 3317) {
    GL.unpackAlignment = param;
  } else if (pname == 3314) {
    GL.unpackRowLength = param;
  }
  GLctx.pixelStorei(pname, param);
};
var _emscripten_glPolygonModeWEBGL = (face, mode) => {
  GLctx.webglPolygonMode["polygonModeWEBGL"](face, mode);
};
var _emscripten_glPolygonOffset = (x0, x1) => GLctx.polygonOffset(x0, x1);
var _emscripten_glPolygonOffsetClampEXT = (factor, units, clamp) => {
  GLctx.extPolygonOffsetClamp["polygonOffsetClampEXT"](factor, units, clamp);
};
var _emscripten_glProgramBinary = (program, binaryFormat, binary, length) => {
  GL.recordError(1280);
};
var _emscripten_glProgramParameteri = (program, pname, value) => {
  GL.recordError(1280);
};
var _emscripten_glQueryCounterEXT = (id, target) => {
  GLctx.disjointTimerQueryExt["queryCounterEXT"](GL.queries[id], target);
};
var _emscripten_glReadBuffer = (x0) => GLctx.readBuffer(x0);
var computeUnpackAlignedImageSize = (width, height, sizePerPixel) => {
  function roundedToNextMultipleOf(x, y) {
    return (x + y - 1) & -y;
  }
  var plainRowSize = (GL.unpackRowLength || width) * sizePerPixel;
  var alignedRowSize = roundedToNextMultipleOf(plainRowSize, GL.unpackAlignment);
  return height * alignedRowSize;
};
var colorChannelsInGlTextureFormat = (format) => {
  var colorChannels = { 5: 3, 6: 4, 8: 2, 29502: 3, 29504: 4, 26917: 2, 26918: 2, 29846: 3, 29847: 4 };
  return colorChannels[format - 6402] || 1;
};
var heapObjectForWebGLType = (type) => {
  type -= 5120;
  if (type == 0) return HEAP8;
  if (type == 1) return HEAPU8;
  if (type == 2) return HEAP16;
  if (type == 4) return HEAP32;
  if (type == 6) return HEAPF32;
  if (type == 5 || type == 28922 || type == 28520 || type == 30779 || type == 30782) return HEAPU32;
  return HEAPU16;
};
var toTypedArrayIndex = (pointer, heap) => pointer >>> (31 - Math.clz32(heap.BYTES_PER_ELEMENT));
var emscriptenWebGLGetTexPixelData = (type, format, width, height, pixels, internalFormat) => {
  var heap = heapObjectForWebGLType(type);
  var sizePerPixel = colorChannelsInGlTextureFormat(format) * heap.BYTES_PER_ELEMENT;
  var bytes = computeUnpackAlignedImageSize(width, height, sizePerPixel);
  return heap.subarray(toTypedArrayIndex(pixels, heap), toTypedArrayIndex(pixels + bytes, heap));
};
var _emscripten_glReadPixels = (x, y, width, height, format, type, pixels) => {
  if (GL.currentContext.version >= 2) {
    if (GLctx.currentPixelPackBufferBinding) {
      GLctx.readPixels(x, y, width, height, format, type, pixels);
      return;
    }
    var heap = heapObjectForWebGLType(type);
    var target = toTypedArrayIndex(pixels, heap);
    GLctx.readPixels(x, y, width, height, format, type, heap, target);
    return;
  }
  var pixelData = emscriptenWebGLGetTexPixelData(type, format, width, height, pixels, format);
  if (!pixelData) {
    GL.recordError(1280);
    return;
  }
  GLctx.readPixels(x, y, width, height, format, type, pixelData);
};
var _emscripten_glReleaseShaderCompiler = () => {};
var _emscripten_glRenderbufferStorage = (x0, x1, x2, x3) => GLctx.renderbufferStorage(x0, x1, x2, x3);
var _emscripten_glRenderbufferStorageMultisample = (x0, x1, x2, x3, x4) =>
  GLctx.renderbufferStorageMultisample(x0, x1, x2, x3, x4);
var _emscripten_glResumeTransformFeedback = () => GLctx.resumeTransformFeedback();
var _emscripten_glSampleCoverage = (value, invert) => {
  GLctx.sampleCoverage(value, !!invert);
};
var _emscripten_glSamplerParameterf = (sampler, pname, param) => {
  GLctx.samplerParameterf(GL.samplers[sampler], pname, param);
};
var _emscripten_glSamplerParameterfv = (sampler, pname, params) => {
  var param = HEAPF32[params >> 2];
  GLctx.samplerParameterf(GL.samplers[sampler], pname, param);
};
var _emscripten_glSamplerParameteri = (sampler, pname, param) => {
  GLctx.samplerParameteri(GL.samplers[sampler], pname, param);
};
var _emscripten_glSamplerParameteriv = (sampler, pname, params) => {
  var param = HEAP32[params >> 2];
  GLctx.samplerParameteri(GL.samplers[sampler], pname, param);
};
var _emscripten_glScissor = (x0, x1, x2, x3) => GLctx.scissor(x0, x1, x2, x3);
var _emscripten_glShaderBinary = (count, shaders, binaryformat, binary, length) => {
  GL.recordError(1280);
};
var _emscripten_glShaderSource = (shader, count, string, length) => {
  var source = GL.getSource(shader, count, string, length);
  GLctx.shaderSource(GL.shaders[shader], source);
};
var _emscripten_glStencilFunc = (x0, x1, x2) => GLctx.stencilFunc(x0, x1, x2);
var _emscripten_glStencilFuncSeparate = (x0, x1, x2, x3) => GLctx.stencilFuncSeparate(x0, x1, x2, x3);
var _emscripten_glStencilMask = (x0) => GLctx.stencilMask(x0);
var _emscripten_glStencilMaskSeparate = (x0, x1) => GLctx.stencilMaskSeparate(x0, x1);
var _emscripten_glStencilOp = (x0, x1, x2) => GLctx.stencilOp(x0, x1, x2);
var _emscripten_glStencilOpSeparate = (x0, x1, x2, x3) => GLctx.stencilOpSeparate(x0, x1, x2, x3);
var _emscripten_glTexImage2D = (target, level, internalFormat, width, height, border, format, type, pixels) => {
  if (GL.currentContext.version >= 2) {
    if (GLctx.currentPixelUnpackBufferBinding) {
      GLctx.texImage2D(target, level, internalFormat, width, height, border, format, type, pixels);
      return;
    }
    if (pixels) {
      var heap = heapObjectForWebGLType(type);
      var index = toTypedArrayIndex(pixels, heap);
      GLctx.texImage2D(target, level, internalFormat, width, height, border, format, type, heap, index);
      return;
    }
  }
  var pixelData = pixels ? emscriptenWebGLGetTexPixelData(type, format, width, height, pixels, internalFormat) : null;
  GLctx.texImage2D(target, level, internalFormat, width, height, border, format, type, pixelData);
};
var _emscripten_glTexImage3D = (target, level, internalFormat, width, height, depth, border, format, type, pixels) => {
  if (GLctx.currentPixelUnpackBufferBinding) {
    GLctx.texImage3D(target, level, internalFormat, width, height, depth, border, format, type, pixels);
  } else if (pixels) {
    var heap = heapObjectForWebGLType(type);
    GLctx.texImage3D(
      target,
      level,
      internalFormat,
      width,
      height,
      depth,
      border,
      format,
      type,
      heap,
      toTypedArrayIndex(pixels, heap)
    );
  } else {
    GLctx.texImage3D(target, level, internalFormat, width, height, depth, border, format, type, null);
  }
};
var _emscripten_glTexParameterf = (x0, x1, x2) => GLctx.texParameterf(x0, x1, x2);
var _emscripten_glTexParameterfv = (target, pname, params) => {
  var param = HEAPF32[params >> 2];
  GLctx.texParameterf(target, pname, param);
};
var _emscripten_glTexParameteri = (x0, x1, x2) => GLctx.texParameteri(x0, x1, x2);
var _emscripten_glTexParameteriv = (target, pname, params) => {
  var param = HEAP32[params >> 2];
  GLctx.texParameteri(target, pname, param);
};
var _emscripten_glTexStorage2D = (x0, x1, x2, x3, x4) => GLctx.texStorage2D(x0, x1, x2, x3, x4);
var _emscripten_glTexStorage3D = (x0, x1, x2, x3, x4, x5) => GLctx.texStorage3D(x0, x1, x2, x3, x4, x5);
var _emscripten_glTexSubImage2D = (target, level, xoffset, yoffset, width, height, format, type, pixels) => {
  if (GL.currentContext.version >= 2) {
    if (GLctx.currentPixelUnpackBufferBinding) {
      GLctx.texSubImage2D(target, level, xoffset, yoffset, width, height, format, type, pixels);
      return;
    }
    if (pixels) {
      var heap = heapObjectForWebGLType(type);
      GLctx.texSubImage2D(
        target,
        level,
        xoffset,
        yoffset,
        width,
        height,
        format,
        type,
        heap,
        toTypedArrayIndex(pixels, heap)
      );
      return;
    }
  }
  var pixelData = pixels ? emscriptenWebGLGetTexPixelData(type, format, width, height, pixels, 0) : null;
  GLctx.texSubImage2D(target, level, xoffset, yoffset, width, height, format, type, pixelData);
};
var _emscripten_glTexSubImage3D = (
  target,
  level,
  xoffset,
  yoffset,
  zoffset,
  width,
  height,
  depth,
  format,
  type,
  pixels
) => {
  if (GLctx.currentPixelUnpackBufferBinding) {
    GLctx.texSubImage3D(target, level, xoffset, yoffset, zoffset, width, height, depth, format, type, pixels);
  } else if (pixels) {
    var heap = heapObjectForWebGLType(type);
    GLctx.texSubImage3D(
      target,
      level,
      xoffset,
      yoffset,
      zoffset,
      width,
      height,
      depth,
      format,
      type,
      heap,
      toTypedArrayIndex(pixels, heap)
    );
  } else {
    GLctx.texSubImage3D(target, level, xoffset, yoffset, zoffset, width, height, depth, format, type, null);
  }
};
var _emscripten_glTransformFeedbackVaryings = (program, count, varyings, bufferMode) => {
  program = GL.programs[program];
  var vars = [];
  for (var i = 0; i < count; i++) vars.push(UTF8ToString(HEAPU32[(varyings + i * 4) >> 2]));
  GLctx.transformFeedbackVaryings(program, vars, bufferMode);
};
var _emscripten_glUniform1f = (location, v0) => {
  GLctx.uniform1f(webglGetUniformLocation(location), v0);
};
var miniTempWebGLFloatBuffers = [];
var _emscripten_glUniform1fv = (location, count, value) => {
  if (GL.currentContext.version >= 2) {
    count && GLctx.uniform1fv(webglGetUniformLocation(location), HEAPF32, value >> 2, count);
    return;
  }
  if (count <= 288) {
    var view = miniTempWebGLFloatBuffers[count];
    for (var i = 0; i < count; ++i) {
      view[i] = HEAPF32[(value + 4 * i) >> 2];
    }
  } else {
    var view = HEAPF32.subarray(value >> 2, (value + count * 4) >> 2);
  }
  GLctx.uniform1fv(webglGetUniformLocation(location), view);
};
var _emscripten_glUniform1i = (location, v0) => {
  GLctx.uniform1i(webglGetUniformLocation(location), v0);
};
var miniTempWebGLIntBuffers = [];
var _emscripten_glUniform1iv = (location, count, value) => {
  if (GL.currentContext.version >= 2) {
    count && GLctx.uniform1iv(webglGetUniformLocation(location), HEAP32, value >> 2, count);
    return;
  }
  if (count <= 288) {
    var view = miniTempWebGLIntBuffers[count];
    for (var i = 0; i < count; ++i) {
      view[i] = HEAP32[(value + 4 * i) >> 2];
    }
  } else {
    var view = HEAP32.subarray(value >> 2, (value + count * 4) >> 2);
  }
  GLctx.uniform1iv(webglGetUniformLocation(location), view);
};
var _emscripten_glUniform1ui = (location, v0) => {
  GLctx.uniform1ui(webglGetUniformLocation(location), v0);
};
var _emscripten_glUniform1uiv = (location, count, value) => {
  count && GLctx.uniform1uiv(webglGetUniformLocation(location), HEAPU32, value >> 2, count);
};
var _emscripten_glUniform2f = (location, v0, v1) => {
  GLctx.uniform2f(webglGetUniformLocation(location), v0, v1);
};
var _emscripten_glUniform2fv = (location, count, value) => {
  if (GL.currentContext.version >= 2) {
    count && GLctx.uniform2fv(webglGetUniformLocation(location), HEAPF32, value >> 2, count * 2);
    return;
  }
  if (count <= 144) {
    count *= 2;
    var view = miniTempWebGLFloatBuffers[count];
    for (var i = 0; i < count; i += 2) {
      view[i] = HEAPF32[(value + 4 * i) >> 2];
      view[i + 1] = HEAPF32[(value + (4 * i + 4)) >> 2];
    }
  } else {
    var view = HEAPF32.subarray(value >> 2, (value + count * 8) >> 2);
  }
  GLctx.uniform2fv(webglGetUniformLocation(location), view);
};
var _emscripten_glUniform2i = (location, v0, v1) => {
  GLctx.uniform2i(webglGetUniformLocation(location), v0, v1);
};
var _emscripten_glUniform2iv = (location, count, value) => {
  if (GL.currentContext.version >= 2) {
    count && GLctx.uniform2iv(webglGetUniformLocation(location), HEAP32, value >> 2, count * 2);
    return;
  }
  if (count <= 144) {
    count *= 2;
    var view = miniTempWebGLIntBuffers[count];
    for (var i = 0; i < count; i += 2) {
      view[i] = HEAP32[(value + 4 * i) >> 2];
      view[i + 1] = HEAP32[(value + (4 * i + 4)) >> 2];
    }
  } else {
    var view = HEAP32.subarray(value >> 2, (value + count * 8) >> 2);
  }
  GLctx.uniform2iv(webglGetUniformLocation(location), view);
};
var _emscripten_glUniform2ui = (location, v0, v1) => {
  GLctx.uniform2ui(webglGetUniformLocation(location), v0, v1);
};
var _emscripten_glUniform2uiv = (location, count, value) => {
  count && GLctx.uniform2uiv(webglGetUniformLocation(location), HEAPU32, value >> 2, count * 2);
};
var _emscripten_glUniform3f = (location, v0, v1, v2) => {
  GLctx.uniform3f(webglGetUniformLocation(location), v0, v1, v2);
};
var _emscripten_glUniform3fv = (location, count, value) => {
  if (GL.currentContext.version >= 2) {
    count && GLctx.uniform3fv(webglGetUniformLocation(location), HEAPF32, value >> 2, count * 3);
    return;
  }
  if (count <= 96) {
    count *= 3;
    var view = miniTempWebGLFloatBuffers[count];
    for (var i = 0; i < count; i += 3) {
      view[i] = HEAPF32[(value + 4 * i) >> 2];
      view[i + 1] = HEAPF32[(value + (4 * i + 4)) >> 2];
      view[i + 2] = HEAPF32[(value + (4 * i + 8)) >> 2];
    }
  } else {
    var view = HEAPF32.subarray(value >> 2, (value + count * 12) >> 2);
  }
  GLctx.uniform3fv(webglGetUniformLocation(location), view);
};
var _emscripten_glUniform3i = (location, v0, v1, v2) => {
  GLctx.uniform3i(webglGetUniformLocation(location), v0, v1, v2);
};
var _emscripten_glUniform3iv = (location, count, value) => {
  if (GL.currentContext.version >= 2) {
    count && GLctx.uniform3iv(webglGetUniformLocation(location), HEAP32, value >> 2, count * 3);
    return;
  }
  if (count <= 96) {
    count *= 3;
    var view = miniTempWebGLIntBuffers[count];
    for (var i = 0; i < count; i += 3) {
      view[i] = HEAP32[(value + 4 * i) >> 2];
      view[i + 1] = HEAP32[(value + (4 * i + 4)) >> 2];
      view[i + 2] = HEAP32[(value + (4 * i + 8)) >> 2];
    }
  } else {
    var view = HEAP32.subarray(value >> 2, (value + count * 12) >> 2);
  }
  GLctx.uniform3iv(webglGetUniformLocation(location), view);
};
var _emscripten_glUniform3ui = (location, v0, v1, v2) => {
  GLctx.uniform3ui(webglGetUniformLocation(location), v0, v1, v2);
};
var _emscripten_glUniform3uiv = (location, count, value) => {
  count && GLctx.uniform3uiv(webglGetUniformLocation(location), HEAPU32, value >> 2, count * 3);
};
var _emscripten_glUniform4f = (location, v0, v1, v2, v3) => {
  GLctx.uniform4f(webglGetUniformLocation(location), v0, v1, v2, v3);
};
var _emscripten_glUniform4fv = (location, count, value) => {
  if (GL.currentContext.version >= 2) {
    count && GLctx.uniform4fv(webglGetUniformLocation(location), HEAPF32, value >> 2, count * 4);
    return;
  }
  if (count <= 72) {
    var view = miniTempWebGLFloatBuffers[4 * count];
    var heap = HEAPF32;
    value = value >> 2;
    count *= 4;
    for (var i = 0; i < count; i += 4) {
      var dst = value + i;
      view[i] = heap[dst];
      view[i + 1] = heap[dst + 1];
      view[i + 2] = heap[dst + 2];
      view[i + 3] = heap[dst + 3];
    }
  } else {
    var view = HEAPF32.subarray(value >> 2, (value + count * 16) >> 2);
  }
  GLctx.uniform4fv(webglGetUniformLocation(location), view);
};
var _emscripten_glUniform4i = (location, v0, v1, v2, v3) => {
  GLctx.uniform4i(webglGetUniformLocation(location), v0, v1, v2, v3);
};
var _emscripten_glUniform4iv = (location, count, value) => {
  if (GL.currentContext.version >= 2) {
    count && GLctx.uniform4iv(webglGetUniformLocation(location), HEAP32, value >> 2, count * 4);
    return;
  }
  if (count <= 72) {
    count *= 4;
    var view = miniTempWebGLIntBuffers[count];
    for (var i = 0; i < count; i += 4) {
      view[i] = HEAP32[(value + 4 * i) >> 2];
      view[i + 1] = HEAP32[(value + (4 * i + 4)) >> 2];
      view[i + 2] = HEAP32[(value + (4 * i + 8)) >> 2];
      view[i + 3] = HEAP32[(value + (4 * i + 12)) >> 2];
    }
  } else {
    var view = HEAP32.subarray(value >> 2, (value + count * 16) >> 2);
  }
  GLctx.uniform4iv(webglGetUniformLocation(location), view);
};
var _emscripten_glUniform4ui = (location, v0, v1, v2, v3) => {
  GLctx.uniform4ui(webglGetUniformLocation(location), v0, v1, v2, v3);
};
var _emscripten_glUniform4uiv = (location, count, value) => {
  count && GLctx.uniform4uiv(webglGetUniformLocation(location), HEAPU32, value >> 2, count * 4);
};
var _emscripten_glUniformBlockBinding = (program, uniformBlockIndex, uniformBlockBinding) => {
  program = GL.programs[program];
  GLctx.uniformBlockBinding(program, uniformBlockIndex, uniformBlockBinding);
};
var _emscripten_glUniformMatrix2fv = (location, count, transpose, value) => {
  if (GL.currentContext.version >= 2) {
    count && GLctx.uniformMatrix2fv(webglGetUniformLocation(location), !!transpose, HEAPF32, value >> 2, count * 4);
    return;
  }
  if (count <= 72) {
    count *= 4;
    var view = miniTempWebGLFloatBuffers[count];
    for (var i = 0; i < count; i += 4) {
      view[i] = HEAPF32[(value + 4 * i) >> 2];
      view[i + 1] = HEAPF32[(value + (4 * i + 4)) >> 2];
      view[i + 2] = HEAPF32[(value + (4 * i + 8)) >> 2];
      view[i + 3] = HEAPF32[(value + (4 * i + 12)) >> 2];
    }
  } else {
    var view = HEAPF32.subarray(value >> 2, (value + count * 16) >> 2);
  }
  GLctx.uniformMatrix2fv(webglGetUniformLocation(location), !!transpose, view);
};
var _emscripten_glUniformMatrix2x3fv = (location, count, transpose, value) => {
  count && GLctx.uniformMatrix2x3fv(webglGetUniformLocation(location), !!transpose, HEAPF32, value >> 2, count * 6);
};
var _emscripten_glUniformMatrix2x4fv = (location, count, transpose, value) => {
  count && GLctx.uniformMatrix2x4fv(webglGetUniformLocation(location), !!transpose, HEAPF32, value >> 2, count * 8);
};
var _emscripten_glUniformMatrix3fv = (location, count, transpose, value) => {
  if (GL.currentContext.version >= 2) {
    count && GLctx.uniformMatrix3fv(webglGetUniformLocation(location), !!transpose, HEAPF32, value >> 2, count * 9);
    return;
  }
  if (count <= 32) {
    count *= 9;
    var view = miniTempWebGLFloatBuffers[count];
    for (var i = 0; i < count; i += 9) {
      view[i] = HEAPF32[(value + 4 * i) >> 2];
      view[i + 1] = HEAPF32[(value + (4 * i + 4)) >> 2];
      view[i + 2] = HEAPF32[(value + (4 * i + 8)) >> 2];
      view[i + 3] = HEAPF32[(value + (4 * i + 12)) >> 2];
      view[i + 4] = HEAPF32[(value + (4 * i + 16)) >> 2];
      view[i + 5] = HEAPF32[(value + (4 * i + 20)) >> 2];
      view[i + 6] = HEAPF32[(value + (4 * i + 24)) >> 2];
      view[i + 7] = HEAPF32[(value + (4 * i + 28)) >> 2];
      view[i + 8] = HEAPF32[(value + (4 * i + 32)) >> 2];
    }
  } else {
    var view = HEAPF32.subarray(value >> 2, (value + count * 36) >> 2);
  }
  GLctx.uniformMatrix3fv(webglGetUniformLocation(location), !!transpose, view);
};
var _emscripten_glUniformMatrix3x2fv = (location, count, transpose, value) => {
  count && GLctx.uniformMatrix3x2fv(webglGetUniformLocation(location), !!transpose, HEAPF32, value >> 2, count * 6);
};
var _emscripten_glUniformMatrix3x4fv = (location, count, transpose, value) => {
  count && GLctx.uniformMatrix3x4fv(webglGetUniformLocation(location), !!transpose, HEAPF32, value >> 2, count * 12);
};
var _emscripten_glUniformMatrix4fv = (location, count, transpose, value) => {
  if (GL.currentContext.version >= 2) {
    count && GLctx.uniformMatrix4fv(webglGetUniformLocation(location), !!transpose, HEAPF32, value >> 2, count * 16);
    return;
  }
  if (count <= 18) {
    var view = miniTempWebGLFloatBuffers[16 * count];
    var heap = HEAPF32;
    value = value >> 2;
    count *= 16;
    for (var i = 0; i < count; i += 16) {
      var dst = value + i;
      view[i] = heap[dst];
      view[i + 1] = heap[dst + 1];
      view[i + 2] = heap[dst + 2];
      view[i + 3] = heap[dst + 3];
      view[i + 4] = heap[dst + 4];
      view[i + 5] = heap[dst + 5];
      view[i + 6] = heap[dst + 6];
      view[i + 7] = heap[dst + 7];
      view[i + 8] = heap[dst + 8];
      view[i + 9] = heap[dst + 9];
      view[i + 10] = heap[dst + 10];
      view[i + 11] = heap[dst + 11];
      view[i + 12] = heap[dst + 12];
      view[i + 13] = heap[dst + 13];
      view[i + 14] = heap[dst + 14];
      view[i + 15] = heap[dst + 15];
    }
  } else {
    var view = HEAPF32.subarray(value >> 2, (value + count * 64) >> 2);
  }
  GLctx.uniformMatrix4fv(webglGetUniformLocation(location), !!transpose, view);
};
var _emscripten_glUniformMatrix4x2fv = (location, count, transpose, value) => {
  count && GLctx.uniformMatrix4x2fv(webglGetUniformLocation(location), !!transpose, HEAPF32, value >> 2, count * 8);
};
var _emscripten_glUniformMatrix4x3fv = (location, count, transpose, value) => {
  count && GLctx.uniformMatrix4x3fv(webglGetUniformLocation(location), !!transpose, HEAPF32, value >> 2, count * 12);
};
var _emscripten_glUnmapBuffer = (target) => {
  if (!emscriptenWebGLValidateMapBufferTarget(target)) {
    GL.recordError(1280);
    err("GL_INVALID_ENUM in glUnmapBuffer");
    return 0;
  }
  var buffer = emscriptenWebGLGetBufferBinding(target);
  var mapping = GL.mappedBuffers[buffer];
  if (!mapping || !mapping.mem) {
    GL.recordError(1282);
    err("buffer was never mapped in glUnmapBuffer");
    return 0;
  }
  if (!(mapping.access & 16)) {
    if (GL.currentContext.version >= 2) {
      GLctx.bufferSubData(target, mapping.offset, HEAPU8, mapping.mem, mapping.length);
    } else GLctx.bufferSubData(target, mapping.offset, HEAPU8.subarray(mapping.mem, mapping.mem + mapping.length));
  }
  _free(mapping.mem);
  mapping.mem = 0;
  return 1;
};
var _emscripten_glUseProgram = (program) => {
  program = GL.programs[program];
  GLctx.useProgram(program);
  GLctx.currentProgram = program;
};
var _emscripten_glValidateProgram = (program) => {
  GLctx.validateProgram(GL.programs[program]);
};
var _emscripten_glVertexAttrib1f = (x0, x1) => GLctx.vertexAttrib1f(x0, x1);
var _emscripten_glVertexAttrib1fv = (index, v) => {
  GLctx.vertexAttrib1f(index, HEAPF32[v >> 2]);
};
var _emscripten_glVertexAttrib2f = (x0, x1, x2) => GLctx.vertexAttrib2f(x0, x1, x2);
var _emscripten_glVertexAttrib2fv = (index, v) => {
  GLctx.vertexAttrib2f(index, HEAPF32[v >> 2], HEAPF32[(v + 4) >> 2]);
};
var _emscripten_glVertexAttrib3f = (x0, x1, x2, x3) => GLctx.vertexAttrib3f(x0, x1, x2, x3);
var _emscripten_glVertexAttrib3fv = (index, v) => {
  GLctx.vertexAttrib3f(index, HEAPF32[v >> 2], HEAPF32[(v + 4) >> 2], HEAPF32[(v + 8) >> 2]);
};
var _emscripten_glVertexAttrib4f = (x0, x1, x2, x3, x4) => GLctx.vertexAttrib4f(x0, x1, x2, x3, x4);
var _emscripten_glVertexAttrib4fv = (index, v) => {
  GLctx.vertexAttrib4f(index, HEAPF32[v >> 2], HEAPF32[(v + 4) >> 2], HEAPF32[(v + 8) >> 2], HEAPF32[(v + 12) >> 2]);
};
var _emscripten_glVertexAttribDivisor = (index, divisor) => {
  GLctx.vertexAttribDivisor(index, divisor);
};
var _emscripten_glVertexAttribDivisorANGLE = _emscripten_glVertexAttribDivisor;
var _emscripten_glVertexAttribDivisorARB = _emscripten_glVertexAttribDivisor;
var _emscripten_glVertexAttribDivisorEXT = _emscripten_glVertexAttribDivisor;
var _emscripten_glVertexAttribDivisorNV = _emscripten_glVertexAttribDivisor;
var _emscripten_glVertexAttribI4i = (x0, x1, x2, x3, x4) => GLctx.vertexAttribI4i(x0, x1, x2, x3, x4);
var _emscripten_glVertexAttribI4iv = (index, v) => {
  GLctx.vertexAttribI4i(index, HEAP32[v >> 2], HEAP32[(v + 4) >> 2], HEAP32[(v + 8) >> 2], HEAP32[(v + 12) >> 2]);
};
var _emscripten_glVertexAttribI4ui = (x0, x1, x2, x3, x4) => GLctx.vertexAttribI4ui(x0, x1, x2, x3, x4);
var _emscripten_glVertexAttribI4uiv = (index, v) => {
  GLctx.vertexAttribI4ui(index, HEAPU32[v >> 2], HEAPU32[(v + 4) >> 2], HEAPU32[(v + 8) >> 2], HEAPU32[(v + 12) >> 2]);
};
var _emscripten_glVertexAttribIPointer = (index, size, type, stride, ptr) => {
  var cb = GL.currentContext.clientBuffers[index];
  if (!GLctx.currentArrayBufferBinding) {
    cb.size = size;
    cb.type = type;
    cb.normalized = false;
    cb.stride = stride;
    cb.ptr = ptr;
    cb.clientside = true;
    cb.vertexAttribPointerAdaptor = function (index, size, type, normalized, stride, ptr) {
      this.vertexAttribIPointer(index, size, type, stride, ptr);
    };
    return;
  }
  cb.clientside = false;
  GLctx.vertexAttribIPointer(index, size, type, stride, ptr);
};
var _emscripten_glVertexAttribPointer = (index, size, type, normalized, stride, ptr) => {
  var cb = GL.currentContext.clientBuffers[index];
  if (!GLctx.currentArrayBufferBinding) {
    cb.size = size;
    cb.type = type;
    cb.normalized = normalized;
    cb.stride = stride;
    cb.ptr = ptr;
    cb.clientside = true;
    cb.vertexAttribPointerAdaptor = function (index, size, type, normalized, stride, ptr) {
      this.vertexAttribPointer(index, size, type, normalized, stride, ptr);
    };
    return;
  }
  cb.clientside = false;
  GLctx.vertexAttribPointer(index, size, type, !!normalized, stride, ptr);
};
var _emscripten_glViewport = (x0, x1, x2, x3) => GLctx.viewport(x0, x1, x2, x3);
var _emscripten_glWaitSync = (sync, flags, timeout) => {
  timeout = Number(timeout);
  GLctx.waitSync(GL.syncs[sync], flags, timeout);
};
var _emscripten_has_asyncify = () => 0;
var _emscripten_is_main_browser_thread = () => !ENVIRONMENT_IS_WORKER;
var doRequestFullscreen = (target, strategy) => {
  if (!JSEvents.fullscreenEnabled()) return -1;
  target = findEventTarget(target);
  if (!target) return -4;
  if (!target.requestFullscreen && !target.webkitRequestFullscreen) {
    return -3;
  }
  if (!JSEvents.canPerformEventHandlerRequests()) {
    if (strategy.deferUntilInEventHandler) {
      JSEvents.deferCall(JSEvents_requestFullscreen, 1, [target, strategy]);
      return 1;
    }
    return -2;
  }
  return JSEvents_requestFullscreen(target, strategy);
};
var _emscripten_request_fullscreen_strategy = (target, deferUntilInEventHandler, fullscreenStrategy) => {
  var strategy = {
    scaleMode: HEAP32[fullscreenStrategy >> 2],
    canvasResolutionScaleMode: HEAP32[(fullscreenStrategy + 4) >> 2],
    filteringMode: HEAP32[(fullscreenStrategy + 8) >> 2],
    deferUntilInEventHandler,
    canvasResizedCallback: HEAP32[(fullscreenStrategy + 12) >> 2],
    canvasResizedCallbackUserData: HEAP32[(fullscreenStrategy + 16) >> 2]
  };
  return doRequestFullscreen(target, strategy);
};
var _emscripten_request_pointerlock = (target, deferUntilInEventHandler) => {
  target = findEventTarget(target);
  if (!target) return -4;
  if (!target.requestPointerLock) {
    return -1;
  }
  if (!JSEvents.canPerformEventHandlerRequests()) {
    if (deferUntilInEventHandler) {
      JSEvents.deferCall(requestPointerLock, 2, [target]);
      return 1;
    }
    return -2;
  }
  return requestPointerLock(target);
};
var getHeapMax = () => 2147483648;
var alignMemory = (size, alignment) => Math.ceil(size / alignment) * alignment;
var growMemory = (size) => {
  var oldHeapSize = wasmMemory.buffer.byteLength;
  var pages = ((size - oldHeapSize + 65535) / 65536) | 0;
  try {
    wasmMemory.grow(pages);
    updateMemoryViews();
    return 1;
  } catch (e) {}
};
var _emscripten_resize_heap = (requestedSize) => {
  var oldSize = HEAPU8.length;
  requestedSize >>>= 0;
  var maxHeapSize = getHeapMax();
  if (requestedSize > maxHeapSize) {
    return false;
  }
  for (var cutDown = 1; cutDown <= 4; cutDown *= 2) {
    var overGrownHeapSize = oldSize * (1 + 0.2 / cutDown);
    overGrownHeapSize = Math.min(overGrownHeapSize, requestedSize + 100663296);
    var newSize = Math.min(maxHeapSize, alignMemory(Math.max(requestedSize, overGrownHeapSize), 65536));
    var replacement = growMemory(newSize);
    if (replacement) {
      return true;
    }
  }
  return false;
};
var _emscripten_run_script_int = (ptr) => eval(UTF8ToString(ptr)) | 0;
var _emscripten_sample_gamepad_data = () => {
  try {
    if (navigator.getGamepads) return (JSEvents.lastGamepadState = navigator.getGamepads()) ? 0 : -1;
  } catch (e) {
    navigator.getGamepads = null;
  }
  return -1;
};
var registerBeforeUnloadEventCallback = (target, userData, useCapture, callbackfunc, eventTypeId, eventTypeString) => {
  var beforeUnloadEventHandlerFunc = (e) => {
    var confirmationMessage = getWasmTableEntry(callbackfunc)(eventTypeId, 0, userData);
    if (confirmationMessage) {
      confirmationMessage = UTF8ToString(confirmationMessage);
    }
    if (confirmationMessage) {
      e.preventDefault();
      e.returnValue = confirmationMessage;
      return confirmationMessage;
    }
  };
  var eventHandler = {
    target: findEventTarget(target),
    eventTypeString,
    eventTypeId,
    userData,
    callbackfunc,
    handlerFunc: beforeUnloadEventHandlerFunc,
    useCapture
  };
  return JSEvents.registerOrRemoveHandler(eventHandler);
};
var _emscripten_set_beforeunload_callback_on_thread = (userData, callbackfunc, targetThread) => {
  if (typeof onbeforeunload == "undefined") return -1;
  if (targetThread !== 1) return -5;
  return registerBeforeUnloadEventCallback(2, userData, true, callbackfunc, 28, "beforeunload");
};
var registerFocusEventCallback = (
  target,
  userData,
  useCapture,
  callbackfunc,
  eventTypeId,
  eventTypeString,
  targetThread
) => {
  var eventSize = 256;
  JSEvents.focusEvent ||= _malloc(eventSize);
  var focusEventHandlerFunc = (e) => {
    var nodeName = JSEvents.getNodeNameForTarget(e.target);
    var id = e.target.id ? e.target.id : "";
    var focusEvent = JSEvents.focusEvent;
    stringToUTF8(nodeName, focusEvent + 0, 128);
    stringToUTF8(id, focusEvent + 128, 128);
    if (getWasmTableEntry(callbackfunc)(eventTypeId, focusEvent, userData)) e.preventDefault();
  };
  var eventHandler = {
    target: findEventTarget(target),
    eventTypeString,
    eventTypeId,
    userData,
    callbackfunc,
    handlerFunc: focusEventHandlerFunc,
    useCapture
  };
  return JSEvents.registerOrRemoveHandler(eventHandler);
};
var _emscripten_set_blur_callback_on_thread = (target, userData, useCapture, callbackfunc, targetThread) =>
  registerFocusEventCallback(target, userData, useCapture, callbackfunc, 12, "blur", targetThread);
var _emscripten_set_element_css_size = (target, width, height) => {
  target = findEventTarget(target);
  if (!target) return -4;
  target.style.width = width + "px";
  target.style.height = height + "px";
  return 0;
};
var _emscripten_set_focus_callback_on_thread = (target, userData, useCapture, callbackfunc, targetThread) =>
  registerFocusEventCallback(target, userData, useCapture, callbackfunc, 13, "focus", targetThread);
var fillFullscreenChangeEventData = (eventStruct) => {
  var fullscreenElement = getFullscreenElement();
  var isFullscreen = !!fullscreenElement;
  HEAP8[eventStruct] = isFullscreen;
  HEAP8[eventStruct + 1] = JSEvents.fullscreenEnabled();
  var reportedElement = isFullscreen ? fullscreenElement : JSEvents.previousFullscreenElement;
  var nodeName = JSEvents.getNodeNameForTarget(reportedElement);
  var id = reportedElement?.id || "";
  stringToUTF8(nodeName, eventStruct + 2, 128);
  stringToUTF8(id, eventStruct + 130, 128);
  HEAP32[(eventStruct + 260) >> 2] = reportedElement ? reportedElement.clientWidth : 0;
  HEAP32[(eventStruct + 264) >> 2] = reportedElement ? reportedElement.clientHeight : 0;
  HEAP32[(eventStruct + 268) >> 2] = screen.width;
  HEAP32[(eventStruct + 272) >> 2] = screen.height;
  if (isFullscreen) {
    JSEvents.previousFullscreenElement = fullscreenElement;
  }
};
var registerFullscreenChangeEventCallback = (
  target,
  userData,
  useCapture,
  callbackfunc,
  eventTypeId,
  eventTypeString,
  targetThread
) => {
  var eventSize = 276;
  JSEvents.fullscreenChangeEvent ||= _malloc(eventSize);
  var fullscreenChangeEventhandlerFunc = (e) => {
    var fullscreenChangeEvent = JSEvents.fullscreenChangeEvent;
    fillFullscreenChangeEventData(fullscreenChangeEvent);
    if (getWasmTableEntry(callbackfunc)(eventTypeId, fullscreenChangeEvent, userData)) e.preventDefault();
  };
  var eventHandler = {
    target,
    eventTypeString,
    eventTypeId,
    userData,
    callbackfunc,
    handlerFunc: fullscreenChangeEventhandlerFunc,
    useCapture
  };
  return JSEvents.registerOrRemoveHandler(eventHandler);
};
var _emscripten_set_fullscreenchange_callback_on_thread = (
  target,
  userData,
  useCapture,
  callbackfunc,
  targetThread
) => {
  if (!JSEvents.fullscreenEnabled()) return -1;
  target = findEventTarget(target);
  if (!target) return -4;
  registerFullscreenChangeEventCallback(
    target,
    userData,
    useCapture,
    callbackfunc,
    19,
    "webkitfullscreenchange",
    targetThread
  );
  return registerFullscreenChangeEventCallback(
    target,
    userData,
    useCapture,
    callbackfunc,
    19,
    "fullscreenchange",
    targetThread
  );
};
var registerGamepadEventCallback = (
  target,
  userData,
  useCapture,
  callbackfunc,
  eventTypeId,
  eventTypeString,
  targetThread
) => {
  var eventSize = 1240;
  JSEvents.gamepadEvent ||= _malloc(eventSize);
  var gamepadEventHandlerFunc = (e) => {
    var gamepadEvent = JSEvents.gamepadEvent;
    fillGamepadEventData(gamepadEvent, e["gamepad"]);
    if (getWasmTableEntry(callbackfunc)(eventTypeId, gamepadEvent, userData)) e.preventDefault();
  };
  var eventHandler = {
    target: findEventTarget(target),
    allowsDeferredCalls: true,
    eventTypeString,
    eventTypeId,
    userData,
    callbackfunc,
    handlerFunc: gamepadEventHandlerFunc,
    useCapture
  };
  return JSEvents.registerOrRemoveHandler(eventHandler);
};
var _emscripten_set_gamepadconnected_callback_on_thread = (userData, useCapture, callbackfunc, targetThread) => {
  if (_emscripten_sample_gamepad_data()) return -1;
  return registerGamepadEventCallback(2, userData, useCapture, callbackfunc, 26, "gamepadconnected", targetThread);
};
var _emscripten_set_gamepaddisconnected_callback_on_thread = (userData, useCapture, callbackfunc, targetThread) => {
  if (_emscripten_sample_gamepad_data()) return -1;
  return registerGamepadEventCallback(2, userData, useCapture, callbackfunc, 27, "gamepaddisconnected", targetThread);
};
var registerKeyEventCallback = (
  target,
  userData,
  useCapture,
  callbackfunc,
  eventTypeId,
  eventTypeString,
  targetThread
) => {
  var eventSize = 160;
  JSEvents.keyEvent ||= _malloc(eventSize);
  var keyEventHandlerFunc = (e) => {
    var keyEventData = JSEvents.keyEvent;
    HEAPF64[keyEventData >> 3] = e.timeStamp;
    var idx = keyEventData >> 2;
    HEAP32[idx + 2] = e.location;
    HEAP8[keyEventData + 12] = e.ctrlKey;
    HEAP8[keyEventData + 13] = e.shiftKey;
    HEAP8[keyEventData + 14] = e.altKey;
    HEAP8[keyEventData + 15] = e.metaKey;
    HEAP8[keyEventData + 16] = e.repeat;
    HEAP32[idx + 5] = e.charCode;
    HEAP32[idx + 6] = e.keyCode;
    HEAP32[idx + 7] = e.which;
    stringToUTF8(e.key || "", keyEventData + 32, 32);
    stringToUTF8(e.code || "", keyEventData + 64, 32);
    stringToUTF8(e.char || "", keyEventData + 96, 32);
    stringToUTF8(e.locale || "", keyEventData + 128, 32);
    if (getWasmTableEntry(callbackfunc)(eventTypeId, keyEventData, userData)) e.preventDefault();
  };
  var eventHandler = {
    target: findEventTarget(target),
    eventTypeString,
    eventTypeId,
    userData,
    callbackfunc,
    handlerFunc: keyEventHandlerFunc,
    useCapture
  };
  return JSEvents.registerOrRemoveHandler(eventHandler);
};
var _emscripten_set_keydown_callback_on_thread = (target, userData, useCapture, callbackfunc, targetThread) =>
  registerKeyEventCallback(target, userData, useCapture, callbackfunc, 2, "keydown", targetThread);
var _emscripten_set_keypress_callback_on_thread = (target, userData, useCapture, callbackfunc, targetThread) =>
  registerKeyEventCallback(target, userData, useCapture, callbackfunc, 1, "keypress", targetThread);
var _emscripten_set_keyup_callback_on_thread = (target, userData, useCapture, callbackfunc, targetThread) =>
  registerKeyEventCallback(target, userData, useCapture, callbackfunc, 3, "keyup", targetThread);
var _emscripten_set_main_loop = (func, fps, simulateInfiniteLoop) => {
  var iterFunc = getWasmTableEntry(func);
  setMainLoop(iterFunc, fps, simulateInfiniteLoop);
};
var fillMouseEventData = (eventStruct, e, target) => {
  HEAPF64[eventStruct >> 3] = e.timeStamp;
  var idx = eventStruct >> 2;
  HEAP32[idx + 2] = e.screenX;
  HEAP32[idx + 3] = e.screenY;
  HEAP32[idx + 4] = e.clientX;
  HEAP32[idx + 5] = e.clientY;
  HEAP8[eventStruct + 24] = e.ctrlKey;
  HEAP8[eventStruct + 25] = e.shiftKey;
  HEAP8[eventStruct + 26] = e.altKey;
  HEAP8[eventStruct + 27] = e.metaKey;
  HEAP16[idx * 2 + 14] = e.button;
  HEAP16[idx * 2 + 15] = e.buttons;
  HEAP32[idx + 8] = e["movementX"];
  HEAP32[idx + 9] = e["movementY"];
  var rect = getBoundingClientRect(target);
  HEAP32[idx + 10] = e.clientX - (rect.left | 0);
  HEAP32[idx + 11] = e.clientY - (rect.top | 0);
};
var registerMouseEventCallback = (
  target,
  userData,
  useCapture,
  callbackfunc,
  eventTypeId,
  eventTypeString,
  targetThread
) => {
  var eventSize = 64;
  JSEvents.mouseEvent ||= _malloc(eventSize);
  target = findEventTarget(target);
  var mouseEventHandlerFunc = (e) => {
    fillMouseEventData(JSEvents.mouseEvent, e, target);
    if (getWasmTableEntry(callbackfunc)(eventTypeId, JSEvents.mouseEvent, userData)) e.preventDefault();
  };
  var eventHandler = {
    target,
    allowsDeferredCalls:
      eventTypeString != "mousemove" && eventTypeString != "mouseenter" && eventTypeString != "mouseleave",
    eventTypeString,
    eventTypeId,
    userData,
    callbackfunc,
    handlerFunc: mouseEventHandlerFunc,
    useCapture
  };
  return JSEvents.registerOrRemoveHandler(eventHandler);
};
var _emscripten_set_mousedown_callback_on_thread = (target, userData, useCapture, callbackfunc, targetThread) =>
  registerMouseEventCallback(target, userData, useCapture, callbackfunc, 5, "mousedown", targetThread);
var _emscripten_set_mouseenter_callback_on_thread = (target, userData, useCapture, callbackfunc, targetThread) =>
  registerMouseEventCallback(target, userData, useCapture, callbackfunc, 33, "mouseenter", targetThread);
var _emscripten_set_mouseleave_callback_on_thread = (target, userData, useCapture, callbackfunc, targetThread) =>
  registerMouseEventCallback(target, userData, useCapture, callbackfunc, 34, "mouseleave", targetThread);
var _emscripten_set_mousemove_callback_on_thread = (target, userData, useCapture, callbackfunc, targetThread) =>
  registerMouseEventCallback(target, userData, useCapture, callbackfunc, 8, "mousemove", targetThread);
var _emscripten_set_mouseup_callback_on_thread = (target, userData, useCapture, callbackfunc, targetThread) =>
  registerMouseEventCallback(target, userData, useCapture, callbackfunc, 6, "mouseup", targetThread);
var fillPointerlockChangeEventData = (eventStruct) => {
  var pointerLockElement = document.pointerLockElement;
  var isPointerlocked = !!pointerLockElement;
  HEAP8[eventStruct] = isPointerlocked;
  var nodeName = JSEvents.getNodeNameForTarget(pointerLockElement);
  var id = pointerLockElement?.id || "";
  stringToUTF8(nodeName, eventStruct + 1, 128);
  stringToUTF8(id, eventStruct + 129, 128);
};
var registerPointerlockChangeEventCallback = (
  target,
  userData,
  useCapture,
  callbackfunc,
  eventTypeId,
  eventTypeString,
  targetThread
) => {
  var eventSize = 257;
  JSEvents.pointerlockChangeEvent ||= _malloc(eventSize);
  var pointerlockChangeEventHandlerFunc = (e) => {
    var pointerlockChangeEvent = JSEvents.pointerlockChangeEvent;
    fillPointerlockChangeEventData(pointerlockChangeEvent);
    if (getWasmTableEntry(callbackfunc)(eventTypeId, pointerlockChangeEvent, userData)) e.preventDefault();
  };
  var eventHandler = {
    target,
    eventTypeString,
    eventTypeId,
    userData,
    callbackfunc,
    handlerFunc: pointerlockChangeEventHandlerFunc,
    useCapture
  };
  return JSEvents.registerOrRemoveHandler(eventHandler);
};
var _emscripten_set_pointerlockchange_callback_on_thread = (
  target,
  userData,
  useCapture,
  callbackfunc,
  targetThread
) => {
  if (!document.body?.requestPointerLock) {
    return -1;
  }
  target = findEventTarget(target);
  if (!target) return -4;
  return registerPointerlockChangeEventCallback(
    target,
    userData,
    useCapture,
    callbackfunc,
    20,
    "pointerlockchange",
    targetThread
  );
};
var registerUiEventCallback = (
  target,
  userData,
  useCapture,
  callbackfunc,
  eventTypeId,
  eventTypeString,
  targetThread
) => {
  var eventSize = 36;
  JSEvents.uiEvent ||= _malloc(eventSize);
  target = findEventTarget(target);
  var uiEventHandlerFunc = (e) => {
    if (e.target != target) {
      return;
    }
    var b = document.body;
    if (!b) {
      return;
    }
    var uiEvent = JSEvents.uiEvent;
    HEAP32[uiEvent >> 2] = 0;
    HEAP32[(uiEvent + 4) >> 2] = b.clientWidth;
    HEAP32[(uiEvent + 8) >> 2] = b.clientHeight;
    HEAP32[(uiEvent + 12) >> 2] = innerWidth;
    HEAP32[(uiEvent + 16) >> 2] = innerHeight;
    HEAP32[(uiEvent + 20) >> 2] = outerWidth;
    HEAP32[(uiEvent + 24) >> 2] = outerHeight;
    HEAP32[(uiEvent + 28) >> 2] = pageXOffset | 0;
    HEAP32[(uiEvent + 32) >> 2] = pageYOffset | 0;
    if (getWasmTableEntry(callbackfunc)(eventTypeId, uiEvent, userData)) e.preventDefault();
  };
  var eventHandler = {
    target,
    eventTypeString,
    eventTypeId,
    userData,
    callbackfunc,
    handlerFunc: uiEventHandlerFunc,
    useCapture
  };
  return JSEvents.registerOrRemoveHandler(eventHandler);
};
var _emscripten_set_resize_callback_on_thread = (target, userData, useCapture, callbackfunc, targetThread) =>
  registerUiEventCallback(target, userData, useCapture, callbackfunc, 10, "resize", targetThread);
var registerTouchEventCallback = (
  target,
  userData,
  useCapture,
  callbackfunc,
  eventTypeId,
  eventTypeString,
  targetThread
) => {
  var eventSize = 1552;
  JSEvents.touchEvent ||= _malloc(eventSize);
  target = findEventTarget(target);
  var touchEventHandlerFunc = (e) => {
    var t,
      touches = {},
      et = e.touches;
    for (let t of et) {
      t.isChanged = t.onTarget = 0;
      touches[t.identifier] = t;
    }
    for (let t of e.changedTouches) {
      t.isChanged = 1;
      touches[t.identifier] = t;
    }
    for (let t of e.targetTouches) {
      touches[t.identifier].onTarget = 1;
    }
    var touchEvent = JSEvents.touchEvent;
    HEAPF64[touchEvent >> 3] = e.timeStamp;
    HEAP8[touchEvent + 12] = e.ctrlKey;
    HEAP8[touchEvent + 13] = e.shiftKey;
    HEAP8[touchEvent + 14] = e.altKey;
    HEAP8[touchEvent + 15] = e.metaKey;
    var idx = touchEvent + 16;
    var targetRect = getBoundingClientRect(target);
    var numTouches = 0;
    for (let t of Object.values(touches)) {
      var idx32 = idx >> 2;
      HEAP32[idx32 + 0] = t.identifier;
      HEAP32[idx32 + 1] = t.screenX;
      HEAP32[idx32 + 2] = t.screenY;
      HEAP32[idx32 + 3] = t.clientX;
      HEAP32[idx32 + 4] = t.clientY;
      HEAP32[idx32 + 5] = t.pageX;
      HEAP32[idx32 + 6] = t.pageY;
      HEAP8[idx + 28] = t.isChanged;
      HEAP8[idx + 29] = t.onTarget;
      HEAP32[idx32 + 8] = t.clientX - (targetRect.left | 0);
      HEAP32[idx32 + 9] = t.clientY - (targetRect.top | 0);
      idx += 48;
      if (++numTouches > 31) {
        break;
      }
    }
    HEAP32[(touchEvent + 8) >> 2] = numTouches;
    if (getWasmTableEntry(callbackfunc)(eventTypeId, touchEvent, userData)) e.preventDefault();
  };
  var eventHandler = {
    target,
    allowsDeferredCalls: eventTypeString == "touchstart" || eventTypeString == "touchend",
    eventTypeString,
    eventTypeId,
    userData,
    callbackfunc,
    handlerFunc: touchEventHandlerFunc,
    useCapture
  };
  return JSEvents.registerOrRemoveHandler(eventHandler);
};
var _emscripten_set_touchcancel_callback_on_thread = (target, userData, useCapture, callbackfunc, targetThread) =>
  registerTouchEventCallback(target, userData, useCapture, callbackfunc, 25, "touchcancel", targetThread);
var _emscripten_set_touchend_callback_on_thread = (target, userData, useCapture, callbackfunc, targetThread) =>
  registerTouchEventCallback(target, userData, useCapture, callbackfunc, 23, "touchend", targetThread);
var _emscripten_set_touchmove_callback_on_thread = (target, userData, useCapture, callbackfunc, targetThread) =>
  registerTouchEventCallback(target, userData, useCapture, callbackfunc, 24, "touchmove", targetThread);
var _emscripten_set_touchstart_callback_on_thread = (target, userData, useCapture, callbackfunc, targetThread) =>
  registerTouchEventCallback(target, userData, useCapture, callbackfunc, 22, "touchstart", targetThread);
var fillVisibilityChangeEventData = (eventStruct) => {
  var visibilityStates = ["hidden", "visible", "prerender", "unloaded"];
  var visibilityState = visibilityStates.indexOf(document.visibilityState);
  HEAP8[eventStruct] = document.hidden;
  HEAP32[(eventStruct + 4) >> 2] = visibilityState;
};
var registerVisibilityChangeEventCallback = (
  target,
  userData,
  useCapture,
  callbackfunc,
  eventTypeId,
  eventTypeString,
  targetThread
) => {
  var eventSize = 8;
  JSEvents.visibilityChangeEvent ||= _malloc(eventSize);
  var visibilityChangeEventHandlerFunc = (e) => {
    var visibilityChangeEvent = JSEvents.visibilityChangeEvent;
    fillVisibilityChangeEventData(visibilityChangeEvent);
    if (getWasmTableEntry(callbackfunc)(eventTypeId, visibilityChangeEvent, userData)) e.preventDefault();
  };
  var eventHandler = {
    target,
    eventTypeString,
    eventTypeId,
    userData,
    callbackfunc,
    handlerFunc: visibilityChangeEventHandlerFunc,
    useCapture
  };
  return JSEvents.registerOrRemoveHandler(eventHandler);
};
var _emscripten_set_visibilitychange_callback_on_thread = (userData, useCapture, callbackfunc, targetThread) => {
  if (!specialHTMLTargets[1]) {
    return -4;
  }
  return registerVisibilityChangeEventCallback(
    specialHTMLTargets[1],
    userData,
    useCapture,
    callbackfunc,
    21,
    "visibilitychange",
    targetThread
  );
};
var registerWheelEventCallback = (
  target,
  userData,
  useCapture,
  callbackfunc,
  eventTypeId,
  eventTypeString,
  targetThread
) => {
  var eventSize = 96;
  JSEvents.wheelEvent ||= _malloc(eventSize);
  var wheelHandlerFunc = (e) => {
    var wheelEvent = JSEvents.wheelEvent;
    fillMouseEventData(wheelEvent, e, target);
    HEAPF64[(wheelEvent + 64) >> 3] = e["deltaX"];
    HEAPF64[(wheelEvent + 72) >> 3] = e["deltaY"];
    HEAPF64[(wheelEvent + 80) >> 3] = e["deltaZ"];
    HEAP32[(wheelEvent + 88) >> 2] = e["deltaMode"];
    if (getWasmTableEntry(callbackfunc)(eventTypeId, wheelEvent, userData)) e.preventDefault();
  };
  var eventHandler = {
    target,
    allowsDeferredCalls: true,
    eventTypeString,
    eventTypeId,
    userData,
    callbackfunc,
    handlerFunc: wheelHandlerFunc,
    useCapture
  };
  return JSEvents.registerOrRemoveHandler(eventHandler);
};
var _emscripten_set_wheel_callback_on_thread = (target, userData, useCapture, callbackfunc, targetThread) => {
  target = findEventTarget(target);
  if (!target) return -4;
  if (typeof target.onwheel != "undefined") {
    return registerWheelEventCallback(target, userData, useCapture, callbackfunc, 9, "wheel", targetThread);
  } else {
    return -1;
  }
};
var _emscripten_set_window_title = (title) => (document.title = UTF8ToString(title));
var _emscripten_sleep = () => {
  abort("Please compile your program with async support in order to use asynchronous operations like emscripten_sleep");
};
class HandleAllocator {
  allocated = [undefined];
  freelist = [];
  get(id) {
    return this.allocated[id];
  }
  has(id) {
    return this.allocated[id] !== undefined;
  }
  allocate(handle) {
    var id = this.freelist.pop() || this.allocated.length;
    this.allocated[id] = handle;
    return id;
  }
  free(id) {
    this.allocated[id] = undefined;
    this.freelist.push(id);
  }
}
var Fetch = {
  async openDatabase(dbname, dbversion) {
    return new Promise((resolve, reject) => {
      try {
        var openRequest = indexedDB.open(dbname, dbversion);
      } catch (e) {
        return reject(e);
      }
      openRequest.onupgradeneeded = (event) => {
        var db = event.target.result;
        if (db.objectStoreNames.contains("FILES")) {
          db.deleteObjectStore("FILES");
        }
        db.createObjectStore("FILES");
      };
      openRequest.onsuccess = (event) => resolve(event.target.result);
      openRequest.onerror = reject;
    });
  },
  async init() {
    Fetch.xhrs = new HandleAllocator();
    addRunDependency("library_fetch_init");
    try {
      var db = await Fetch.openDatabase("emscripten_filesystem", 1);
      Fetch.dbInstance = db;
    } catch (e) {
      Fetch.dbInstance = false;
    } finally {
      removeRunDependency("library_fetch_init");
    }
  }
};
let existingFiles = new Set();

fetch("/static/gtavc/files.txt")
  .then(res => res.text())
  .then(text => {
    existingFiles = new Set(text.split("\n").map(line => line.trim()).filter(Boolean));
  })
  .catch(err => {
    console.error("Failed to load files.txt:", err);
  });


function fetchXHR(fetch, onsuccess, onerror, onprogress, onreadystatechange) {
  var urlPtr = HEAPU32[(fetch + 8) >> 2];
  if (!urlPtr) {
    onerror(fetch, "no url specified!");
    return;
  }
  const originalUrl = UTF8ToString(urlPtr);

  const assetName = originalUrl.split("/").pop();

  function pipeToProxy(url) {
    return `https://reeyuki.duckdns.org/fetch?url=${encodeURIComponent(url)}`;
  }

  let finalUrl;
  if (existingFiles.has(assetName)) {
    // Asset exists in files.txt, fetch directly from github pages
    finalUrl = `https://reeyuki.github.io/static/gtavc/assets/${assetName}`;
  } else {
    // Fallback to proxy
    finalUrl = pipeToProxy(originalUrl);
  }

  var fetch_attr = fetch + 108;
  var requestMethod = UTF8ToString(fetch_attr + 0);

  var timeoutMsecs = HEAPU32[(fetch_attr + 56) >> 2];
  var userName = HEAPU32[(fetch_attr + 68) >> 2];
  var password = HEAPU32[(fetch_attr + 72) >> 2];
  var requestHeaders = HEAPU32[(fetch_attr + 76) >> 2];
  var overriddenMimeType = HEAPU32[(fetch_attr + 80) >> 2];
  var dataPtr = HEAPU32[(fetch_attr + 84) >> 2];
  var dataLength = HEAPU32[(fetch_attr + 88) >> 2];
  var fetchAttributes = HEAPU32[(fetch_attr + 52) >> 2];
  var fetchAttrLoadToMemory = !!(fetchAttributes & 1);
  var fetchAttrStreamData = !!(fetchAttributes & 2);
  var fetchAttrSynchronous = !!(fetchAttributes & 64);
  var userNameStr = userName ? UTF8ToString(userName) : undefined;
  var passwordStr = password ? UTF8ToString(password) : undefined;
  var xhr = new XMLHttpRequest();
  xhr.withCredentials = !!HEAPU8[fetch_attr + 60];
  xhr.open(requestMethod, proxiedUrl, !fetchAttrSynchronous, userNameStr, passwordStr);
  if (!fetchAttrSynchronous) xhr.timeout = timeoutMsecs;
  xhr.url_ = proxiedUrl;
  xhr.responseType = "arraybuffer";
  if (overriddenMimeType) {
    var overriddenMimeTypeStr = UTF8ToString(overriddenMimeType);
    xhr.overrideMimeType(overriddenMimeTypeStr);
  }
  if (requestHeaders) {
    for (;;) {
      var key = HEAPU32[requestHeaders >> 2];
      if (!key) break;
      var value = HEAPU32[(requestHeaders + 4) >> 2];
      if (!value) break;
      requestHeaders += 8;
      var keyStr = UTF8ToString(key);
      var valueStr = UTF8ToString(value);
      xhr.setRequestHeader(keyStr, valueStr);
    }
  }
  var id = Fetch.xhrs.allocate(xhr);
  HEAPU32[fetch >> 2] = id;
  var data = dataPtr && dataLength ? HEAPU8.slice(dataPtr, dataPtr + dataLength) : null;
  function saveResponseAndStatus() {
    var ptr = 0;
    var ptrLen = 0;
    if (xhr.response && fetchAttrLoadToMemory && HEAPU32[(fetch + 12) >> 2] === 0) {
      ptrLen = xhr.response.byteLength;
    }
    if (ptrLen > 0) {
      ptr = _realloc(HEAPU32[(fetch + 12) >> 2], ptrLen);
      HEAPU8.set(new Uint8Array(xhr.response), ptr);
    }
    HEAPU32[(fetch + 12) >> 2] = ptr;
    writeI53ToI64(fetch + 16, ptrLen);
    writeI53ToI64(fetch + 24, 0);
    var len = xhr.response ? xhr.response.byteLength : 0;
    if (len) {
      writeI53ToI64(fetch + 32, len);
    }
    HEAP16[(fetch + 40) >> 1] = xhr.readyState;
    HEAP16[(fetch + 42) >> 1] = xhr.status;
    if (xhr.statusText) stringToUTF8(xhr.statusText, fetch + 44, 64);
    if (fetchAttrSynchronous) {
      var ruPtr = stringToNewUTF8(xhr.responseURL);
      HEAPU32[(fetch + 200) >> 2] = ruPtr;
    }
  }
  xhr.onload = (e) => {
    if (!Fetch.xhrs.has(id)) {
      return;
    }
    saveResponseAndStatus();
    if (xhr.status >= 200 && xhr.status < 300) {
      onsuccess(fetch, xhr, e);
    } else {
      onerror(fetch, e);
    }
  };
  xhr.onerror = (e) => {
    if (!Fetch.xhrs.has(id)) {
      return;
    }
    saveResponseAndStatus();
    onerror(fetch, e);
  };
  xhr.ontimeout = (e) => {
    if (!Fetch.xhrs.has(id)) {
      return;
    }
    onerror(fetch, e);
  };
  xhr.onprogress = (e) => {
    if (!Fetch.xhrs.has(id)) {
      return;
    }
    var ptrLen = fetchAttrLoadToMemory && fetchAttrStreamData && xhr.response ? xhr.response.byteLength : 0;
    var ptr = 0;
    if (ptrLen > 0 && fetchAttrLoadToMemory && fetchAttrStreamData) {
      ptr = _realloc(HEAPU32[(fetch + 12) >> 2], ptrLen);
      HEAPU8.set(new Uint8Array(xhr.response), ptr);
    }
    HEAPU32[(fetch + 12) >> 2] = ptr;
    writeI53ToI64(fetch + 16, ptrLen);
    writeI53ToI64(fetch + 24, e.loaded - ptrLen);
    writeI53ToI64(fetch + 32, e.total);
    HEAP16[(fetch + 40) >> 1] = xhr.readyState;
    var status = xhr.status;
    if (xhr.readyState >= 3 && xhr.status === 0 && e.loaded > 0) status = 200;
    HEAP16[(fetch + 42) >> 1] = status;
    if (xhr.statusText) stringToUTF8(xhr.statusText, fetch + 44, 64);
    onprogress(fetch, e);
  };
  xhr.onreadystatechange = (e) => {
    if (!Fetch.xhrs.has(id)) {
      return;
    }
    HEAP16[(fetch + 40) >> 1] = xhr.readyState;
    if (xhr.readyState >= 2) {
      HEAP16[(fetch + 42) >> 1] = xhr.status;
    }
    if (!fetchAttrSynchronous && xhr.readyState === 2 && xhr.responseURL.length > 0) {
      var ruPtr = stringToNewUTF8(xhr.responseURL);
      HEAPU32[(fetch + 200) >> 2] = ruPtr;
    }
    onreadystatechange(fetch, e);
  };
  try {
    xhr.send(data);
  } catch (e) {
    onerror(fetch, e);
  }
}
function fetchCacheData(db, fetch, data, onsuccess, onerror) {
  if (!db) {
    onerror(fetch, 0, "IndexedDB not available!");
    return;
  }
  var fetch_attr = fetch + 108;
  var destinationPath = HEAPU32[(fetch_attr + 64) >> 2];
  destinationPath ||= HEAPU32[(fetch + 8) >> 2];
  var destinationPathStr = UTF8ToString(destinationPath);
  try {
    var transaction = db.transaction(["FILES"], "readwrite");
    var packages = transaction.objectStore("FILES");
    var putRequest = packages.put(data, destinationPathStr);
    putRequest.onsuccess = (event) => {
      HEAP16[(fetch + 40) >> 1] = 4;
      HEAP16[(fetch + 42) >> 1] = 200;
      stringToUTF8("OK", fetch + 44, 64);
      onsuccess(fetch, 0, destinationPathStr);
    };
    putRequest.onerror = (error) => {
      HEAP16[(fetch + 40) >> 1] = 4;
      HEAP16[(fetch + 42) >> 1] = 413;
      stringToUTF8("Payload Too Large", fetch + 44, 64);
      onerror(fetch, 0, error);
    };
  } catch (e) {
    onerror(fetch, 0, e);
  }
}
function fetchLoadCachedData(db, fetch, onsuccess, onerror) {
  if (!db) {
    onerror(fetch, 0, "IndexedDB not available!");
    return;
  }
  var fetch_attr = fetch + 108;
  var path = HEAPU32[(fetch_attr + 64) >> 2];
  path ||= HEAPU32[(fetch + 8) >> 2];
  var pathStr = UTF8ToString(path);
  try {
    var transaction = db.transaction(["FILES"], "readonly");
    var packages = transaction.objectStore("FILES");
    var getRequest = packages.get(pathStr);
    getRequest.onsuccess = (event) => {
      if (event.target.result) {
        var value = event.target.result;
        var len = value.byteLength || value.length;
        var ptr = _malloc(len);
        HEAPU8.set(new Uint8Array(value), ptr);
        HEAPU32[(fetch + 12) >> 2] = ptr;
        writeI53ToI64(fetch + 16, len);
        writeI53ToI64(fetch + 24, 0);
        writeI53ToI64(fetch + 32, len);
        HEAP16[(fetch + 40) >> 1] = 4;
        HEAP16[(fetch + 42) >> 1] = 200;
        stringToUTF8("OK", fetch + 44, 64);
        onsuccess(fetch, 0, value);
      } else {
        HEAP16[(fetch + 40) >> 1] = 4;
        HEAP16[(fetch + 42) >> 1] = 404;
        stringToUTF8("Not Found", fetch + 44, 64);
        onerror(fetch, 0, "no data");
      }
    };
    getRequest.onerror = (error) => {
      HEAP16[(fetch + 40) >> 1] = 4;
      HEAP16[(fetch + 42) >> 1] = 404;
      stringToUTF8("Not Found", fetch + 44, 64);
      onerror(fetch, 0, error);
    };
  } catch (e) {
    onerror(fetch, 0, e);
  }
}
function fetchDeleteCachedData(db, fetch, onsuccess, onerror) {
  if (!db) {
    onerror(fetch, 0, "IndexedDB not available!");
    return;
  }
  var fetch_attr = fetch + 108;
  var path = HEAPU32[(fetch_attr + 64) >> 2];
  path ||= HEAPU32[(fetch + 8) >> 2];
  var pathStr = UTF8ToString(path);
  try {
    var transaction = db.transaction(["FILES"], "readwrite");
    var packages = transaction.objectStore("FILES");
    var request = packages.delete(pathStr);
    request.onsuccess = (event) => {
      var value = event.target.result;
      HEAPU32[(fetch + 12) >> 2] = 0;
      writeI53ToI64(fetch + 16, 0);
      writeI53ToI64(fetch + 24, 0);
      writeI53ToI64(fetch + 32, 0);
      HEAP16[(fetch + 40) >> 1] = 4;
      HEAP16[(fetch + 42) >> 1] = 200;
      stringToUTF8("OK", fetch + 44, 64);
      onsuccess(fetch, 0, value);
    };
    request.onerror = (error) => {
      HEAP16[(fetch + 40) >> 1] = 4;
      HEAP16[(fetch + 42) >> 1] = 404;
      stringToUTF8("Not Found", fetch + 44, 64);
      onerror(fetch, 0, error);
    };
  } catch (e) {
    onerror(fetch, 0, e);
  }
}
function _emscripten_start_fetch(fetch, successcb, errorcb, progresscb, readystatechangecb) {
  var fetch_attr = fetch + 108;
  var onsuccess = HEAPU32[(fetch_attr + 36) >> 2];
  var onerror = HEAPU32[(fetch_attr + 40) >> 2];
  var onprogress = HEAPU32[(fetch_attr + 44) >> 2];
  var onreadystatechange = HEAPU32[(fetch_attr + 48) >> 2];
  var fetchAttributes = HEAPU32[(fetch_attr + 52) >> 2];
  var fetchAttrSynchronous = !!(fetchAttributes & 64);
  function doCallback(f) {
    if (fetchAttrSynchronous) {
      f();
    } else {
      callUserCallback(f);
    }
  }
  var reportSuccess = (fetch, xhr, e) => {
    doCallback(() => {
      if (onsuccess) getWasmTableEntry(onsuccess)(fetch);
      else successcb?.(fetch);
    });
  };
  var reportProgress = (fetch, e) => {
    doCallback(() => {
      if (onprogress) getWasmTableEntry(onprogress)(fetch);
      else progresscb?.(fetch);
    });
  };
  var reportError = (fetch, e) => {
    doCallback(() => {
      if (onerror) getWasmTableEntry(onerror)(fetch);
      else errorcb?.(fetch);
    });
  };
  var reportReadyStateChange = (fetch, e) => {
    doCallback(() => {
      if (onreadystatechange) getWasmTableEntry(onreadystatechange)(fetch);
      else readystatechangecb?.(fetch);
    });
  };
  var performUncachedXhr = (fetch, xhr, e) => {
    fetchXHR(fetch, reportSuccess, reportError, reportProgress, reportReadyStateChange);
  };
  var cacheResultAndReportSuccess = (fetch, xhr, e) => {
    var storeSuccess = (fetch, xhr, e) => {
      doCallback(() => {
        if (onsuccess) getWasmTableEntry(onsuccess)(fetch);
        else successcb?.(fetch);
      });
    };
    var storeError = (fetch, xhr, e) => {
      doCallback(() => {
        if (onsuccess) getWasmTableEntry(onsuccess)(fetch);
        else successcb?.(fetch);
      });
    };
    fetchCacheData(Fetch.dbInstance, fetch, xhr.response, storeSuccess, storeError);
  };
  var performCachedXhr = (fetch, xhr, e) => {
    fetchXHR(fetch, cacheResultAndReportSuccess, reportError, reportProgress, reportReadyStateChange);
  };
  var requestMethod = UTF8ToString(fetch_attr + 0);
  var fetchAttrReplace = !!(fetchAttributes & 16);
  var fetchAttrPersistFile = !!(fetchAttributes & 4);
  var fetchAttrNoDownload = !!(fetchAttributes & 32);
  if (requestMethod === "EM_IDB_STORE") {
    var ptr = HEAPU32[(fetch_attr + 84) >> 2];
    var size = HEAPU32[(fetch_attr + 88) >> 2];
    fetchCacheData(Fetch.dbInstance, fetch, HEAPU8.slice(ptr, ptr + size), reportSuccess, reportError);
  } else if (requestMethod === "EM_IDB_DELETE") {
    fetchDeleteCachedData(Fetch.dbInstance, fetch, reportSuccess, reportError);
  } else if (!fetchAttrReplace) {
    fetchLoadCachedData(
      Fetch.dbInstance,
      fetch,
      reportSuccess,
      fetchAttrNoDownload ? reportError : fetchAttrPersistFile ? performCachedXhr : performUncachedXhr
    );
  } else if (!fetchAttrNoDownload) {
    fetchXHR(
      fetch,
      fetchAttrPersistFile ? cacheResultAndReportSuccess : reportSuccess,
      reportError,
      reportProgress,
      reportReadyStateChange
    );
  } else {
    return 0;
  }
  return fetch;
}
var ENV = {};
var getExecutableName = () => thisProgram || "./this.program";
var getEnvStrings = () => {
  if (!getEnvStrings.strings) {
    var lang = (globalThis.navigator?.language ?? "C").replace("-", "_") + ".UTF-8";
    var env = {
      USER: "web_user",
      LOGNAME: "web_user",
      PATH: "/",
      PWD: "/",
      HOME: "/home/web_user",
      LANG: lang,
      _: getExecutableName()
    };
    for (var x in ENV) {
      if (ENV[x] === undefined) delete env[x];
      else env[x] = ENV[x];
    }
    var strings = [];
    for (var x in env) {
      strings.push(`${x}=${env[x]}`);
    }
    getEnvStrings.strings = strings;
  }
  return getEnvStrings.strings;
};
var _environ_get = (__environ, environ_buf) => {
  var bufSize = 0;
  var envp = 0;
  for (var string of getEnvStrings()) {
    var ptr = environ_buf + bufSize;
    HEAPU32[(__environ + envp) >> 2] = ptr;
    bufSize += stringToUTF8(string, ptr, Infinity) + 1;
    envp += 4;
  }
  return 0;
};
var _environ_sizes_get = (penviron_count, penviron_buf_size) => {
  var strings = getEnvStrings();
  HEAPU32[penviron_count >> 2] = strings.length;
  var bufSize = 0;
  for (var string of strings) {
    bufSize += lengthBytesUTF8(string) + 1;
  }
  HEAPU32[penviron_buf_size >> 2] = bufSize;
  return 0;
};
function _fd_close(fd) {
  try {
    var stream = SYSCALLS.getStreamFromFD(fd);
    FS.close(stream);
    return 0;
  } catch (e) {
    if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
    return e.errno;
  }
}
var doReadv = (stream, iov, iovcnt, offset) => {
  var ret = 0;
  for (var i = 0; i < iovcnt; i++) {
    var ptr = HEAPU32[iov >> 2];
    var len = HEAPU32[(iov + 4) >> 2];
    iov += 8;
    var curr = FS.read(stream, HEAP8, ptr, len, offset);
    if (curr < 0) return -1;
    ret += curr;
    if (curr < len) break;
    if (typeof offset != "undefined") {
      offset += curr;
    }
  }
  return ret;
};
function _fd_read(fd, iov, iovcnt, pnum) {
  try {
    var stream = SYSCALLS.getStreamFromFD(fd);
    var num = doReadv(stream, iov, iovcnt);
    HEAPU32[pnum >> 2] = num;
    return 0;
  } catch (e) {
    if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
    return e.errno;
  }
}
function _fd_seek(fd, offset, whence, newOffset) {
  offset = bigintToI53Checked(offset);
  try {
    if (isNaN(offset)) return 61;
    var stream = SYSCALLS.getStreamFromFD(fd);
    FS.llseek(stream, offset, whence);
    HEAP64[newOffset >> 3] = BigInt(stream.position);
    if (stream.getdents && offset === 0 && whence === 0) stream.getdents = null;
    return 0;
  } catch (e) {
    if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
    return e.errno;
  }
}
var doWritev = (stream, iov, iovcnt, offset) => {
  var ret = 0;
  for (var i = 0; i < iovcnt; i++) {
    var ptr = HEAPU32[iov >> 2];
    var len = HEAPU32[(iov + 4) >> 2];
    iov += 8;
    var curr = FS.write(stream, HEAP8, ptr, len, offset);
    if (curr < 0) return -1;
    ret += curr;
    if (curr < len) {
      break;
    }
    if (typeof offset != "undefined") {
      offset += curr;
    }
  }
  return ret;
};
function _fd_write(fd, iov, iovcnt, pnum) {
  try {
    var stream = SYSCALLS.getStreamFromFD(fd);
    var num = doWritev(stream, iov, iovcnt);
    HEAPU32[pnum >> 2] = num;
    return 0;
  } catch (e) {
    if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
    return e.errno;
  }
}
var _glActiveTexture = _emscripten_glActiveTexture;
var _glAttachShader = _emscripten_glAttachShader;
var _glBindBuffer = _emscripten_glBindBuffer;
var _glBindBufferBase = _emscripten_glBindBufferBase;
var _glBindFramebuffer = _emscripten_glBindFramebuffer;
var _glBindRenderbuffer = _emscripten_glBindRenderbuffer;
var _glBindSampler = _emscripten_glBindSampler;
var _glBindTexture = _emscripten_glBindTexture;
var _glBindVertexArray = _emscripten_glBindVertexArray;
var _glBlendEquationSeparate = _emscripten_glBlendEquationSeparate;
var _glBlendFuncSeparate = _emscripten_glBlendFuncSeparate;
var _glBufferData = _emscripten_glBufferData;
var _glClear = _emscripten_glClear;
var _glClearColor = _emscripten_glClearColor;
var _glClearDepthf = _emscripten_glClearDepthf;
var _glClearStencil = _emscripten_glClearStencil;
var _glColorMask = _emscripten_glColorMask;
var _glCompileShader = _emscripten_glCompileShader;
var _glCopyTexSubImage2D = _emscripten_glCopyTexSubImage2D;
var _glCreateProgram = _emscripten_glCreateProgram;
var _glCreateShader = _emscripten_glCreateShader;
var _glCullFace = _emscripten_glCullFace;
var _glDeleteBuffers = _emscripten_glDeleteBuffers;
var _glDeleteFramebuffers = _emscripten_glDeleteFramebuffers;
var _glDeleteProgram = _emscripten_glDeleteProgram;
var _glDeleteRenderbuffers = _emscripten_glDeleteRenderbuffers;
var _glDeleteSamplers = _emscripten_glDeleteSamplers;
var _glDeleteShader = _emscripten_glDeleteShader;
var _glDeleteTextures = _emscripten_glDeleteTextures;
var _glDeleteVertexArrays = _emscripten_glDeleteVertexArrays;
var _glDepthFunc = _emscripten_glDepthFunc;
var _glDepthMask = _emscripten_glDepthMask;
var _glDepthRangef = _emscripten_glDepthRangef;
var _glDisable = _emscripten_glDisable;
var _glDisableVertexAttribArray = _emscripten_glDisableVertexAttribArray;
var _glDrawArraysInstanced = _emscripten_glDrawArraysInstanced;
var _glDrawBuffers = _emscripten_glDrawBuffers;
var _glDrawElementsInstanced = _emscripten_glDrawElementsInstanced;
var _glEnable = _emscripten_glEnable;
var _glEnableVertexAttribArray = _emscripten_glEnableVertexAttribArray;
var _glFramebufferRenderbuffer = _emscripten_glFramebufferRenderbuffer;
var _glFramebufferTexture2D = _emscripten_glFramebufferTexture2D;
var _glFrontFace = _emscripten_glFrontFace;
var _glGenBuffers = _emscripten_glGenBuffers;
var _glGenFramebuffers = _emscripten_glGenFramebuffers;
var _glGenRenderbuffers = _emscripten_glGenRenderbuffers;
var _glGenSamplers = _emscripten_glGenSamplers;
var _glGenTextures = _emscripten_glGenTextures;
var _glGenVertexArrays = _emscripten_glGenVertexArrays;
var _glGenerateMipmap = _emscripten_glGenerateMipmap;
var _glGetIntegerv = _emscripten_glGetIntegerv;
var _glGetProgramInfoLog = _emscripten_glGetProgramInfoLog;
var _glGetProgramiv = _emscripten_glGetProgramiv;
var _glGetShaderInfoLog = _emscripten_glGetShaderInfoLog;
var _glGetShaderiv = _emscripten_glGetShaderiv;
var _glGetStringi = _emscripten_glGetStringi;
var _glGetUniformBlockIndex = _emscripten_glGetUniformBlockIndex;
var _glGetUniformLocation = _emscripten_glGetUniformLocation;
var _glLinkProgram = _emscripten_glLinkProgram;
var _glPixelStorei = _emscripten_glPixelStorei;
var _glPolygonOffset = _emscripten_glPolygonOffset;
var _glReadPixels = _emscripten_glReadPixels;
var _glRenderbufferStorage = _emscripten_glRenderbufferStorage;
var _glSamplerParameterf = _emscripten_glSamplerParameterf;
var _glSamplerParameteri = _emscripten_glSamplerParameteri;
var _glScissor = _emscripten_glScissor;
var _glShaderSource = _emscripten_glShaderSource;
var _glStencilFunc = _emscripten_glStencilFunc;
var _glStencilMask = _emscripten_glStencilMask;
var _glStencilOp = _emscripten_glStencilOp;
var _glTexImage2D = _emscripten_glTexImage2D;
var _glTexParameteri = _emscripten_glTexParameteri;
var _glTexSubImage2D = _emscripten_glTexSubImage2D;
var _glUniform1i = _emscripten_glUniform1i;
var _glUniformBlockBinding = _emscripten_glUniformBlockBinding;
var _glUseProgram = _emscripten_glUseProgram;
var _glVertexAttribDivisor = _emscripten_glVertexAttribDivisor;
var _glVertexAttribPointer = _emscripten_glVertexAttribPointer;
var _glViewport = _emscripten_glViewport;
var _llvm_eh_typeid_for = (type) => type;
var dynCall = (sig, ptr, args = [], promising = false) => {
  var func = getWasmTableEntry(ptr);
  var rtn = func(...args);
  function convert(rtn) {
    return rtn;
  }
  return convert(rtn);
};
var FS_createPath = (...args) => FS.createPath(...args);
var FS_unlink = (...args) => FS.unlink(...args);
var FS_createLazyFile = (...args) => FS.createLazyFile(...args);
var FS_createDevice = (...args) => FS.createDevice(...args);
var createContext = Browser.createContext;
FS.createPreloadedFile = FS_createPreloadedFile;
FS.preloadFile = FS_preloadFile;
FS.staticInit();
Module["requestAnimationFrame"] = MainLoop.requestAnimationFrame;
Module["pauseMainLoop"] = MainLoop.pause;
Module["resumeMainLoop"] = MainLoop.resume;
MainLoop.init();
registerPreMainLoop(() => GL.newRenderingFrameStarted());
for (let i = 0; i < 32; ++i) tempFixedLengthArray.push(new Array(i));
var miniTempWebGLFloatBuffersStorage = new Float32Array(288);
for (var i = 0; i <= 288; ++i) {
  miniTempWebGLFloatBuffers[i] = miniTempWebGLFloatBuffersStorage.subarray(0, i);
}
var miniTempWebGLIntBuffersStorage = new Int32Array(288);
for (var i = 0; i <= 288; ++i) {
  miniTempWebGLIntBuffers[i] = miniTempWebGLIntBuffersStorage.subarray(0, i);
}
Fetch.init();
{
  if (Module["noExitRuntime"]) noExitRuntime = Module["noExitRuntime"];
  if (Module["preloadPlugins"]) preloadPlugins = Module["preloadPlugins"];
  if (Module["print"]) out = Module["print"];
  if (Module["printErr"]) err = Module["printErr"];
  if (Module["wasmBinary"]) wasmBinary = Module["wasmBinary"];
  if (Module["arguments"]) arguments_ = Module["arguments"];
  if (Module["thisProgram"]) thisProgram = Module["thisProgram"];
  if (Module["preInit"]) {
    if (typeof Module["preInit"] == "function") Module["preInit"] = [Module["preInit"]];
    while (Module["preInit"].length > 0) {
      Module["preInit"].shift()();
    }
  }
}
Module["addRunDependency"] = addRunDependency;
Module["removeRunDependency"] = removeRunDependency;
Module["createContext"] = createContext;
Module["FS_preloadFile"] = FS_preloadFile;
Module["FS_unlink"] = FS_unlink;
Module["FS_createPath"] = FS_createPath;
Module["FS_createDevice"] = FS_createDevice;
Module["FS"] = FS;
Module["FS_createDataFile"] = FS_createDataFile;
Module["FS_createLazyFile"] = FS_createLazyFile;
var ASM_CONSTS = {
  979812: ($0) => {
    document.body.dataset.stateCutscene = $0;
  },
  979858: ($0) => {
    document.body.dataset.stateCutscene = $0;
  },
  979904: ($0) => {
    if (UTF8ToString($0) === "mobring") {
      document.body.dataset.stateMobring = 1;
      setTimeout(function () {
        document.body.dataset.stateMobring = 0;
      }, 2200);
    }
  },
  980063: ($0) => {
    document.body.dataset.stateCutscene = $0;
  },
  980109: ($0) => {
    document.body.dataset.stateCutscene = $0;
  },
  980155: () => {
    Module.hotelMission();
  },
  980182: ($0, $1) =>
    UTF8ToString($0) === location.host ||
    UTF8ToString($1) === location.hostname ||
    location.host.startsWith("localhost") ||
    location.host.startsWith("127.0.0.1") ||
    location.host.startsWith("192.168."),
  980393: () => {
    Module.syncdone = 0;
    FS.syncfs(function (err) {
      if (err) {
        console.log("FS.syncfs error:", err);
      }
      Module.syncdone = 1;
    });
  },
  980516: ($0) => {
    document.body.dataset.stateMenu = $0;
  },
  980558: ($0) => {
    document.body.dataset.stateMenu = $0;
  },
  980600: ($0) => {
    document.body.dataset.stateMenu = $0;
  },
  980642: ($0) => {
    document.body.dataset.stateDownload = $0;
  },
  980688: ($0, $1, $2, $3, $4, $5, $6, $7, $8) => {
    document.body.dataset.stateCar = $0;
    document.body.dataset.stateJob = $1;
    document.body.dataset.statePanzer = $2;
    document.body.dataset.stateHunter = $3;
    document.body.dataset.stateBike = $4;
    document.body.dataset.stateScopeMode = $5;
    document.body.dataset.stateGun = $6;
    document.body.dataset.stateScopeGun = $7;
    document.body.dataset.stateCarWithWeapon = $8;
  },
  981053: () => {
    Module.syncRevcIni();
  },
  981079: ($0) => {
    document.body.dataset.stateCarGun = $0;
  },
  981123: ($0) => {
    document.body.dataset.stateCarGun = $0;
  },
  981167: () => {
    Module.syncdone = 0;
    FS.syncfs(function (err) {
      if (err) {
        console.log("FS.syncfs error:", err);
      }
      Module.syncdone = 1;
    });
  },
  981290: ($0) => {
    const dir = UTF8ToString($0);
    FS.mkdir(dir);
    FS.mount(IDBFS, {}, dir);
    Module.syncdone = 0;
    FS.syncfs(true, function (err) {
      if (err) {
        console.log("FS.syncfs error:", err);
      }
      Module.syncdone = 1;
    });
  },
  981494: () => {
    Module.mainCalled();
  },
  981519: () => {
    var canvas = Module?.canvas || document.getElementById("canvas");
    if (!canvas) return 0;
    var plElement = document.pointerLockElement || document.mozPointerLockElement || document.webkitPointerLockElement;
    return plElement === canvas ? 1 : 0;
  },
  981767: ($0) => {
    const url = UTF8ToString($0);
    if (!Module.fetchedUrls) {
      Module.fetchedUrls = {};
      Module.printFetchedUrls = () => {
        let payload = "";
        for (const key of Object.keys(Module.fetchedUrls)) {
          payload += key + "\n";
        }
        console.log(payload);
      };
    }
    if (!url.endsWith(".mp3") && !url.endsWith(".wav")) {
      Module.fetchedUrls[url] = 1;
    }
  },
  982095: () => {
    if (typeof AudioContext !== "undefined") {
      return true;
    } else if (typeof webkitAudioContext !== "undefined") {
      return true;
    }
    return false;
  },
  982242: () => {
    if (typeof navigator.mediaDevices !== "undefined" && typeof navigator.mediaDevices.getUserMedia !== "undefined") {
      return true;
    } else if (typeof navigator.webkitGetUserMedia !== "undefined") {
      return true;
    }
    return false;
  },
  982476: ($0) => {
    if (typeof Module["SDL2"] === "undefined") {
      Module["SDL2"] = {};
    }
    var SDL2 = Module["SDL2"];
    if (!$0) {
      SDL2.audio = {};
    } else {
      SDL2.capture = {};
    }
    if (!SDL2.audioContext) {
      if (typeof AudioContext !== "undefined") {
        SDL2.audioContext = new AudioContext();
      } else if (typeof webkitAudioContext !== "undefined") {
        SDL2.audioContext = new webkitAudioContext();
      }
      if (SDL2.audioContext) {
        if (typeof navigator.userActivation === "undefined") {
          autoResumeAudioContext(SDL2.audioContext);
        }
      }
    }
    return SDL2.audioContext === undefined ? -1 : 0;
  },
  983028: () => {
    var SDL2 = Module["SDL2"];
    return SDL2.audioContext.sampleRate;
  },
  983096: ($0, $1, $2, $3) => {
    var SDL2 = Module["SDL2"];
    var have_microphone = function (stream) {
      if (SDL2.capture.silenceTimer !== undefined) {
        clearInterval(SDL2.capture.silenceTimer);
        SDL2.capture.silenceTimer = undefined;
        SDL2.capture.silenceBuffer = undefined;
      }
      SDL2.capture.mediaStreamNode = SDL2.audioContext.createMediaStreamSource(stream);
      SDL2.capture.scriptProcessorNode = SDL2.audioContext.createScriptProcessor($1, $0, 1);
      SDL2.capture.scriptProcessorNode.onaudioprocess = function (audioProcessingEvent) {
        if (SDL2 === undefined || SDL2.capture === undefined) {
          return;
        }
        audioProcessingEvent.outputBuffer.getChannelData(0).fill(0);
        SDL2.capture.currentCaptureBuffer = audioProcessingEvent.inputBuffer;
        dynCall("vp", $2, [$3]);
      };
      SDL2.capture.mediaStreamNode.connect(SDL2.capture.scriptProcessorNode);
      SDL2.capture.scriptProcessorNode.connect(SDL2.audioContext.destination);
      SDL2.capture.stream = stream;
    };
    var no_microphone = function (error) {};
    SDL2.capture.silenceBuffer = SDL2.audioContext.createBuffer($0, $1, SDL2.audioContext.sampleRate);
    SDL2.capture.silenceBuffer.getChannelData(0).fill(0);
    var silence_callback = function () {
      SDL2.capture.currentCaptureBuffer = SDL2.capture.silenceBuffer;
      dynCall("vp", $2, [$3]);
    };
    SDL2.capture.silenceTimer = setInterval(silence_callback, ($1 / SDL2.audioContext.sampleRate) * 1e3);
    if (navigator.mediaDevices !== undefined && navigator.mediaDevices.getUserMedia !== undefined) {
      navigator.mediaDevices.getUserMedia({ audio: true, video: false }).then(have_microphone).catch(no_microphone);
    } else if (navigator.webkitGetUserMedia !== undefined) {
      navigator.webkitGetUserMedia({ audio: true, video: false }, have_microphone, no_microphone);
    }
  },
  984789: ($0, $1, $2, $3) => {
    var SDL2 = Module["SDL2"];
    SDL2.audio.scriptProcessorNode = SDL2.audioContext["createScriptProcessor"]($1, 0, $0);
    SDL2.audio.scriptProcessorNode["onaudioprocess"] = function (e) {
      if (SDL2 === undefined || SDL2.audio === undefined) {
        return;
      }
      if (SDL2.audio.silenceTimer !== undefined) {
        clearInterval(SDL2.audio.silenceTimer);
        SDL2.audio.silenceTimer = undefined;
        SDL2.audio.silenceBuffer = undefined;
      }
      SDL2.audio.currentOutputBuffer = e["outputBuffer"];
      dynCall("vp", $2, [$3]);
    };
    SDL2.audio.scriptProcessorNode["connect"](SDL2.audioContext["destination"]);
    if (SDL2.audioContext.state === "suspended") {
      SDL2.audio.silenceBuffer = SDL2.audioContext.createBuffer($0, $1, SDL2.audioContext.sampleRate);
      SDL2.audio.silenceBuffer.getChannelData(0).fill(0);
      var silence_callback = function () {
        if (typeof navigator.userActivation !== "undefined") {
          if (navigator.userActivation.hasBeenActive) {
            SDL2.audioContext.resume();
          }
        }
        SDL2.audio.currentOutputBuffer = SDL2.audio.silenceBuffer;
        dynCall("vp", $2, [$3]);
        SDL2.audio.currentOutputBuffer = undefined;
      };
      SDL2.audio.silenceTimer = setInterval(silence_callback, ($1 / SDL2.audioContext.sampleRate) * 1e3);
    }
  },
  985964: ($0, $1) => {
    var SDL2 = Module["SDL2"];
    var numChannels = SDL2.capture.currentCaptureBuffer.numberOfChannels;
    for (var c = 0; c < numChannels; ++c) {
      var channelData = SDL2.capture.currentCaptureBuffer.getChannelData(c);
      if (channelData.length != $1) {
        throw (
          "Web Audio capture buffer length mismatch! Destination size: " +
          channelData.length +
          " samples vs expected " +
          $1 +
          " samples!"
        );
      }
      if (numChannels == 1) {
        for (var j = 0; j < $1; ++j) {
          setValue($0 + j * 4, channelData[j], "float");
        }
      } else {
        for (var j = 0; j < $1; ++j) {
          setValue($0 + (j * numChannels + c) * 4, channelData[j], "float");
        }
      }
    }
  },
  986569: ($0, $1) => {
    var SDL2 = Module["SDL2"];
    var buf = $0 >>> 2;
    var numChannels = SDL2.audio.currentOutputBuffer["numberOfChannels"];
    for (var c = 0; c < numChannels; ++c) {
      var channelData = SDL2.audio.currentOutputBuffer["getChannelData"](c);
      if (channelData.length != $1) {
        throw (
          "Web Audio output buffer length mismatch! Destination size: " +
          channelData.length +
          " samples vs expected " +
          $1 +
          " samples!"
        );
      }
      for (var j = 0; j < $1; ++j) {
        channelData[j] = HEAPF32[buf + (j * numChannels + c)];
      }
    }
  },
  987058: ($0) => {
    var SDL2 = Module["SDL2"];
    if ($0) {
      if (SDL2.capture.silenceTimer !== undefined) {
        clearInterval(SDL2.capture.silenceTimer);
      }
      if (SDL2.capture.stream !== undefined) {
        var tracks = SDL2.capture.stream.getAudioTracks();
        for (var i = 0; i < tracks.length; i++) {
          SDL2.capture.stream.removeTrack(tracks[i]);
        }
      }
      if (SDL2.capture.scriptProcessorNode !== undefined) {
        SDL2.capture.scriptProcessorNode.onaudioprocess = function (audioProcessingEvent) {};
        SDL2.capture.scriptProcessorNode.disconnect();
      }
      if (SDL2.capture.mediaStreamNode !== undefined) {
        SDL2.capture.mediaStreamNode.disconnect();
      }
      SDL2.capture = undefined;
    } else {
      if (SDL2.audio.scriptProcessorNode != undefined) {
        SDL2.audio.scriptProcessorNode.disconnect();
      }
      if (SDL2.audio.silenceTimer !== undefined) {
        clearInterval(SDL2.audio.silenceTimer);
      }
      SDL2.audio = undefined;
    }
    if (SDL2.audioContext !== undefined && SDL2.audio === undefined && SDL2.capture === undefined) {
      SDL2.audioContext.close();
      SDL2.audioContext = undefined;
    }
  },
  988064: ($0, $1, $2) => {
    var w = $0;
    var h = $1;
    var pixels = $2;
    if (!Module["SDL2"]) Module["SDL2"] = {};
    var SDL2 = Module["SDL2"];
    if (SDL2.ctxCanvas !== Module["canvas"]) {
      SDL2.ctx = Browser.createContext(Module["canvas"], false, true);
      SDL2.ctxCanvas = Module["canvas"];
    }
    if (SDL2.w !== w || SDL2.h !== h || SDL2.imageCtx !== SDL2.ctx) {
      SDL2.image = SDL2.ctx.createImageData(w, h);
      SDL2.w = w;
      SDL2.h = h;
      SDL2.imageCtx = SDL2.ctx;
    }
    var data = SDL2.image.data;
    var src = pixels / 4;
    var dst = 0;
    var num;
    if (typeof CanvasPixelArray !== "undefined" && data instanceof CanvasPixelArray) {
      num = data.length;
      while (dst < num) {
        var val = HEAP32[src];
        data[dst] = val & 255;
        data[dst + 1] = (val >> 8) & 255;
        data[dst + 2] = (val >> 16) & 255;
        data[dst + 3] = 255;
        src++;
        dst += 4;
      }
    } else {
      if (SDL2.data32Data !== data) {
        SDL2.data32 = new Int32Array(data.buffer);
        SDL2.data8 = new Uint8Array(data.buffer);
        SDL2.data32Data = data;
      }
      var data32 = SDL2.data32;
      num = data32.length;
      data32.set(HEAP32.subarray(src, src + num));
      var data8 = SDL2.data8;
      var i = 3;
      var j = i + 4 * num;
      if (num % 8 == 0) {
        while (i < j) {
          data8[i] = 255;
          i = (i + 4) | 0;
          data8[i] = 255;
          i = (i + 4) | 0;
          data8[i] = 255;
          i = (i + 4) | 0;
          data8[i] = 255;
          i = (i + 4) | 0;
          data8[i] = 255;
          i = (i + 4) | 0;
          data8[i] = 255;
          i = (i + 4) | 0;
          data8[i] = 255;
          i = (i + 4) | 0;
          data8[i] = 255;
          i = (i + 4) | 0;
        }
      } else {
        while (i < j) {
          data8[i] = 255;
          i = (i + 4) | 0;
        }
      }
    }
    SDL2.ctx.putImageData(SDL2.image, 0, 0);
  },
  989530: ($0, $1, $2, $3, $4) => {
    var w = $0;
    var h = $1;
    var hot_x = $2;
    var hot_y = $3;
    var pixels = $4;
    var canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    var ctx = canvas.getContext("2d");
    var image = ctx.createImageData(w, h);
    var data = image.data;
    var src = pixels / 4;
    var dst = 0;
    var num;
    if (typeof CanvasPixelArray !== "undefined" && data instanceof CanvasPixelArray) {
      num = data.length;
      while (dst < num) {
        var val = HEAP32[src];
        data[dst] = val & 255;
        data[dst + 1] = (val >> 8) & 255;
        data[dst + 2] = (val >> 16) & 255;
        data[dst + 3] = (val >> 24) & 255;
        src++;
        dst += 4;
      }
    } else {
      var data32 = new Int32Array(data.buffer);
      num = data32.length;
      data32.set(HEAP32.subarray(src, src + num));
    }
    ctx.putImageData(image, 0, 0);
    var url =
      hot_x === 0 && hot_y === 0
        ? "url(" + canvas.toDataURL() + "), auto"
        : "url(" + canvas.toDataURL() + ") " + hot_x + " " + hot_y + ", auto";
    var urlBuf = _malloc(url.length + 1);
    stringToUTF8(url, urlBuf, url.length + 1);
    return urlBuf;
  },
  990518: ($0) => {
    if (Module["canvas"]) {
      Module["canvas"].style["cursor"] = UTF8ToString($0);
    }
  },
  990601: () => {
    if (Module["canvas"]) {
      Module["canvas"].style["cursor"] = "none";
    }
  },
  990670: () => window.innerWidth,
  990700: () => window.innerHeight,
  990731: ($0) => {
    if (!$0) {
      AL.alcErr = 40964;
      return 1;
    }
  },
  990779: ($0) => {
    if (!AL.currentCtx) {
      err("alGetProcAddress() called without a valid context");
      return 1;
    }
    if (!$0) {
      AL.currentCtx.err = 40963;
      return 1;
    }
  }
};
var _malloc,
  _free,
  _realloc,
  _main,
  _setThrew,
  __emscripten_tempret_set,
  __emscripten_stack_restore,
  __emscripten_stack_alloc,
  _emscripten_stack_get_current,
  ___cxa_decrement_exception_refcount,
  ___cxa_increment_exception_refcount,
  ___cxa_can_catch,
  ___cxa_get_exception_ptr,
  memory,
  __indirect_function_table,
  wasmMemory,
  wasmTable;
function assignWasmExports(wasmExports) {
  _malloc = wasmExports["zk"];
  _free = wasmExports["Ak"];
  _realloc = wasmExports["Bk"];
  _main = Module["_main"] = wasmExports["Ck"];
  _setThrew = wasmExports["Dk"];
  __emscripten_tempret_set = wasmExports["Ek"];
  __emscripten_stack_restore = wasmExports["Fk"];
  __emscripten_stack_alloc = wasmExports["Gk"];
  _emscripten_stack_get_current = wasmExports["Hk"];
  ___cxa_decrement_exception_refcount = wasmExports["Ik"];
  ___cxa_increment_exception_refcount = wasmExports["Jk"];
  ___cxa_can_catch = wasmExports["Kk"];
  ___cxa_get_exception_ptr = wasmExports["Lk"];
  memory = wasmMemory = wasmExports["wk"];
  __indirect_function_table = wasmTable = wasmExports["yk"];
}
var wasmImports = {
  n: ___cxa_begin_catch,
  z: ___cxa_end_catch,
  a: ___cxa_find_matching_catch_2,
  f: ___cxa_find_matching_catch_3,
  gc: ___cxa_rethrow,
  h: ___cxa_throw,
  fc: ___cxa_uncaught_exceptions,
  c: ___resumeException,
  vk: ___syscall__newselect,
  uk: ___syscall_chdir,
  tk: ___syscall_faccessat,
  H: ___syscall_fcntl64,
  sk: ___syscall_getcwd,
  rk: ___syscall_getdents64,
  qk: ___syscall_ioctl,
  pk: ___syscall_lstat64,
  ok: ___syscall_mkdirat,
  nk: ___syscall_newfstatat,
  ec: ___syscall_openat,
  mk: ___syscall_readlinkat,
  lk: ___syscall_stat64,
  kk: ___syscall_unlinkat,
  fk: __abort_js,
  ek: __gmtime_js,
  dk: __localtime_js,
  ck: __mktime_js,
  bk: __tzset_js,
  ak: _alBuffer3f,
  $j: _alBuffer3i,
  ia: _alBufferData,
  _j: _alBufferf,
  Zj: _alBufferfv,
  Yj: _alBufferi,
  bc: _alBufferiv,
  ha: _alDeleteBuffers,
  Ia: _alDeleteSources,
  Xj: _alDisable,
  ac: _alDistanceModel,
  Wj: _alDopplerFactor,
  Vj: _alDopplerVelocity,
  Uj: _alEnable,
  ga: _alGenBuffers,
  Ha: _alGenSources,
  Tj: _alGetBoolean,
  Sj: _alGetBooleanv,
  Rj: _alGetBuffer3f,
  Qj: _alGetBuffer3i,
  Pj: _alGetBufferf,
  Oj: _alGetBufferfv,
  Nj: _alGetBufferi,
  Mj: _alGetBufferiv,
  Lj: _alGetDouble,
  Kj: _alGetDoublev,
  $b: _alGetEnumValue,
  Jj: _alGetError,
  Ij: _alGetFloat,
  Hj: _alGetFloatv,
  Gj: _alGetInteger,
  Fj: _alGetIntegerv,
  Ej: _alGetListener3f,
  Dj: _alGetListener3i,
  Cj: _alGetListenerf,
  Bj: _alGetListenerfv,
  Aj: _alGetListeneri,
  zj: _alGetListeneriv,
  yj: _alGetSource3f,
  xj: _alGetSource3i,
  _b: _alGetSourcef,
  wj: _alGetSourcefv,
  u: _alGetSourcei,
  vj: _alGetSourceiv,
  Zb: _alGetString,
  Ga: _alIsBuffer,
  uj: _alIsEnabled,
  tj: _alIsExtensionPresent,
  sj: _alIsSource,
  Fa: _alListener3f,
  rj: _alListener3i,
  Yb: _alListenerf,
  Xb: _alListenerfv,
  qj: _alListeneri,
  pj: _alListeneriv,
  D: _alSource3f,
  ra: _alSource3i,
  Ea: _alSourcePause,
  oj: _alSourcePausev,
  R: _alSourcePlay,
  nj: _alSourcePlayv,
  G: _alSourceQueueBuffers,
  mj: _alSourceRewind,
  lj: _alSourceRewindv,
  $: _alSourceStop,
  kj: _alSourceStopv,
  fa: _alSourceUnqueueBuffers,
  v: _alSourcef,
  jj: _alSourcefv,
  y: _alSourcei,
  ij: _alSourceiv,
  hj: _alSpeedOfSound,
  Wb: _alcCloseDevice,
  Vb: _alcCreateContext,
  Ub: _alcDestroyContext,
  gj: _alcGetIntegerv,
  qa: _alcIsExtensionPresent,
  Da: _alcMakeContextCurrent,
  Tb: _alcOpenDevice,
  fj: _alcSuspendContext,
  jk: _clock_time_get,
  ej: _eglBindAPI,
  Sb: _eglChooseConfig,
  Rb: _eglCreateContext,
  Qb: _eglCreateWindowSurface,
  dj: _eglDestroyContext,
  cj: _eglDestroySurface,
  bj: _eglGetConfigAttrib,
  Ca: _eglGetDisplay,
  aj: _eglGetError,
  Pb: _eglInitialize,
  Ob: _eglMakeCurrent,
  $i: _eglQueryString,
  Nb: _eglSwapBuffers,
  _i: _eglSwapInterval,
  Zi: _eglTerminate,
  Yi: _eglWaitGL,
  Xi: _eglWaitNative,
  q: _emscripten_asm_const_int,
  B: _emscripten_asm_const_int_sync_on_main_thread,
  Wi: _emscripten_asm_const_ptr_sync_on_main_thread,
  Mb: _emscripten_date_now,
  Lb: _emscripten_err,
  Vi: _emscripten_exit_fullscreen,
  Ui: _emscripten_exit_pointerlock,
  Ti: _emscripten_fetch_free,
  ea: _emscripten_get_device_pixel_ratio,
  U: _emscripten_get_element_css_size,
  Kb: _emscripten_get_gamepad_status,
  Jb: _emscripten_get_now,
  Si: _emscripten_get_num_gamepads,
  Ri: _emscripten_get_screen_size,
  Qi: _emscripten_glActiveTexture,
  Pi: _emscripten_glAttachShader,
  Oi: _emscripten_glBeginQuery,
  Ni: _emscripten_glBeginQueryEXT,
  Mi: _emscripten_glBeginTransformFeedback,
  Li: _emscripten_glBindAttribLocation,
  Ki: _emscripten_glBindBuffer,
  Ji: _emscripten_glBindBufferBase,
  Ii: _emscripten_glBindBufferRange,
  Hi: _emscripten_glBindFramebuffer,
  Gi: _emscripten_glBindRenderbuffer,
  Fi: _emscripten_glBindSampler,
  Ei: _emscripten_glBindTexture,
  Di: _emscripten_glBindTransformFeedback,
  Ci: _emscripten_glBindVertexArray,
  Bi: _emscripten_glBindVertexArrayOES,
  Ai: _emscripten_glBlendColor,
  zi: _emscripten_glBlendEquation,
  yi: _emscripten_glBlendEquationSeparate,
  xi: _emscripten_glBlendFunc,
  wi: _emscripten_glBlendFuncSeparate,
  vi: _emscripten_glBlitFramebuffer,
  ui: _emscripten_glBufferData,
  ti: _emscripten_glBufferSubData,
  si: _emscripten_glCheckFramebufferStatus,
  ri: _emscripten_glClear,
  qi: _emscripten_glClearBufferfi,
  pi: _emscripten_glClearBufferfv,
  oi: _emscripten_glClearBufferiv,
  ni: _emscripten_glClearBufferuiv,
  mi: _emscripten_glClearColor,
  li: _emscripten_glClearDepthf,
  ki: _emscripten_glClearStencil,
  ji: _emscripten_glClientWaitSync,
  ii: _emscripten_glClipControlEXT,
  hi: _emscripten_glColorMask,
  gi: _emscripten_glCompileShader,
  fi: _emscripten_glCompressedTexImage2D,
  ei: _emscripten_glCompressedTexImage3D,
  di: _emscripten_glCompressedTexSubImage2D,
  ci: _emscripten_glCompressedTexSubImage3D,
  bi: _emscripten_glCopyBufferSubData,
  ai: _emscripten_glCopyTexImage2D,
  $h: _emscripten_glCopyTexSubImage2D,
  _h: _emscripten_glCopyTexSubImage3D,
  Zh: _emscripten_glCreateProgram,
  Yh: _emscripten_glCreateShader,
  Xh: _emscripten_glCullFace,
  Wh: _emscripten_glDeleteBuffers,
  Vh: _emscripten_glDeleteFramebuffers,
  Uh: _emscripten_glDeleteProgram,
  Th: _emscripten_glDeleteQueries,
  Sh: _emscripten_glDeleteQueriesEXT,
  Rh: _emscripten_glDeleteRenderbuffers,
  Qh: _emscripten_glDeleteSamplers,
  Ph: _emscripten_glDeleteShader,
  Oh: _emscripten_glDeleteSync,
  Nh: _emscripten_glDeleteTextures,
  Mh: _emscripten_glDeleteTransformFeedbacks,
  Lh: _emscripten_glDeleteVertexArrays,
  Kh: _emscripten_glDeleteVertexArraysOES,
  Jh: _emscripten_glDepthFunc,
  Ih: _emscripten_glDepthMask,
  Hh: _emscripten_glDepthRangef,
  Gh: _emscripten_glDetachShader,
  Fh: _emscripten_glDisable,
  Eh: _emscripten_glDisableVertexAttribArray,
  Dh: _emscripten_glDrawArrays,
  Ch: _emscripten_glDrawArraysInstanced,
  Bh: _emscripten_glDrawArraysInstancedANGLE,
  Ah: _emscripten_glDrawArraysInstancedARB,
  zh: _emscripten_glDrawArraysInstancedEXT,
  yh: _emscripten_glDrawArraysInstancedNV,
  xh: _emscripten_glDrawBuffers,
  wh: _emscripten_glDrawBuffersEXT,
  vh: _emscripten_glDrawBuffersWEBGL,
  uh: _emscripten_glDrawElements,
  th: _emscripten_glDrawElementsInstanced,
  sh: _emscripten_glDrawElementsInstancedANGLE,
  rh: _emscripten_glDrawElementsInstancedARB,
  qh: _emscripten_glDrawElementsInstancedEXT,
  ph: _emscripten_glDrawElementsInstancedNV,
  oh: _emscripten_glDrawRangeElements,
  nh: _emscripten_glEnable,
  mh: _emscripten_glEnableVertexAttribArray,
  lh: _emscripten_glEndQuery,
  kh: _emscripten_glEndQueryEXT,
  jh: _emscripten_glEndTransformFeedback,
  ih: _emscripten_glFenceSync,
  hh: _emscripten_glFinish,
  gh: _emscripten_glFlush,
  fh: _emscripten_glFlushMappedBufferRange,
  eh: _emscripten_glFramebufferRenderbuffer,
  dh: _emscripten_glFramebufferTexture2D,
  ch: _emscripten_glFramebufferTextureLayer,
  bh: _emscripten_glFrontFace,
  ah: _emscripten_glGenBuffers,
  $g: _emscripten_glGenFramebuffers,
  _g: _emscripten_glGenQueries,
  Zg: _emscripten_glGenQueriesEXT,
  Yg: _emscripten_glGenRenderbuffers,
  Xg: _emscripten_glGenSamplers,
  Wg: _emscripten_glGenTextures,
  Vg: _emscripten_glGenTransformFeedbacks,
  Ug: _emscripten_glGenVertexArrays,
  Tg: _emscripten_glGenVertexArraysOES,
  Sg: _emscripten_glGenerateMipmap,
  Rg: _emscripten_glGetActiveAttrib,
  Qg: _emscripten_glGetActiveUniform,
  Pg: _emscripten_glGetActiveUniformBlockName,
  Og: _emscripten_glGetActiveUniformBlockiv,
  Ng: _emscripten_glGetActiveUniformsiv,
  Mg: _emscripten_glGetAttachedShaders,
  Lg: _emscripten_glGetAttribLocation,
  Kg: _emscripten_glGetBooleanv,
  Jg: _emscripten_glGetBufferParameteri64v,
  Ig: _emscripten_glGetBufferParameteriv,
  Hg: _emscripten_glGetBufferPointerv,
  Gg: _emscripten_glGetError,
  Fg: _emscripten_glGetFloatv,
  Eg: _emscripten_glGetFragDataLocation,
  Dg: _emscripten_glGetFramebufferAttachmentParameteriv,
  Cg: _emscripten_glGetInteger64i_v,
  Bg: _emscripten_glGetInteger64v,
  Ag: _emscripten_glGetIntegeri_v,
  zg: _emscripten_glGetIntegerv,
  yg: _emscripten_glGetInternalformativ,
  xg: _emscripten_glGetProgramBinary,
  wg: _emscripten_glGetProgramInfoLog,
  vg: _emscripten_glGetProgramiv,
  ug: _emscripten_glGetQueryObjecti64vEXT,
  tg: _emscripten_glGetQueryObjectivEXT,
  sg: _emscripten_glGetQueryObjectui64vEXT,
  rg: _emscripten_glGetQueryObjectuiv,
  qg: _emscripten_glGetQueryObjectuivEXT,
  pg: _emscripten_glGetQueryiv,
  og: _emscripten_glGetQueryivEXT,
  ng: _emscripten_glGetRenderbufferParameteriv,
  mg: _emscripten_glGetSamplerParameterfv,
  lg: _emscripten_glGetSamplerParameteriv,
  kg: _emscripten_glGetShaderInfoLog,
  jg: _emscripten_glGetShaderPrecisionFormat,
  ig: _emscripten_glGetShaderSource,
  hg: _emscripten_glGetShaderiv,
  gg: _emscripten_glGetString,
  fg: _emscripten_glGetStringi,
  eg: _emscripten_glGetSynciv,
  dg: _emscripten_glGetTexParameterfv,
  cg: _emscripten_glGetTexParameteriv,
  bg: _emscripten_glGetTransformFeedbackVarying,
  ag: _emscripten_glGetUniformBlockIndex,
  $f: _emscripten_glGetUniformIndices,
  _f: _emscripten_glGetUniformLocation,
  Zf: _emscripten_glGetUniformfv,
  Yf: _emscripten_glGetUniformiv,
  Xf: _emscripten_glGetUniformuiv,
  Wf: _emscripten_glGetVertexAttribIiv,
  Vf: _emscripten_glGetVertexAttribIuiv,
  Uf: _emscripten_glGetVertexAttribPointerv,
  Tf: _emscripten_glGetVertexAttribfv,
  Sf: _emscripten_glGetVertexAttribiv,
  Rf: _emscripten_glHint,
  Qf: _emscripten_glInvalidateFramebuffer,
  Pf: _emscripten_glInvalidateSubFramebuffer,
  Of: _emscripten_glIsBuffer,
  Nf: _emscripten_glIsEnabled,
  Mf: _emscripten_glIsFramebuffer,
  Lf: _emscripten_glIsProgram,
  Kf: _emscripten_glIsQuery,
  Jf: _emscripten_glIsQueryEXT,
  If: _emscripten_glIsRenderbuffer,
  Hf: _emscripten_glIsSampler,
  Gf: _emscripten_glIsShader,
  Ff: _emscripten_glIsSync,
  Ef: _emscripten_glIsTexture,
  Df: _emscripten_glIsTransformFeedback,
  Cf: _emscripten_glIsVertexArray,
  Bf: _emscripten_glIsVertexArrayOES,
  Af: _emscripten_glLineWidth,
  zf: _emscripten_glLinkProgram,
  yf: _emscripten_glMapBufferRange,
  xf: _emscripten_glPauseTransformFeedback,
  wf: _emscripten_glPixelStorei,
  vf: _emscripten_glPolygonModeWEBGL,
  uf: _emscripten_glPolygonOffset,
  tf: _emscripten_glPolygonOffsetClampEXT,
  sf: _emscripten_glProgramBinary,
  rf: _emscripten_glProgramParameteri,
  qf: _emscripten_glQueryCounterEXT,
  pf: _emscripten_glReadBuffer,
  of: _emscripten_glReadPixels,
  nf: _emscripten_glReleaseShaderCompiler,
  mf: _emscripten_glRenderbufferStorage,
  lf: _emscripten_glRenderbufferStorageMultisample,
  kf: _emscripten_glResumeTransformFeedback,
  jf: _emscripten_glSampleCoverage,
  hf: _emscripten_glSamplerParameterf,
  gf: _emscripten_glSamplerParameterfv,
  ff: _emscripten_glSamplerParameteri,
  ef: _emscripten_glSamplerParameteriv,
  df: _emscripten_glScissor,
  cf: _emscripten_glShaderBinary,
  bf: _emscripten_glShaderSource,
  af: _emscripten_glStencilFunc,
  $e: _emscripten_glStencilFuncSeparate,
  _e: _emscripten_glStencilMask,
  Ze: _emscripten_glStencilMaskSeparate,
  Ye: _emscripten_glStencilOp,
  Xe: _emscripten_glStencilOpSeparate,
  We: _emscripten_glTexImage2D,
  Ve: _emscripten_glTexImage3D,
  Ue: _emscripten_glTexParameterf,
  Te: _emscripten_glTexParameterfv,
  Se: _emscripten_glTexParameteri,
  Re: _emscripten_glTexParameteriv,
  Qe: _emscripten_glTexStorage2D,
  Pe: _emscripten_glTexStorage3D,
  Oe: _emscripten_glTexSubImage2D,
  Ne: _emscripten_glTexSubImage3D,
  Me: _emscripten_glTransformFeedbackVaryings,
  Le: _emscripten_glUniform1f,
  Ke: _emscripten_glUniform1fv,
  Je: _emscripten_glUniform1i,
  Ie: _emscripten_glUniform1iv,
  He: _emscripten_glUniform1ui,
  Ge: _emscripten_glUniform1uiv,
  Fe: _emscripten_glUniform2f,
  Ee: _emscripten_glUniform2fv,
  De: _emscripten_glUniform2i,
  Ce: _emscripten_glUniform2iv,
  Be: _emscripten_glUniform2ui,
  Ae: _emscripten_glUniform2uiv,
  ze: _emscripten_glUniform3f,
  ye: _emscripten_glUniform3fv,
  xe: _emscripten_glUniform3i,
  we: _emscripten_glUniform3iv,
  ve: _emscripten_glUniform3ui,
  ue: _emscripten_glUniform3uiv,
  te: _emscripten_glUniform4f,
  se: _emscripten_glUniform4fv,
  re: _emscripten_glUniform4i,
  qe: _emscripten_glUniform4iv,
  pe: _emscripten_glUniform4ui,
  oe: _emscripten_glUniform4uiv,
  ne: _emscripten_glUniformBlockBinding,
  me: _emscripten_glUniformMatrix2fv,
  le: _emscripten_glUniformMatrix2x3fv,
  ke: _emscripten_glUniformMatrix2x4fv,
  je: _emscripten_glUniformMatrix3fv,
  ie: _emscripten_glUniformMatrix3x2fv,
  he: _emscripten_glUniformMatrix3x4fv,
  ge: _emscripten_glUniformMatrix4fv,
  fe: _emscripten_glUniformMatrix4x2fv,
  ee: _emscripten_glUniformMatrix4x3fv,
  de: _emscripten_glUnmapBuffer,
  ce: _emscripten_glUseProgram,
  be: _emscripten_glValidateProgram,
  ae: _emscripten_glVertexAttrib1f,
  $d: _emscripten_glVertexAttrib1fv,
  _d: _emscripten_glVertexAttrib2f,
  Zd: _emscripten_glVertexAttrib2fv,
  Yd: _emscripten_glVertexAttrib3f,
  Xd: _emscripten_glVertexAttrib3fv,
  Wd: _emscripten_glVertexAttrib4f,
  Vd: _emscripten_glVertexAttrib4fv,
  Ud: _emscripten_glVertexAttribDivisor,
  Td: _emscripten_glVertexAttribDivisorANGLE,
  Sd: _emscripten_glVertexAttribDivisorARB,
  Rd: _emscripten_glVertexAttribDivisorEXT,
  Qd: _emscripten_glVertexAttribDivisorNV,
  Pd: _emscripten_glVertexAttribI4i,
  Od: _emscripten_glVertexAttribI4iv,
  Nd: _emscripten_glVertexAttribI4ui,
  Md: _emscripten_glVertexAttribI4uiv,
  Ld: _emscripten_glVertexAttribIPointer,
  Kd: _emscripten_glVertexAttribPointer,
  Jd: _emscripten_glViewport,
  Id: _emscripten_glWaitSync,
  Ba: _emscripten_has_asyncify,
  Hd: _emscripten_is_main_browser_thread,
  Gd: _emscripten_request_fullscreen_strategy,
  Ib: _emscripten_request_pointerlock,
  Fd: _emscripten_resize_heap,
  Ed: _emscripten_run_script_int,
  Hb: _emscripten_sample_gamepad_data,
  Gb: _emscripten_set_beforeunload_callback_on_thread,
  Fb: _emscripten_set_blur_callback_on_thread,
  da: _emscripten_set_canvas_element_size,
  Aa: _emscripten_set_element_css_size,
  Eb: _emscripten_set_focus_callback_on_thread,
  Db: _emscripten_set_fullscreenchange_callback_on_thread,
  Cb: _emscripten_set_gamepadconnected_callback_on_thread,
  Bb: _emscripten_set_gamepaddisconnected_callback_on_thread,
  Ab: _emscripten_set_keydown_callback_on_thread,
  zb: _emscripten_set_keypress_callback_on_thread,
  yb: _emscripten_set_keyup_callback_on_thread,
  Dd: _emscripten_set_main_loop,
  xb: _emscripten_set_mousedown_callback_on_thread,
  wb: _emscripten_set_mouseenter_callback_on_thread,
  vb: _emscripten_set_mouseleave_callback_on_thread,
  ub: _emscripten_set_mousemove_callback_on_thread,
  tb: _emscripten_set_mouseup_callback_on_thread,
  sb: _emscripten_set_pointerlockchange_callback_on_thread,
  rb: _emscripten_set_resize_callback_on_thread,
  qb: _emscripten_set_touchcancel_callback_on_thread,
  pb: _emscripten_set_touchend_callback_on_thread,
  ob: _emscripten_set_touchmove_callback_on_thread,
  nb: _emscripten_set_touchstart_callback_on_thread,
  mb: _emscripten_set_visibilitychange_callback_on_thread,
  lb: _emscripten_set_wheel_callback_on_thread,
  Cd: _emscripten_set_window_title,
  za: _emscripten_sleep,
  Bd: _emscripten_start_fetch,
  ik: _environ_get,
  hk: _environ_sizes_get,
  Ad: _exit,
  ja: _fd_close,
  dc: _fd_read,
  gk: _fd_seek,
  cc: _fd_write,
  zd: _glActiveTexture,
  kb: _glAttachShader,
  _: _glBindBuffer,
  yd: _glBindBufferBase,
  Z: _glBindFramebuffer,
  jb: _glBindRenderbuffer,
  xd: _glBindSampler,
  M: _glBindTexture,
  wd: _glBindVertexArray,
  vd: _glBlendEquationSeparate,
  ud: _glBlendFuncSeparate,
  Y: _glBufferData,
  td: _glClear,
  sd: _glClearColor,
  rd: _glClearDepthf,
  qd: _glClearStencil,
  pd: _glColorMask,
  od: _glCompileShader,
  nd: _glCopyTexSubImage2D,
  md: _glCreateProgram,
  ld: _glCreateShader,
  kd: _glCullFace,
  ya: _glDeleteBuffers,
  ib: _glDeleteFramebuffers,
  jd: _glDeleteProgram,
  id: _glDeleteRenderbuffers,
  hd: _glDeleteSamplers,
  hb: _glDeleteShader,
  gd: _glDeleteTextures,
  fd: _glDeleteVertexArrays,
  ed: _glDepthFunc,
  xa: _glDepthMask,
  dd: _glDepthRangef,
  Q: _glDisable,
  cd: _glDisableVertexAttribArray,
  bd: _glDrawArraysInstanced,
  ad: _glDrawBuffers,
  $c: _glDrawElementsInstanced,
  P: _glEnable,
  _c: _glEnableVertexAttribArray,
  Zc: _glFramebufferRenderbuffer,
  gb: _glFramebufferTexture2D,
  Yc: _glFrontFace,
  wa: _glGenBuffers,
  fb: _glGenFramebuffers,
  Xc: _glGenRenderbuffers,
  Wc: _glGenSamplers,
  Vc: _glGenTextures,
  Uc: _glGenVertexArrays,
  Tc: _glGenerateMipmap,
  C: _glGetIntegerv,
  Sc: _glGetProgramInfoLog,
  eb: _glGetProgramiv,
  Rc: _glGetShaderInfoLog,
  db: _glGetShaderiv,
  Qc: _glGetStringi,
  Pc: _glGetUniformBlockIndex,
  Oc: _glGetUniformLocation,
  Nc: _glLinkProgram,
  cb: _glPixelStorei,
  Mc: _glPolygonOffset,
  Lc: _glReadPixels,
  Kc: _glRenderbufferStorage,
  Jc: _glSamplerParameterf,
  pa: _glSamplerParameteri,
  bb: _glScissor,
  Ic: _glShaderSource,
  Hc: _glStencilFunc,
  Gc: _glStencilMask,
  Fc: _glStencilOp,
  Ec: _glTexImage2D,
  Dc: _glTexParameteri,
  Cc: _glTexSubImage2D,
  Bc: _glUniform1i,
  Ac: _glUniformBlockBinding,
  va: _glUseProgram,
  zc: _glVertexAttribDivisor,
  yc: _glVertexAttribPointer,
  xc: _glViewport,
  ab: invoke_diii,
  wc: invoke_f,
  ca: invoke_fff,
  $a: invoke_ffffi,
  ba: invoke_fi,
  F: invoke_fii,
  oa: invoke_fiif,
  na: invoke_fiii,
  _a: invoke_fiiif,
  t: invoke_i,
  Za: invoke_idiiii,
  d: invoke_ii,
  Ya: invoke_iif,
  aa: invoke_iifiiiiiii,
  k: invoke_iii,
  w: invoke_iiifffii,
  A: invoke_iiiffii,
  ua: invoke_iiifi,
  j: invoke_iiii,
  ta: invoke_iiiid,
  Xa: invoke_iiiif,
  Wa: invoke_iiiifi,
  Va: invoke_iiiifii,
  m: invoke_iiiii,
  vc: invoke_iiiiiff,
  X: invoke_iiiiifffffff,
  T: invoke_iiiiifiiii,
  L: invoke_iiiiifiiiii,
  o: invoke_iiiiii,
  r: invoke_iiiiiii,
  K: invoke_iiiiiiii,
  Ua: invoke_iiiiiiiii,
  ma: invoke_iiiiiiiiiiii,
  Ta: invoke_iiiiiiiiiiiii,
  W: invoke_iiji,
  la: invoke_iijiii,
  uc: invoke_iijji,
  Sa: invoke_iijjiii,
  tc: invoke_ijjiiii,
  O: invoke_j,
  Ra: invoke_ji,
  Qa: invoke_jiiii,
  g: invoke_v,
  Pa: invoke_vdii,
  sc: invoke_vf,
  e: invoke_vi,
  N: invoke_vif,
  Oa: invoke_viff,
  rc: invoke_vifffii,
  J: invoke_vifi,
  b: invoke_vii,
  I: invoke_viif,
  qc: invoke_viiff,
  Na: invoke_viifi,
  i: invoke_viii,
  Ma: invoke_viiif,
  pc: invoke_viiiffi,
  sa: invoke_viiifi,
  x: invoke_viiifiiiiifi,
  l: invoke_viiii,
  La: invoke_viiiiffffiiif,
  Ka: invoke_viiiifi,
  oc: invoke_viiiifif,
  p: invoke_viiiii,
  s: invoke_viiiiii,
  E: invoke_viiiiiii,
  S: invoke_viiiiiiii,
  nc: invoke_viiiiiiiii,
  V: invoke_viiiiiiiiii,
  mc: invoke_viiiiiiiiiii,
  ka: invoke_viiiiiiiiiiiiiii,
  lc: invoke_viij,
  Ja: invoke_viijii,
  kc: invoke_vij,
  jc: invoke_viji,
  ic: invoke_vjjii,
  hc: _llvm_eh_typeid_for
};
function invoke_viiii(index, a1, a2, a3, a4) {
  var sp = stackSave();
  try {
    getWasmTableEntry(index)(a1, a2, a3, a4);
  } catch (e) {
    stackRestore(sp);
    if (e !== e + 0) throw e;
    _setThrew(1, 0);
  }
}
function invoke_vii(index, a1, a2) {
  var sp = stackSave();
  try {
    getWasmTableEntry(index)(a1, a2);
  } catch (e) {
    stackRestore(sp);
    if (e !== e + 0) throw e;
    _setThrew(1, 0);
  }
}
function invoke_ii(index, a1) {
  var sp = stackSave();
  try {
    return getWasmTableEntry(index)(a1);
  } catch (e) {
    stackRestore(sp);
    if (e !== e + 0) throw e;
    _setThrew(1, 0);
  }
}
function invoke_iii(index, a1, a2) {
  var sp = stackSave();
  try {
    return getWasmTableEntry(index)(a1, a2);
  } catch (e) {
    stackRestore(sp);
    if (e !== e + 0) throw e;
    _setThrew(1, 0);
  }
}
function invoke_v(index) {
  var sp = stackSave();
  try {
    getWasmTableEntry(index)();
  } catch (e) {
    stackRestore(sp);
    if (e !== e + 0) throw e;
    _setThrew(1, 0);
  }
}
function invoke_viii(index, a1, a2, a3) {
  var sp = stackSave();
  try {
    getWasmTableEntry(index)(a1, a2, a3);
  } catch (e) {
    stackRestore(sp);
    if (e !== e + 0) throw e;
    _setThrew(1, 0);
  }
}
function invoke_vi(index, a1) {
  var sp = stackSave();
  try {
    getWasmTableEntry(index)(a1);
  } catch (e) {
    stackRestore(sp);
    if (e !== e + 0) throw e;
    _setThrew(1, 0);
  }
}
function invoke_iiii(index, a1, a2, a3) {
  var sp = stackSave();
  try {
    return getWasmTableEntry(index)(a1, a2, a3);
  } catch (e) {
    stackRestore(sp);
    if (e !== e + 0) throw e;
    _setThrew(1, 0);
  }
}
function invoke_iiiii(index, a1, a2, a3, a4) {
  var sp = stackSave();
  try {
    return getWasmTableEntry(index)(a1, a2, a3, a4);
  } catch (e) {
    stackRestore(sp);
    if (e !== e + 0) throw e;
    _setThrew(1, 0);
  }
}
function invoke_i(index) {
  var sp = stackSave();
  try {
    return getWasmTableEntry(index)();
  } catch (e) {
    stackRestore(sp);
    if (e !== e + 0) throw e;
    _setThrew(1, 0);
  }
}
function invoke_iiiiiii(index, a1, a2, a3, a4, a5, a6) {
  var sp = stackSave();
  try {
    return getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6);
  } catch (e) {
    stackRestore(sp);
    if (e !== e + 0) throw e;
    _setThrew(1, 0);
  }
}
function invoke_iiiid(index, a1, a2, a3, a4) {
  var sp = stackSave();
  try {
    return getWasmTableEntry(index)(a1, a2, a3, a4);
  } catch (e) {
    stackRestore(sp);
    if (e !== e + 0) throw e;
    _setThrew(1, 0);
  }
}
function invoke_viiiiii(index, a1, a2, a3, a4, a5, a6) {
  var sp = stackSave();
  try {
    getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6);
  } catch (e) {
    stackRestore(sp);
    if (e !== e + 0) throw e;
    _setThrew(1, 0);
  }
}
function invoke_vif(index, a1, a2) {
  var sp = stackSave();
  try {
    getWasmTableEntry(index)(a1, a2);
  } catch (e) {
    stackRestore(sp);
    if (e !== e + 0) throw e;
    _setThrew(1, 0);
  }
}
function invoke_vifi(index, a1, a2, a3) {
  var sp = stackSave();
  try {
    getWasmTableEntry(index)(a1, a2, a3);
  } catch (e) {
    stackRestore(sp);
    if (e !== e + 0) throw e;
    _setThrew(1, 0);
  }
}
function invoke_viif(index, a1, a2, a3) {
  var sp = stackSave();
  try {
    getWasmTableEntry(index)(a1, a2, a3);
  } catch (e) {
    stackRestore(sp);
    if (e !== e + 0) throw e;
    _setThrew(1, 0);
  }
}
function invoke_iiiiifiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10) {
  var sp = stackSave();
  try {
    return getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10);
  } catch (e) {
    stackRestore(sp);
    if (e !== e + 0) throw e;
    _setThrew(1, 0);
  }
}
function invoke_vf(index, a1) {
  var sp = stackSave();
  try {
    getWasmTableEntry(index)(a1);
  } catch (e) {
    stackRestore(sp);
    if (e !== e + 0) throw e;
    _setThrew(1, 0);
  }
}
function invoke_ffffi(index, a1, a2, a3, a4) {
  var sp = stackSave();
  try {
    return getWasmTableEntry(index)(a1, a2, a3, a4);
  } catch (e) {
    stackRestore(sp);
    if (e !== e + 0) throw e;
    _setThrew(1, 0);
  }
}
function invoke_viiiii(index, a1, a2, a3, a4, a5) {
  var sp = stackSave();
  try {
    getWasmTableEntry(index)(a1, a2, a3, a4, a5);
  } catch (e) {
    stackRestore(sp);
    if (e !== e + 0) throw e;
    _setThrew(1, 0);
  }
}
function invoke_iiiifii(index, a1, a2, a3, a4, a5, a6) {
  var sp = stackSave();
  try {
    return getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6);
  } catch (e) {
    stackRestore(sp);
    if (e !== e + 0) throw e;
    _setThrew(1, 0);
  }
}
function invoke_iiiifi(index, a1, a2, a3, a4, a5) {
  var sp = stackSave();
  try {
    return getWasmTableEntry(index)(a1, a2, a3, a4, a5);
  } catch (e) {
    stackRestore(sp);
    if (e !== e + 0) throw e;
    _setThrew(1, 0);
  }
}
function invoke_fff(index, a1, a2) {
  var sp = stackSave();
  try {
    return getWasmTableEntry(index)(a1, a2);
  } catch (e) {
    stackRestore(sp);
    if (e !== e + 0) throw e;
    _setThrew(1, 0);
  }
}
function invoke_iiiiiiii(index, a1, a2, a3, a4, a5, a6, a7) {
  var sp = stackSave();
  try {
    return getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7);
  } catch (e) {
    stackRestore(sp);
    if (e !== e + 0) throw e;
    _setThrew(1, 0);
  }
}
function invoke_viiiiiiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10) {
  var sp = stackSave();
  try {
    getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10);
  } catch (e) {
    stackRestore(sp);
    if (e !== e + 0) throw e;
    _setThrew(1, 0);
  }
}
function invoke_viiif(index, a1, a2, a3, a4) {
  var sp = stackSave();
  try {
    getWasmTableEntry(index)(a1, a2, a3, a4);
  } catch (e) {
    stackRestore(sp);
    if (e !== e + 0) throw e;
    _setThrew(1, 0);
  }
}
function invoke_iiiif(index, a1, a2, a3, a4) {
  var sp = stackSave();
  try {
    return getWasmTableEntry(index)(a1, a2, a3, a4);
  } catch (e) {
    stackRestore(sp);
    if (e !== e + 0) throw e;
    _setThrew(1, 0);
  }
}
function invoke_fi(index, a1) {
  var sp = stackSave();
  try {
    return getWasmTableEntry(index)(a1);
  } catch (e) {
    stackRestore(sp);
    if (e !== e + 0) throw e;
    _setThrew(1, 0);
  }
}
function invoke_viiiiiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9) {
  var sp = stackSave();
  try {
    getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8, a9);
  } catch (e) {
    stackRestore(sp);
    if (e !== e + 0) throw e;
    _setThrew(1, 0);
  }
}
function invoke_viiifiiiiifi(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11) {
  var sp = stackSave();
  try {
    getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11);
  } catch (e) {
    stackRestore(sp);
    if (e !== e + 0) throw e;
    _setThrew(1, 0);
  }
}
function invoke_iif(index, a1, a2) {
  var sp = stackSave();
  try {
    return getWasmTableEntry(index)(a1, a2);
  } catch (e) {
    stackRestore(sp);
    if (e !== e + 0) throw e;
    _setThrew(1, 0);
  }
}
function invoke_j(index) {
  var sp = stackSave();
  try {
    return getWasmTableEntry(index)();
  } catch (e) {
    stackRestore(sp);
    if (e !== e + 0) throw e;
    _setThrew(1, 0);
    return 0n;
  }
}
function invoke_ji(index, a1) {
  var sp = stackSave();
  try {
    return getWasmTableEntry(index)(a1);
  } catch (e) {
    stackRestore(sp);
    if (e !== e + 0) throw e;
    _setThrew(1, 0);
    return 0n;
  }
}
function invoke_viifi(index, a1, a2, a3, a4) {
  var sp = stackSave();
  try {
    getWasmTableEntry(index)(a1, a2, a3, a4);
  } catch (e) {
    stackRestore(sp);
    if (e !== e + 0) throw e;
    _setThrew(1, 0);
  }
}
function invoke_f(index) {
  var sp = stackSave();
  try {
    return getWasmTableEntry(index)();
  } catch (e) {
    stackRestore(sp);
    if (e !== e + 0) throw e;
    _setThrew(1, 0);
  }
}
function invoke_viiff(index, a1, a2, a3, a4) {
  var sp = stackSave();
  try {
    getWasmTableEntry(index)(a1, a2, a3, a4);
  } catch (e) {
    stackRestore(sp);
    if (e !== e + 0) throw e;
    _setThrew(1, 0);
  }
}
function invoke_viiiiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8) {
  var sp = stackSave();
  try {
    getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8);
  } catch (e) {
    stackRestore(sp);
    if (e !== e + 0) throw e;
    _setThrew(1, 0);
  }
}
function invoke_iiiiii(index, a1, a2, a3, a4, a5) {
  var sp = stackSave();
  try {
    return getWasmTableEntry(index)(a1, a2, a3, a4, a5);
  } catch (e) {
    stackRestore(sp);
    if (e !== e + 0) throw e;
    _setThrew(1, 0);
  }
}
function invoke_iiji(index, a1, a2, a3) {
  var sp = stackSave();
  try {
    return getWasmTableEntry(index)(a1, a2, a3);
  } catch (e) {
    stackRestore(sp);
    if (e !== e + 0) throw e;
    _setThrew(1, 0);
  }
}
function invoke_iiiiifiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9) {
  var sp = stackSave();
  try {
    return getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8, a9);
  } catch (e) {
    stackRestore(sp);
    if (e !== e + 0) throw e;
    _setThrew(1, 0);
  }
}
function invoke_iifiiiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9) {
  var sp = stackSave();
  try {
    return getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8, a9);
  } catch (e) {
    stackRestore(sp);
    if (e !== e + 0) throw e;
    _setThrew(1, 0);
  }
}
function invoke_iiiiiiiiiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12) {
  var sp = stackSave();
  try {
    return getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12);
  } catch (e) {
    stackRestore(sp);
    if (e !== e + 0) throw e;
    _setThrew(1, 0);
  }
}
function invoke_iiiiifffffff(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11) {
  var sp = stackSave();
  try {
    return getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11);
  } catch (e) {
    stackRestore(sp);
    if (e !== e + 0) throw e;
    _setThrew(1, 0);
  }
}
function invoke_iiiiiff(index, a1, a2, a3, a4, a5, a6) {
  var sp = stackSave();
  try {
    return getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6);
  } catch (e) {
    stackRestore(sp);
    if (e !== e + 0) throw e;
    _setThrew(1, 0);
  }
}
function invoke_viiiiffffiiif(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12) {
  var sp = stackSave();
  try {
    getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12);
  } catch (e) {
    stackRestore(sp);
    if (e !== e + 0) throw e;
    _setThrew(1, 0);
  }
}
function invoke_iiifi(index, a1, a2, a3, a4) {
  var sp = stackSave();
  try {
    return getWasmTableEntry(index)(a1, a2, a3, a4);
  } catch (e) {
    stackRestore(sp);
    if (e !== e + 0) throw e;
    _setThrew(1, 0);
  }
}
function invoke_viiiifi(index, a1, a2, a3, a4, a5, a6) {
  var sp = stackSave();
  try {
    getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6);
  } catch (e) {
    stackRestore(sp);
    if (e !== e + 0) throw e;
    _setThrew(1, 0);
  }
}
function invoke_viiifi(index, a1, a2, a3, a4, a5) {
  var sp = stackSave();
  try {
    getWasmTableEntry(index)(a1, a2, a3, a4, a5);
  } catch (e) {
    stackRestore(sp);
    if (e !== e + 0) throw e;
    _setThrew(1, 0);
  }
}
function invoke_vifffii(index, a1, a2, a3, a4, a5, a6) {
  var sp = stackSave();
  try {
    getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6);
  } catch (e) {
    stackRestore(sp);
    if (e !== e + 0) throw e;
    _setThrew(1, 0);
  }
}
function invoke_viiiiiiiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11) {
  var sp = stackSave();
  try {
    getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11);
  } catch (e) {
    stackRestore(sp);
    if (e !== e + 0) throw e;
    _setThrew(1, 0);
  }
}
function invoke_fiii(index, a1, a2, a3) {
  var sp = stackSave();
  try {
    return getWasmTableEntry(index)(a1, a2, a3);
  } catch (e) {
    stackRestore(sp);
    if (e !== e + 0) throw e;
    _setThrew(1, 0);
  }
}
function invoke_fiiif(index, a1, a2, a3, a4) {
  var sp = stackSave();
  try {
    return getWasmTableEntry(index)(a1, a2, a3, a4);
  } catch (e) {
    stackRestore(sp);
    if (e !== e + 0) throw e;
    _setThrew(1, 0);
  }
}
function invoke_fiif(index, a1, a2, a3) {
  var sp = stackSave();
  try {
    return getWasmTableEntry(index)(a1, a2, a3);
  } catch (e) {
    stackRestore(sp);
    if (e !== e + 0) throw e;
    _setThrew(1, 0);
  }
}
function invoke_viiiffi(index, a1, a2, a3, a4, a5, a6) {
  var sp = stackSave();
  try {
    getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6);
  } catch (e) {
    stackRestore(sp);
    if (e !== e + 0) throw e;
    _setThrew(1, 0);
  }
}
function invoke_fii(index, a1, a2) {
  var sp = stackSave();
  try {
    return getWasmTableEntry(index)(a1, a2);
  } catch (e) {
    stackRestore(sp);
    if (e !== e + 0) throw e;
    _setThrew(1, 0);
  }
}
function invoke_vij(index, a1, a2) {
  var sp = stackSave();
  try {
    getWasmTableEntry(index)(a1, a2);
  } catch (e) {
    stackRestore(sp);
    if (e !== e + 0) throw e;
    _setThrew(1, 0);
  }
}
function invoke_viiiiiii(index, a1, a2, a3, a4, a5, a6, a7) {
  var sp = stackSave();
  try {
    getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7);
  } catch (e) {
    stackRestore(sp);
    if (e !== e + 0) throw e;
    _setThrew(1, 0);
  }
}
function invoke_viij(index, a1, a2, a3) {
  var sp = stackSave();
  try {
    getWasmTableEntry(index)(a1, a2, a3);
  } catch (e) {
    stackRestore(sp);
    if (e !== e + 0) throw e;
    _setThrew(1, 0);
  }
}
function invoke_viff(index, a1, a2, a3) {
  var sp = stackSave();
  try {
    getWasmTableEntry(index)(a1, a2, a3);
  } catch (e) {
    stackRestore(sp);
    if (e !== e + 0) throw e;
    _setThrew(1, 0);
  }
}
function invoke_iijiii(index, a1, a2, a3, a4, a5) {
  var sp = stackSave();
  try {
    return getWasmTableEntry(index)(a1, a2, a3, a4, a5);
  } catch (e) {
    stackRestore(sp);
    if (e !== e + 0) throw e;
    _setThrew(1, 0);
  }
}
function invoke_iijjiii(index, a1, a2, a3, a4, a5, a6) {
  var sp = stackSave();
  try {
    return getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6);
  } catch (e) {
    stackRestore(sp);
    if (e !== e + 0) throw e;
    _setThrew(1, 0);
  }
}
function invoke_iijji(index, a1, a2, a3, a4) {
  var sp = stackSave();
  try {
    return getWasmTableEntry(index)(a1, a2, a3, a4);
  } catch (e) {
    stackRestore(sp);
    if (e !== e + 0) throw e;
    _setThrew(1, 0);
  }
}
function invoke_vjjii(index, a1, a2, a3, a4) {
  var sp = stackSave();
  try {
    getWasmTableEntry(index)(a1, a2, a3, a4);
  } catch (e) {
    stackRestore(sp);
    if (e !== e + 0) throw e;
    _setThrew(1, 0);
  }
}
function invoke_ijjiiii(index, a1, a2, a3, a4, a5, a6) {
  var sp = stackSave();
  try {
    return getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6);
  } catch (e) {
    stackRestore(sp);
    if (e !== e + 0) throw e;
    _setThrew(1, 0);
  }
}
function invoke_vdii(index, a1, a2, a3) {
  var sp = stackSave();
  try {
    getWasmTableEntry(index)(a1, a2, a3);
  } catch (e) {
    stackRestore(sp);
    if (e !== e + 0) throw e;
    _setThrew(1, 0);
  }
}
function invoke_idiiii(index, a1, a2, a3, a4, a5) {
  var sp = stackSave();
  try {
    return getWasmTableEntry(index)(a1, a2, a3, a4, a5);
  } catch (e) {
    stackRestore(sp);
    if (e !== e + 0) throw e;
    _setThrew(1, 0);
  }
}
function invoke_iiiffii(index, a1, a2, a3, a4, a5, a6) {
  var sp = stackSave();
  try {
    return getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6);
  } catch (e) {
    stackRestore(sp);
    if (e !== e + 0) throw e;
    _setThrew(1, 0);
  }
}
function invoke_iiifffii(index, a1, a2, a3, a4, a5, a6, a7) {
  var sp = stackSave();
  try {
    return getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7);
  } catch (e) {
    stackRestore(sp);
    if (e !== e + 0) throw e;
    _setThrew(1, 0);
  }
}
function invoke_viiiifif(index, a1, a2, a3, a4, a5, a6, a7) {
  var sp = stackSave();
  try {
    getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7);
  } catch (e) {
    stackRestore(sp);
    if (e !== e + 0) throw e;
    _setThrew(1, 0);
  }
}
function invoke_viji(index, a1, a2, a3) {
  var sp = stackSave();
  try {
    getWasmTableEntry(index)(a1, a2, a3);
  } catch (e) {
    stackRestore(sp);
    if (e !== e + 0) throw e;
    _setThrew(1, 0);
  }
}
function invoke_iiiiiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8) {
  var sp = stackSave();
  try {
    return getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8);
  } catch (e) {
    stackRestore(sp);
    if (e !== e + 0) throw e;
    _setThrew(1, 0);
  }
}
function invoke_viijii(index, a1, a2, a3, a4, a5) {
  var sp = stackSave();
  try {
    getWasmTableEntry(index)(a1, a2, a3, a4, a5);
  } catch (e) {
    stackRestore(sp);
    if (e !== e + 0) throw e;
    _setThrew(1, 0);
  }
}
function invoke_jiiii(index, a1, a2, a3, a4) {
  var sp = stackSave();
  try {
    return getWasmTableEntry(index)(a1, a2, a3, a4);
  } catch (e) {
    stackRestore(sp);
    if (e !== e + 0) throw e;
    _setThrew(1, 0);
    return 0n;
  }
}
function invoke_diii(index, a1, a2, a3) {
  var sp = stackSave();
  try {
    return getWasmTableEntry(index)(a1, a2, a3);
  } catch (e) {
    stackRestore(sp);
    if (e !== e + 0) throw e;
    _setThrew(1, 0);
  }
}
function invoke_iiiiiiiiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11) {
  var sp = stackSave();
  try {
    return getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11);
  } catch (e) {
    stackRestore(sp);
    if (e !== e + 0) throw e;
    _setThrew(1, 0);
  }
}
function invoke_viiiiiiiiiiiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15) {
  var sp = stackSave();
  try {
    getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15);
  } catch (e) {
    stackRestore(sp);
    if (e !== e + 0) throw e;
    _setThrew(1, 0);
  }
}
function callMain(args = []) {
  var entryFunction = _main;
  args.unshift(thisProgram);
  var argc = args.length;
  var argv = stackAlloc((argc + 1) * 4);
  var argv_ptr = argv;
  for (var arg of args) {
    HEAPU32[argv_ptr >> 2] = stringToUTF8OnStack(arg);
    argv_ptr += 4;
  }
  HEAPU32[argv_ptr >> 2] = 0;
  try {
    var ret = entryFunction(argc, argv);
    exitJS(ret, true);
    return ret;
  } catch (e) {
    return handleException(e);
  }
}
function run(args = arguments_) {
  if (runDependencies > 0) {
    dependenciesFulfilled = run;
    return;
  }
  preRun();
  if (runDependencies > 0) {
    dependenciesFulfilled = run;
    return;
  }
  function doRun() {
    Module["calledRun"] = true;
    if (ABORT) return;
    initRuntime();
    preMain();
    Module["onRuntimeInitialized"]?.();
    var noInitialRun = Module["noInitialRun"] || false;
    if (!noInitialRun) callMain(args);
    postRun();
  }
  if (Module["setStatus"]) {
    Module["setStatus"]("Running...");
    setTimeout(() => {
      setTimeout(() => Module["setStatus"](""), 1);
      doRun();
    }, 1);
  } else {
    doRun();
  }
}
var wasmExports;
createWasm();
run();
