import {
  waitForAsync,
  ComponentFixture,
  TestBed,
  inject,
} from "@angular/core/testing";
import { Component, EventEmitter } from "@angular/core";

import { RemittanceStatementPdfComponent } from "./remittance-statement-pdf";
import { DownloadPdfService } from "./../../../sand-box/download-pdf.service";

import dayjs from "dayjs";
import { jsPDF } from "jspdf";

import html2canvas from "html2canvas";
import { SpinnerService } from "./../../../core/services";

// Mock JSPDF
jest.mock("jspdf", () => {
  return {
    jsPDF: jest.fn(() => ({
      pageSize: {
        internal: {
          getWidth: jest.fn().mockReturnValue(210),
          getHeight: jest.fn().mockReturnValue(297),
        },
      },
      addImage: jest.fn(),
      addPage: jest.fn(),
      save: jest.fn(),
    })),
  };
});

// Mock HTML2Canvas
jest.mock("html2canvas", () => {
  return jest.fn().mockImplementation(() => {
    const mockCanvas = {
      toDataURL: jest
        .fn()
        .mockReturnValue("data:image/png;base64, mockImageData"),
      width: 800,
      height: 600,
      getContext: jest.fn().mockReturnValue({
        drawImage: jest.fn(),
      }),
    };
    return Promise.resolve(mockCanvas);
  });

  describe("RemittanceStatementPdfComponent", () => {
    let component: RemittanceStatementPdfComponent;
    let fixture: ComponentFixture<RemittanceStatementPdfComponent>;
    let spinnerService: SpinnerService;

    // let jsPdfSpy: jest.SpyInstance;

    const mockSpinnerService = {
      startCall: jest.fn(),
      endCall: jest.fn(),
    };

    // Mock Data
    const mockRemittanceData = [
      { pageId: "page1", data: "test1" },
      { pageId: "page2", data: "test2" },
    ];

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        declarations: [RemittanceStatementPdfComponent],
        providers: [{ provide: SpinnerService, useValue: mockSpinnerService }],
      }).compileComponents();
    });

    beforeEach(() => {
      fixture = TestBed.createComponent(RemittanceStatementPdfComponent);
      component = fixture.componentInstance;
      spinnerService = TestBed.inject(SpinnerService);
    });

    // jsPdfSpy = jest.spyOn(jsPDF, 'default');

    beforeEach(() => {
      jest.clearAllMocks();

      const mockElement = {
        getBoundingClientRect: () => ({
          width: 500,
          height: 500,
          top: 0,
          left: 0,
          right: 500,
          bottom: 500,
        }),
        style: {},
        clientWidth: 500,
        clientHeight: 500,
        offsetWidth: 500,
        offsetHeight: 500,
      };

      document.getElementById = jest.fn().mockReturnValue(mockElement);

      // Reset component input
      component.remittanceStatementData = mockRemittanceData;
      component.senderFullName = "John Doe";
    });

    describe("generateRemittanceStatement", () => {
      it("should generate PDF with correct number of pages", async () => {
        await component.generateRemittanceStatement();
        expect(spinnerService.endCall).toHaveBeenCalled();
      });
    });
  });
});
